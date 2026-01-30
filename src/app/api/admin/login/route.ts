import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminSessionConfig,
} from "../../../../lib/admin-session";
import { getPublicOrigin } from "../../../../lib/request-url";

export async function POST(request: NextRequest) {
  const { password, secret, maxAgeSeconds } = getAdminSessionConfig();
  const url = new URL(request.url);
  const requestedNext = url.searchParams.get("next");
  const nextPath =
    requestedNext && requestedNext.startsWith("/admin") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/admin";

  if (!password || !secret) {
    return NextResponse.json(
      { error: "Admin authentication is not configured." },
      { status: 500 },
    );
  }

  const formData = await request.formData();
  const submittedPassword =
    typeof formData.get("password") === "string" ? formData.get("password") : "";

  const origin = getPublicOrigin(request);

  if (!submittedPassword || submittedPassword !== password) {
    const redirectUrl = new URL("/admin/login", origin);
    redirectUrl.searchParams.set("error", "1");
    if (nextPath) redirectUrl.searchParams.set("next", nextPath);
    return NextResponse.redirect(redirectUrl);
  }

  const token = await createAdminSessionToken({ secret });

  const response = NextResponse.redirect(new URL(nextPath, origin));
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: maxAgeSeconds,
    path: "/",
  });

  return response;
}
