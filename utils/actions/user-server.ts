"use server";
import { cookies } from "next/headers";

export async function getServerUserData() {
  const cookieStore = await cookies();

  return {
    userId: cookieStore.get("tictactoe_userId")?.value || null,
    username: cookieStore.get("tictactoe_username")?.value || null,
  };
}

export async function setServerUserCookies(
  userId: string,
  username: string,
  options?: {
    persistent?: boolean;
    httpOnly?: boolean;
    secure?: boolean;
  }
) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "tictactoe_userId",
    value: userId,
    path: "/",
    ...(options?.persistent && { maxAge: 10 * 24 * 60 * 60 }),
    httpOnly: options?.httpOnly ?? true,
    secure: options?.secure ?? process.env.NODE_ENV === "production",
  });

  cookieStore.set({
    name: "tictactoe_username",
    value: username,
    path: "/",
    httpOnly: options?.httpOnly ?? true,
    secure: options?.secure ?? process.env.NODE_ENV === "production",
  });
}
