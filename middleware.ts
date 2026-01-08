import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

function isPortuguese(acceptLanguage: string) {
  const normalized = acceptLanguage.toLowerCase();
  return normalized.startsWith("pt") || normalized.includes(",pt");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
