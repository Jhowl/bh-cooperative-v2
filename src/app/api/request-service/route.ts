import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "../../../lib/rate-limit";
import { getSupabaseServerClient } from "../../../lib/supabase";
import { serviceRequestSchema } from "../../../lib/validation";
import { sendWebhook } from "../../../lib/webhook";

const OTHER_SERVICE_VALUE = "Other";

export async function POST(request: NextRequest) {
  const ipAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const rateLimitResult = await rateLimit(ipAddress);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  const formData = await request.formData();

  const data = {
    name: typeof formData.get("name") === "string" ? formData.get("name") : "",
    email:
      typeof formData.get("email") === "string" ? formData.get("email") : "",
    phone:
      typeof formData.get("phone") === "string" ? formData.get("phone") : "",
    service:
      typeof formData.get("service") === "string"
        ? formData.get("service")
        : "",
    otherService:
      typeof formData.get("otherService") === "string"
        ? formData.get("otherService")
        : "",
    zipcode:
      typeof formData.get("zipcode") === "string"
        ? formData.get("zipcode")
        : "",
    referralSource:
      typeof formData.get("referralSource") === "string"
        ? formData.get("referralSource")
        : "",
  };

  const parsed = serviceRequestSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form fields and try again." },
      { status: 400 },
    );
  }

  if (
    parsed.data.service === OTHER_SERVICE_VALUE &&
    !parsed.data.otherService.trim()
  ) {
    return NextResponse.json(
      { error: "Please describe the service you need." },
      { status: 400 },
    );
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Server configuration is incomplete." },
      { status: 500 },
    );
  }

  const { error: insertError } = await supabase.from("service_requests").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    service: parsed.data.service,
    other_service: parsed.data.otherService,
    zipcode: parsed.data.zipcode,
    referral_source: parsed.data.referralSource,
  });

  if (insertError) {
    await sendWebhook({
      type: "service_request",
      status: "error",
      error: insertError.message,
      data: parsed.data,
    });
    return NextResponse.json(
      { error: "Unable to save your request at the moment." },
      { status: 500 },
    );
  }

  await sendWebhook({
    type: "service_request",
    status: "success",
    data: parsed.data,
  });

  return NextResponse.json({ success: true });
}
