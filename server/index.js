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
const activeUsers = new Map(); // socket.id -> user data

io.on("connection", (socket) => {
  console.log(`🟢 New client connected: ${socket.id}`);

  // Handle user login/join
  socket.on("user_joined", (data) => {
    // Store user data with socket ID
    activeUsers.set(socket.id, {
      username: data.username,
      userId: data.userId || generateUniqueUserId(), // Generate if not provided
      socketId: socket.id,
    });

    // Notify others (excluding the current user)
    socket.broadcast.emit("new_user_notification", {
      message: `${data.username} has joined the game!`,
      username: data.username,
      userId: activeUsers.get(socket.id).userId,
      isReconnect: false,
    });

    // Send existing users to the new user
    const usersArray = Array.from(activeUsers.values()).filter(
      (user) => user.socketId !== socket.id
    );
    socket.emit("existing_users", usersArray);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      console.log(`🔴 Client disconnected: ${user.username}`);
      activeUsers.delete(socket.id);

      // Notify others only after a delay (to account for reconnection)
      setTimeout(() => {
        if (!activeUsers.has(socket.id)) {
          // If not reconnected
          socket.broadcast.emit("user_left", {
            userId: user.userId,
            username: user.username,
          });
        }
      }, 5000); // 5 second grace period for reconnection
    }
  });

  // Handle explicit logout
  socket.on("user_left", () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      activeUsers.delete(socket.id);
      socket.broadcast.emit("user_left", {
        userId: user.userId,
        username: user.username,
      });
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
