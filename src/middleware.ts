import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("storevault-token");
  if (authCookie) return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/sign-in",'/sign-up'],
};
