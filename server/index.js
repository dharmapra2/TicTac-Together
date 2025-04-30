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
io.on("connection", (socket) => {
  console.log(`🟢 New client connected: ${socket.id}`);

  // Emit welcome message
  socket.emit("connected", { message: "Welcome to TicTac Together!" });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`🔴 Client disconnected: ${socket.id}`);
  });
});

app.get("/", (req, res) => {
  // Serve HTML with env value injected
  const envValue = process.env.PORT;
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Socket.IO Test</title>
        <script src="https://cdn.socket.io/4.6.1/socket.io.min.js"></script>
      </head>
      <body>
        <h1>Socket.IO Client</h1>
        <div>Env Value: <span id="envValue">${envValue}</span></div>
        <script>
          const socket = io("http://localhost:${PORT}");

          socket.on("connected", (data) => {
            console.log("📩 Server:", data.message);
          });

          // Accessing the environment value in the client-side JS
          const envValueFromHtml = document.getElementById('envValue').innerText;
          console.log("Env value from HTML:", envValueFromHtml);
        </script>
      </body>
    </html>
  `);
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
