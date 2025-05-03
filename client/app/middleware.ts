import { verifyAuth } from "@/utils/auth/auth";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/register"];
const PROTECTED_PATHS = ["/dashboard", "/game"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log(`pathname: ${pathname}`);

  // Skip middleware for:
  // - Static files (_next/static, _next/image, favicon.ico)
  // - API routes
  // - Files with extensions
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const auth = await verifyAuth(request);

  // Redirect authenticated users from public pages
  if (PUBLIC_PATHS.includes(pathname) && auth.isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users from protected pages
  if (
    PROTECTED_PATHS.some((p) => pathname.startsWith(p)) &&
    !auth.isAuthenticated
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Add user info to headers for server components
  if (auth.isAuthenticated) {
    const response = NextResponse.next();
    response.headers.set("x-user-id", auth.user?.id || "");
    response.headers.set("x-user-username", auth.user?.username || "");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)"],
};
