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
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    service: formData.get("service"),
    otherService: formData.get("otherService"),
    zipcode: formData.get("zipcode"),
    referralSource: formData.get("referralSource"),
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
