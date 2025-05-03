// lib/auth.ts
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

type User = {
  id: string;
  username: string;
};

export type AuthResult = {
  isAuthenticated: boolean;
  user?: User;
};

// Simplified cookie-based auth
export async function verifyAuth(req?: NextRequest): Promise<AuthResult> {
  try {
    const cookieStore = req ? req.cookies : await cookies();
    const userCookie = cookieStore.get("tictactoe-user");

    if (!userCookie?.value) {
      return { isAuthenticated: false };
    }

    const user = JSON.parse(userCookie.value) as User;
    return {
      isAuthenticated: true,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  } catch (error) {
    console.error("Auth verification failed:", error);
    return { isAuthenticated: false };
  }
}

export async function setAuthCookie(user: User, persistent: boolean = true) {
  (await cookies()).set("tictactoe-user", JSON.stringify(user), {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: persistent ? 30 * 24 * 60 * 60 : undefined, // 30 days or session
    httpOnly: true,
  });
}

export async function clearAuthCookie() {
  (await cookies()).delete("tictactoe-user");
}
