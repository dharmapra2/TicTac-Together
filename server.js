import { createServer } from "node:http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3030", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

async function startServer() {
  try {
    await app.prepare();
    const httpServer = createServer((req, res) => {
      const parsedUrl = parse(req.url || "", true);
      handle(req, res, parsedUrl);
    });
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
      console.log(`User Connected: ${socket.id}`);
      socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
      });
    });

    httpServer.listen(port, () => {
      console.log(`Server is running on http://${hostname}:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
