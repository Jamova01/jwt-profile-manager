import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/", "/profile"];

const publicRoutes = ["/login"];

const apiRoutes = ["/api"];

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Error parsing JWT:", error);
    return true;
  }
}

function matchesRoute(path: string, routes: string[]): boolean {
  return routes.some((route) => {
    if (route === path) return true;

    if (route.endsWith("*")) {
      return path.startsWith(route.slice(0, -1));
    }

    if (route.includes("[") && route.includes("]")) {
      const routeRegex = new RegExp(
        "^" + route.replace(/\[.*?\]/g, "[^/]+") + "$"
      );
      return routeRegex.test(path);
    }

    return false;
  });
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (matchesRoute(path, apiRoutes)) {
    return NextResponse.next();
  }

  const isProtectedRoute = matchesRoute(path, protectedRoutes);
  const isPublicRoute = matchesRoute(path, publicRoutes);

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (isProtectedRoute) {
    if (!accessToken) {
      const loginUrl = new URL("/login", req.nextUrl);
      loginUrl.searchParams.set("redirect", path);
      return NextResponse.redirect(loginUrl);
    }

    if (isTokenExpired(accessToken)) {
      const response = NextResponse.redirect(new URL("/login", req.nextUrl));

      response.cookies.delete("access_token");
      if (!refreshToken || isTokenExpired(refreshToken)) {
        response.cookies.delete("refresh_token");
      }

      return response;
    }
  }

  if (isPublicRoute && accessToken && !isTokenExpired(accessToken)) {
    const redirectTo = req.nextUrl.searchParams.get("redirect");

    if (redirectTo) {
      try {
        const redirectUrl = new URL(redirectTo, req.nextUrl.origin);
        if (redirectUrl.origin === req.nextUrl.origin) {
          return NextResponse.redirect(redirectUrl);
        }
      } catch {
      }
    }

    return NextResponse.redirect(new URL("/profile", req.nextUrl));
  }

  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
