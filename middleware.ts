import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    //get all cookies
    const cookies = await req.cookies.getAll();
    const cookie = await req.cookies.get("__Secure-next-auth.session-token");
    const token = await req.nextauth.token;

    console.log("the auth token => ", token);

    console.log("the session cookie => ", cookie);

    console.log("the cookies => ", cookies);

    const pathname = req.nextUrl.pathname;

    console.log("the pathname => ", pathname);
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
  matcher: ["/home-page/:path*", "/notification/:path*", "/profile/:path*"],
};
