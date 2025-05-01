// components/UserNotifications.tsx
"use client";

import { useSocketContext } from "@/utils/context/socket-connection";
import { useEffect, useState } from "react";

type Notification = {
  message: string;
  username: string;
  userId: string;
  isReconnect?: boolean;
};

export default function UserNotifications() {
  const socket = useSocketContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!socket) return;

    const handleNewUser = (data: Notification) => {
      setNotifications((prev) => [
        ...prev,
        {
          ...data,
          message: data.isReconnect
            ? `${data.username} reconnected`
            : `${data.username} joined the game`,
        },
      ]);

      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((n) => n.userId !== data.userId)
        );
      }, 5000);
    };

    const handleUserLeft = (data: { userId: string }) => {
      setNotifications((prev) => prev.filter((n) => n.userId !== data.userId));
    };

    socket.on("new_user_notification", handleNewUser);
    socket.on("user_left", handleUserLeft);

    return () => {
      socket.off("new_user_notification", handleNewUser);
      socket.off("user_left", handleUserLeft);
    };
  }, [socket]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map((queue, index) => (
        <div
          key={index}
          className="bg-green-500/90 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in"
        >
          {queue?.message || "Default Msg"}
        </div>
      ))}
    </div>
  );
}
