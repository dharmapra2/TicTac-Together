import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/"]);

const authorizedParties = ["http://localhost:3000"];

export default clerkMiddleware(
  async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();
  },
  {
    secretKey: process.env.NEXT_PUBLIC_CLERK_SECRET_KEY,
    debug: false,
    authorizedParties: authorizedParties,
  }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
