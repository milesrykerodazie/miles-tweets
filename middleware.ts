import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest, response: NextResponse) {
  //get all cookies
  const check = await getToken({ req, secret });

  const pathname = req.nextUrl.pathname;

  const notSensitiveRoutes = ["/login", "/register"];
  const isAccessingNotSensitiveRoute = notSensitiveRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const sensitiveRoutes = ["/home", "/notifications", "/profile/:path*"];
  const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const homePath = pathname.startsWith("/home");

  // if (check !== null) {
  //   return NextResponse.redirect(new URL("/home", req.url));
  // }
  if (isAccessingNotSensitiveRoute) {
    if (check !== null) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    return NextResponse.next();
  }

  if (check === null && isAccessingSensitiveRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }
}

export const config = {
  matcher: [
    "/home",
    "/notifications",
    "/profile/:path*",
    "/",
    "/login",
    "/register",
  ],
};
