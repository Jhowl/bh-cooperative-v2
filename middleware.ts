import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  getAdminSessionConfig,
  verifyAdminSessionToken,
} from "./src/lib/admin-session";
import { getPublicOrigin } from "./src/lib/request-url";

const PUBLIC_FILE = /\.(.*)$/;

function isPortuguese(acceptLanguage: string) {
  const normalized = acceptLanguage.toLowerCase();
  return normalized.startsWith("pt") || normalized.includes(",pt");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const { secret, password, maxAgeSeconds } = getAdminSessionConfig();
    const isLoginRoute =
      pathname === "/admin/login" || pathname.startsWith("/admin/login/");

    const origin = getPublicOrigin(request);

    if (!secret || !password) {
      if (isLoginRoute) {
        return NextResponse.next();
      }

      const redirectUrl = new URL("/admin/login", origin);
      redirectUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const isValid = await verifyAdminSessionToken({
      token,
      secret,
      maxAgeSeconds,
    });

    if (isLoginRoute && isValid) {
      return NextResponse.redirect(new URL("/admin", origin));
    }

    if (!isLoginRoute && !isValid) {
      const redirectUrl = new URL("/admin/login", origin);
      redirectUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === "/pt" || pathname.startsWith("/pt/")) {
    return NextResponse.next();
  }

  const acceptLanguage = request.headers.get("accept-language") ?? "";
  if (isPortuguese(acceptLanguage)) {
    const url = request.nextUrl.clone();
    url.pathname = `/pt${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
