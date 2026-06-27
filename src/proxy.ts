import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  // 1. Exclusion Logic: immediately bypass checks for the login endpoint to prevent loops
  if (url.pathname.startsWith("/afro-management/login")) {
    return NextResponse.next();
  }

  // 2. Protect /afro-management (exact path and sub-paths)
  if (url.pathname === "/afro-management" || url.pathname.startsWith("/afro-management/")) {
    const sessionCookie = request.cookies.get("admin_session");

    if (!sessionCookie) {
      url.pathname = "/afro-management/login";
      return NextResponse.redirect(url);
    }

    try {
      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) {
        throw new Error("JWT_SECRET is missing");
      }
      const secret = new TextEncoder().encode(secretKey);
      await jwtVerify(sessionCookie.value, secret);
      return NextResponse.next();
    } catch (error) {
      console.error("JWT verification failed in middleware:", error);
      url.pathname = "/afro-management/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/afro-management", "/afro-management/:path*"],
};
