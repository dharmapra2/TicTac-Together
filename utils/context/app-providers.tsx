// contexts/index.tsx
"use client";

import { ConnectionStatusProvider } from "./connection-status";
import { SocketConnectionProvider } from "./socket-connection";
import { UserProvider } from "./user";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SocketConnectionProvider>
      <ConnectionStatusProvider>
        <UserProvider>{children}</UserProvider>
      </ConnectionStatusProvider>
    </SocketConnectionProvider>
  );
}
