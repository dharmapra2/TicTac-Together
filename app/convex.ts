/* eslint-disable @typescript-eslint/no-explicit-any */
import { preloadQuery } from "convex/nextjs";

export async function safePreloadQuery(
  query: any,
  args: any,
  token: string | null
) {
  try {
    if (!token) throw new Error("No auth token");
    return await preloadQuery(query, args, { token });
  } catch (error) {
    console.error("Failed to preload query:", error);
    return null;
  }
}
