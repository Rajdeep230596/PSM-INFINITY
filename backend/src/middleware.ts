import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicAdmin =
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/admin/forgot-password") ||
    pathname.startsWith("/admin/reset-password");
  if (!pathname.startsWith("/admin") || publicAdmin) {
    return NextResponse.next();
  }
  if (!request.cookies.get("psm_admin")) {
    const login = new URL("/admin/login", request.url);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
