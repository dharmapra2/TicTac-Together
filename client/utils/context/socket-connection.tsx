// contexts/socket-connection.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketState = {
  socket: Socket | null;
  isInitialized: boolean;
};

const SocketConnectionContext = createContext<SocketState>({
  socket: null,
  isInitialized: false,
});

export function SocketConnectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<SocketState>({
    socket: null,
    isInitialized: false,
  });

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL!, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true,
    });

    setState({
      socket: socketInstance,
      isInitialized: true,
    });

    return () => {
      socketInstance.disconnect();
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

  if (!context.isInitialized) {
    // Return null while initializing instead of throwing
    return null;
  }

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
