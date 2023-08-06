import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest, response: NextResponse) {
  //get all cookies
  const check = await getToken({ req, secret });

  const pathname = req.nextUrl.pathname;

  const homePath = pathname.startsWith("/home");

  // if (check !== null) {
  //   return NextResponse.redirect(new URL("/home", req.url));
  // }

  if (homePath) {
    if (check === null) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname === "/") {
    if (check !== null) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }
}

export const config = {
  matcher: ["/notifications", "/profile/:path*", "/", "/home"],
};
