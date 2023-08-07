import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  //get all cookies
  const check = await getToken({ req, secret });

  const pathname = req.nextUrl.pathname;

  const notSensitiveRoutes = ["/login", "/register"];
  const isAccessingNotSensitiveRoute = notSensitiveRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const sensitiveRoutes = ["/home-page", "/notification", "/profile"];
  const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (pathname === "/" && check) {
    return NextResponse.redirect(new URL("/home-page", req.url));
  }

  if (pathname === "/notification") {
    if (!check) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }
}

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
