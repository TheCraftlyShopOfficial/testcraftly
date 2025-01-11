import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth-token");
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific paths like '/profile/*'
export const config = {
  matcher: ["/profile/:path*"],
};
