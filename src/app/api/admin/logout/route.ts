import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "../../../../lib/admin-session";
import { getPublicOrigin } from "../../../../lib/request-url";

export async function POST(request: NextRequest) {
  const origin = getPublicOrigin(request);
  const response = NextResponse.redirect(new URL("/admin/login", origin));
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });
  return response;
}
