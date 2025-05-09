// app/lib/convex.ts
import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 1 second

type FetchResult<T> = {
  data: T;
  isLoading: boolean;
  error: Error | null;
};

async function fetchWithRetry<T>(
  fn: () => Promise<T>
): Promise<FetchResult<T>> {
  let lastError: Error | null = null;
  let isLoading = true;

  try {
    const data = await fn();
    return { data, isLoading: false, error: null };
  } catch (error) {
    lastError = error as Error;
    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        await new Promise((resolve) =>
          setTimeout(resolve, RETRY_DELAY * (i + 1))
        );
        const data = await fn();
        return { data, isLoading: false, error: null };
      } catch (retryError) {
        lastError = retryError as Error;
      }
    }
    return { data: [] as T, isLoading: false, error: lastError };
  } finally {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isLoading = false;
  }
}

export async function fetchAvailablePlayers(token?: string) {
  if (!token) return { data: [], isLoading: false, error: null };

  return fetchWithRetry(async () => {
    const result = await preloadQuery(
      api.users.getAvilablePlayers, // Fixed typo in function name
      {},
      { token }
    );
    return result?._valueJSON ?? [];
  });
}

export async function fetchInGamePlayers(token?: string) {
  if (!token) return { data: [], isLoading: false, error: null };

  return fetchWithRetry(async () => {
    const result = await preloadQuery(
      api.users.getInGamePlayers,
      {},
      { token }
    );
    return result._valueJSON ?? [];
  });
}

export async function fetchWaitingGames(token?: string) {
  if (!token) return { data: [], isLoading: false, error: null };

  return fetchWithRetry(async () => {
    const result = await preloadQuery(
      api.users.getWaitingPlayers,
      {},
      { token }
    );
    return result._valueJSON ?? [];
  });
}
