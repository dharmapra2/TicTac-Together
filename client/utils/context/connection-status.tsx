"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSocketContext } from "./socket-connection";

const ConnectionStatusContext = createContext<boolean>(false);

export function ConnectionStatusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const socket = useSocketContext();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!socket) return;

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  return (
    <ConnectionStatusContext.Provider value={isConnected}>
      {children}
    </ConnectionStatusContext.Provider>
  );
}

export const useConnectionStatus = () => useContext(ConnectionStatusContext);
