import { Server } from "socket.io";
import { handleCreateRoom } from "./controllers/user.js";
import { generateSessionId } from "./utils/helpers.js";

const activeUsers = new Map(); // userId -> user data
const activeRooms = new Map(); // roomId -> GameRoom
const connectionRateLimits = new Map(); // IP -> connection attempts

const socketConfig = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
    skipMiddlewares: true,
  },
  pingInterval: 15000, // 15 seconds
  pingTimeout: 5000, // 5 seconds
};

export function initializeSocket(httpServer) {
  const io = new Server(httpServer, socketConfig);
  io.use((socket, next) => {
    // Rate limiting middleware
    const ip = socket.handshake.address;
    const now = Date.now();
    const rateLimitWindow = 60 * 1000; // 1 minute
    const maxConnectionsPerMinute = 5;

    const connectionAttempts = connectionRateLimits.get(ip) || [];
    const recentAttempts = connectionAttempts.filter(
      (timestamp) => now - timestamp < rateLimitWindow
    );

    if (recentAttempts.length >= maxConnectionsPerMinute) {
      return next(new Error("Too many connection attempts"));
    }

    connectionRateLimits.set(ip, [...recentAttempts, now]);
    next();
  });

  io.on("connection", (socket) => {
    console.log(`🟢 New connection: ${socket.id}`);

    // Store the original socket ID for reconnection tracking
    const originalSocketId = socket.id;
    let sessionId = socket.handshake.auth.sessionId;
    console.log(`sessionId: ${sessionId}`);

    if (!sessionId) {
      sessionId = generateSessionId();
      socket.emit("session_created", { sessionId });
    }

    // Ping-Pong handling with session awareness
    socket.on("ping", (cb) => {
      if (typeof cb === "function") {
        cb({
          serverTime: Date.now(),
          sessionId,
          socketId: originalSocketId,
        });
      }
    });

    // Core events with session awareness
    socket.on("user_joined", (data) => {
      try {
        handleCreateRoom(socket, { ...data, sessionId }, activeUsers);
      } catch (error) {
        console.error("Error in user_joined handler:", error);
        socket.emit("error", { message: "Failed to join user" });
      }
    });

    socket.on("disconnect", (reason) => {
      console.log(`🔴 Disconnected: ${socket.id} (${reason})`);

      // Don't immediately clean up - wait for potential reconnection
      setTimeout(() => {
        const user = Array.from(activeUsers.values()).find(
          (u) => u.socketId === socket.id
        );

        if (user && !io.sockets.sockets.has(socket.id)) {
          activeUsers.delete(user.userId);
          socket.broadcast.emit("user_left", {
            userId: user.userId,
            username: user.username,
          });
        }
      }, 10000); // 10 second grace period
    });

    // Handle reconnection with same session
    socket.on("reconnect_attempt", () => {
      socket.auth = { sessionId };
    });
  });

  return io;
}
