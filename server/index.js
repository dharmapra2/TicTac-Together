import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const PORT = process.env.PORT || 3020;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ---- Socket Events ----
const activeUsers = new Map(); // userId -> user data

io.on("connection", (socket) => {
  console.log(`🟢 New connection: ${socket.id}`);

  socket.on("user_joined", (data) => {
    console.log(data);
    const userData = {
      ...data,
      socketId: socket.id,
      lastSeen: new Date(),
    };

    // Update or add user
    activeUsers.set(data.userId, userData);

    if (data.isReconnect) {
      console.log(`↩️ User reconnected: ${data.username}`);
      socket.broadcast.emit("user_reconnected", {
        userId: data.userId,
        username: data.username,
      });
    } else {
      console.log(`👋 New user joined: ${data.username}`);
      socket.broadcast.emit("new_user_notification", {
        userId: data.userId,
        username: data.username,
        message: `${data.username} joined the game`,
      });
    }

    // Send active users (excluding current)
    const others = Array.from(activeUsers.values()).filter(
      (u) => u.userId !== data.userId
    );
    socket.emit("active_users", others);
  });

  socket.on("disconnect", () => {
    const user = Array.from(activeUsers.values()).find(
      (u) => u.socketId === socket.id
    );

    if (user) {
      console.log(`🔴 Disconnected: ${user.username}`);

      console.log(activeUsers, socket.id, user?.socketId === socket.id);
      // Set timeout to handle reconnection
      setTimeout(() => {
        if (user?.socketId === socket.id) {
          activeUsers.delete(user.userId);
          socket.broadcast.emit("user_left", {
            userId: user.userId,
            username: user.username,
          });
        }
      }, 10000); // 10 second grace period
    }
  });
});

function generateUniqueUserId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

app.get("/", (req, res) => {
  res.send("TicTacToe Socket.IO Server is running");
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
