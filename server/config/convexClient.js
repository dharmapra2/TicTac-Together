import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

let convexClient = null;

export const initializeConvex = async (
  convexUrl,
  retries = 3,
  delay = 1000
) => {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      convexClient = new ConvexHttpClient(convexUrl);
      // Test with a simple query
      await convexClient.query(api.ping.default); // Use a simple ping query
      return convexClient;
    } catch (error) {
      lastError = error;
      if (i < retries - 1) await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastError;
};

export const getConvexClient = () => {
  if (!convexClient) throw new Error("Convex client not initialized");
  return convexClient;
};
