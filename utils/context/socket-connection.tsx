"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketState = {
  socket: Socket | null;
  isInitialized: boolean;
  sessionId: string | null;
};

const SocketConnectionContext = createContext<SocketState>({
  socket: null,
  isInitialized: false,
  sessionId: null,
});

export function SocketConnectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<SocketState>({
    socket: null,
    isInitialized: false,
    sessionId: null,
  });

  useEffect(() => {
    // Try to get session ID from sessionStorage
    const sessionId =
      typeof window !== "undefined"
        ? sessionStorage.getItem("socket_session_id")
        : null;

    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL!, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true,
      auth: sessionId ? { sessionId } : undefined,
    });

    const handleSessionCreated = (data: { sessionId: string }) => {
      console.log("handlesessioncreated", data);
      sessionStorage.setItem("socket_session_id", data.sessionId);
      setState((prev) => ({
        ...prev,
        sessionId: data.sessionId,
      }));
    };

    socketInstance.on("session_created", handleSessionCreated);

    // Ping handler to maintain connection
    const pingInterval = setInterval(() => {
      if (socketInstance.connected) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        socketInstance.emit("ping", (_response: unknown) => {
          // Update last active time or other status
        });
      }
    }, 10000); // Every 10 seconds

    setState({
      socket: socketInstance,
      isInitialized: true,
      sessionId,
    });

    return () => {
      socketInstance.off("session_created", handleSessionCreated);
      clearInterval(pingInterval);
      // Don't disconnect if we're just refreshing
      if (!socketInstance.auth?.sessionId) {
        socketInstance.disconnect();
      }
    };
  }, []);

  return (
    <SocketConnectionContext.Provider value={state}>
      {children}
    </SocketConnectionContext.Provider>
  );
}

export const useSocketContext = () => {
  const context = useContext(SocketConnectionContext);
  return context.socket;
};

export const useSocketRequired = () => {
  const socket = useSocketContext();

  if (!socket) {
    throw new Error(
      "Socket connection not available. " +
        "Make sure your component is wrapped in SocketConnectionProvider " +
        "and the connection is established."
    );
  }

  return socket;
};
