import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    // In Supabase, the auth session cookie is named `sb-<project-id>-auth-token` or `campus_admin_session`
    const adminSession =
      request.cookies.get("campus_admin_session")?.value ||
      request.cookies.get("sb-access-token")?.value;

    if (!adminSession) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
