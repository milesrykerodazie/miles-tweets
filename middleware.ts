import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

const secret = process.env.NEXTAUTH_SECRET;

export default withAuth(
  async function middleware(req) {
    //is user authenticated
    const isAuth = await getToken({ req, secret });
    const pathname = req.nextUrl.pathname;

    //not sensitive stuff
    const notSensitiveRoutes = ["/login", "/register"];
    const isAccessingNotSensitiveRoute = notSensitiveRoutes.includes(pathname);

    //sensitive stuff
    const sensitiveRoutes = ["/home", "/notification", "/profile"];
    const isAccessingSensitiveRoute = sensitiveRoutes.includes(pathname);

    if (isAuth !== null && isAccessingNotSensitiveRoute) {
      return NextResponse.redirect(new URL("/home", req.url));
    }

    if (isAuth === null && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname === "/" && isAuth !== null) {
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
    "/",
    "/home",
    "/notification/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};
