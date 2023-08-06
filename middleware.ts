import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

const secret = process.env.NEXTAUTH_SECRET;

export default withAuth(
  async function middleware(req) {
    //get all cookies
    const check = await getToken({ req, secret });

    const pathname = req.nextUrl.pathname;

    const notSensitiveRoutes = ["/login", "/register"];
    const isAccessingNotSensitiveRoute = notSensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    const sensitiveRoutes = ["/home", "/notifications", "/profile"];
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    const homePath = pathname.startsWith("/home");

    // if (check !== null) {
    //   return NextResponse.redirect(new URL("/home", req.url));
    // }

    if (check !== null && isAccessingNotSensitiveRoute) {
      return NextResponse.redirect(new URL("/home", req.url));
    }

    if (check === null && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/home:path*",
    "/notifications",
    "/profile/:path*",
    "/",
    "/login",
    "/register",
  ],
};
