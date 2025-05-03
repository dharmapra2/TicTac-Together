import express from "express";
import { createServer } from "http";
import { initializeSocket } from "./socket.js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const PORT = process.env.PORT || 3020;
const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO
initializeSocket(httpServer);

app.get("/", (req, res) => {
  res.send("TicTacToe Socket.IO Server is running");
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
