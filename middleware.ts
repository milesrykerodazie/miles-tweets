import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

const secret = process.env.NEXTAUTH_SECRET;

export default withAuth(async function middleware(req) {
  //get all cookies
  const cookies = await req.cookies.getAll();
  const cookie = await req.cookies.get("next-auth.session-token");
  const token = await req.nextauth.token;

  console.log("the auth token => ", token);

  console.log("the session cookie => ", cookie);

  console.log("the cookies => ", cookies);

  const pathname = req.nextUrl.pathname;

  console.log("the pathname => ", pathname);
});

export const config = {
  matcher: ["/home-page/:path*", "/notification/:path*", "/profile/:path*"],
};

// if (check !== null) {
//   return NextResponse.redirect(new URL("/home", req.url));
// }

//   if (check && isAccessingNotSensitiveRoute) {
//     return NextResponse.redirect(new URL("/home", req.url));
//   }

//   if (!check && isAccessingSensitiveRoute) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   if (pathname === "/" && check) {
//     return NextResponse.redirect(new URL("/home", req.url));
//   }
// }

// export const config = {
//   matcher: ["/home", "/notifications", "/profile/:path*", "/"],
// };

// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { withAuth } from "next-auth/middleware";

// const secret = process.env.NEXTAUTH_SECRET;

// export default withAuth(
//   async function middleware(req) {
//     const isAuth = await getToken({ req, secret });
//     const pathname = req.nextUrl.pathname;
//     console.log("the path name => ", pathname, typeof pathname);
//     console.log("the path => ", req.url);

//     console.log("includes => ", req.url.includes("/"));

//     const isLoginPage = pathname.startsWith("/login");
//     const isRegisterPage = pathname.startsWith("/register");
//     const sensitiveRoutes = ["/home", "/notifications", "/profile"];
//     const isAccessingSensitiveRoute = sensitiveRoutes.includes(pathname);

//     if (pathname === "/login") {
//       if (isAuth) {
//         return NextResponse.redirect(new URL("/notification", req.url));
//       }

//       return NextResponse.next();
//     }
//     if (isRegisterPage) {
//       if (isAuth) {
//         return NextResponse.redirect(new URL("/notification", req.url));
//       }

//       return NextResponse.next();
//     }

//     if (!isAuth && isAccessingSensitiveRoute) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     if (pathname === "/" && isAuth) {
//       return NextResponse.redirect(new URL("/notification", req.url));
//     }
//   },
//   {
//     callbacks: {
//       async authorized() {
//         return true;
//       },
//     },
//   }
// );

// export const config = {
//   matcher: ["/", "/login", "/home:path*", "/notifications", "/profile/:path*"],
// };
