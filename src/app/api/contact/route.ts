import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "../../../lib/rate-limit";
import { contactMessageSchema } from "../../../lib/validation";
import { sendWebhook } from "../../../lib/webhook";

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
    message: formData.get("message"),
  };

  const parsed = contactMessageSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form fields and try again." },
      { status: 400 },
    );
  }

  const webhookOk = await sendWebhook({
    type: "contact_message",
    status: "success",
    data: parsed.data,
  });

  if (!webhookOk) {
    return NextResponse.json(
      { error: "Unable to send your message at the moment." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
