"use client";

import { useEffect, useState } from "react";
import { useSocketContext } from "@/utils/context/SocketContext";

export default function UserNotifications() {
  const socket = useSocketContext();
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    if (!socket) return;

    const handleNewUser = (data: { message: string }) => {
      setNotifications((prev) => [...prev, data.message]);

      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 5000);
    };

    socket.on("new_user_notification", handleNewUser);

    return () => {
      socket.off("new_user_notification", handleNewUser);
    };
  }, [socket]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map((msg, index) => (
        <div
          key={index}
          className="bg-green-500/90 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in"
        >
          {msg}
        </div>
      ))}
    </div>
  );
}
