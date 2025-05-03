"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useSocketContext } from "./socket-connection";
import { setServerUserCookies } from "../actions/user-server";

type User = {
  username: string;
  userId: string;
  socketId: string | null;
};

type UserContextType = {
  user: User | null;
  setUser: (username: string) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
};

const UserContext = createContext<UserContextType | null>(null);

// Moved outside component to avoid recreation
const getClientStorage = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key) || sessionStorage.getItem(key);
};

const setClientStorage = (
  key: string,
  value: string,
  persistent: boolean
): void => {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  persistent
    ? localStorage.setItem(key, value)
    : sessionStorage.setItem(key, value);
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const socket = useSocketContext();
  const [state, setState] = useState<{
    user: User | null;
    isLoading: boolean;
    error: Error | null;
  }>({
    user: null,
    isLoading: true,
    error: null,
  });

  // Stable user ID generation/retrieval
  const getOrCreateUserId = useCallback(async (): Promise<string | null> => {
    try {
      console.log(`getOrCreateUserId called`);
      const storedUserId = getClientStorage("tictactoe_userId");
      if (storedUserId) return storedUserId;

      const newUserId = crypto.randomUUID();
      setClientStorage("tictactoe_userId", newUserId, true);
      return newUserId;
    } catch (error) {
      console.error("Storage access failed:", error);
      return null;
    }
  }, []); // Removed dependencies since storage functions are now stable

  // Socket ID updates - optimized with ref check
  useEffect(() => {
    if (!socket?.id || !state.user || state.user.socketId === socket.id) return;

    setState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, socketId: socket.id || null } : null,
    }));
  }, [socket?.id, state.user]);

  // User setter with proper error handling
  const setUser = useCallback(
    async (username: string): Promise<void> => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        const userId = await getOrCreateUserId();
        if (!userId) throw new Error("Failed to get/create user ID");

        const newUser: User = {
          username,
          userId,
          socketId: socket?.id || null,
        };
        setServerUserCookies(userId, username);

        setClientStorage("tictactoe_username", username, false);
        setState({ user: newUser, isLoading: false, error: null });

        if (socket?.connected) {
          await new Promise<void>((resolve, reject) => {
            socket.emit("user_joined", newUser, (ack: { success: boolean }) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              ack.success
                ? resolve()
                : reject(new Error("Server rejected user join"));
            });
          });
        }
      } catch (error) {
        console.error("Failed to set user:", error);
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error : new Error("Unknown error"),
          isLoading: false,
        }));
      }
    },
    [socket, getOrCreateUserId]
  );

  // Initialize user once on mount
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const userId = await getOrCreateUserId();
        const username = getClientStorage("tictactoe_username");

        if (userId && username) {
          setState({
            user: { username, userId, socketId: socket?.id || null },
            isLoading: false,
            error: null,
          });
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error("Initialization failed:", error);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initializeUser();
  }, [getOrCreateUserId]); // Removed socket.id from dependencies

  const contextValue = useMemo(
    () => ({
      user: state.user,
      setUser,
      isLoading: state.isLoading,
      error: state.error,
    }),
    [state.user, state.isLoading, state.error, setUser]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
