import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "../../../lib/rate-limit";
import { getSupabaseServerClient } from "../../../lib/supabase";
import { providerRegistrationSchema } from "../../../lib/validation";
import { sendWebhook } from "../../../lib/webhook";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

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
  const rawServices = formData.getAll("services");

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    city: formData.get("city"),
    services: rawServices.filter((service): service is string =>
      typeof service === "string",
    ),
    availability:
      typeof formData.get("availability") === "string"
        ? formData.get("availability")
        : "",
  };

  const parsed = providerRegistrationSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form fields and try again." },
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

  const { data: existingProvider, error: lookupError } = await supabase
    .from("service_providers")
    .select("id")
    .eq("email", parsed.data.email)
    .maybeSingle();

  if (lookupError) {
    return NextResponse.json(
      { error: "Unable to validate your email at the moment." },
      { status: 500 },
    );
  }

  if (existingProvider) {
    return NextResponse.json(
      { error: "This email is already registered." },
      { status: 409 },
    );
  }

  let fileUrl: string | null = null;
  const file = formData.get("file");

  if (file instanceof File && file.size > 0) {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File is too large. Max size is 5MB." },
        { status: 400 },
      );
    }

    const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? "provider-files";
    const filePath = `provider-uploads/${crypto.randomUUID()}-${file.name}`;
    const arrayBuffer = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, arrayBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: "Unable to upload file at the moment." },
        { status: 500 },
      );
    }

    const { data: publicUrl } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    fileUrl = publicUrl?.publicUrl ?? filePath;
  }

  const { error: insertError } = await supabase.from("service_providers").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    city: parsed.data.city,
    services: parsed.data.services,
    availability: parsed.data.availability,
    file_url: fileUrl,
  });

  if (insertError) {
    await sendWebhook({
      type: "provider_registration",
      status: "error",
      error: insertError.message,
      data: {
        ...parsed.data,
        fileUrl,
      },
    });
    return NextResponse.json(
      { error: "Unable to save your registration at the moment." },
      { status: 500 },
    );
  }

  await sendWebhook({
    type: "provider_registration",
    status: "success",
    data: {
      ...parsed.data,
      fileUrl,
    },
  });

  return NextResponse.json({ success: true });
}
