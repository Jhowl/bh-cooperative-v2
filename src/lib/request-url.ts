import type { NextRequest } from "next/server";

export function getPublicOrigin(request: NextRequest) {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");

  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  const host = request.headers.get("host");
  if (host) {
    const protocol = request.nextUrl.protocol || "http:";
    return `${protocol}//${host}`;
  }

  return request.nextUrl.origin;
}
