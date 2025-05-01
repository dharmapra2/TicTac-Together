// contexts/user.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSocketContext } from "./socket-connection";

type User = {
  username: string;
  userId: string;
  socketId: string | null;
};

const UserContext = createContext<{
  user: User | null;
  setUser: (username: string) => void;
}>({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const socket = useSocketContext();
  const [user, setUserState] = useState<User | null>(null);

  const getOrCreateUserId = useCallback(() => {
    const storedUserId = localStorage.getItem("tictactoe_userId");
    if (storedUserId) return storedUserId;

    const newUserId = crypto.randomUUID();
    localStorage.setItem("tictactoe_userId", newUserId);
    return newUserId;
  }, []);

  const setUser = useCallback(
    (username: string) => {
      const userId = getOrCreateUserId();
      if (!userId) return;

      const newUser = {
        username,
        userId,
        socketId: socket?.id || null,
      };

      setUserState(newUser);
      sessionStorage.setItem("tictactoe_username", username);

      if (socket?.connected) {
        socket.emit("user_joined", newUser);
      }
    },
    [socket, getOrCreateUserId]
  );

  useEffect(() => {
    const userId = getOrCreateUserId();
    const username = sessionStorage.getItem("tictactoe_username");

    if (userId && username) {
      setUserState({
        username,
        userId,
        socketId: null,
      });
    }
  }, [getOrCreateUserId]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
