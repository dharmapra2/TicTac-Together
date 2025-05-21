import express from "express";
import { createServer } from "http";
import { expressMiddleware } from "@apollo/server/express4";
import * as dotenv from "dotenv";
import cors from "cors";
import createApolloGraphqlServer from "./graphql/index.js";
import connectMongodb from "./config/connection.js";
import GlobalService from "./Services/GlobalService.js";

dotenv.config();

const PORT = process.env.PORT || 3020;
console.log(`PORT ${PORT}`);

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is up and running" });
});

/* connecting to mongodb */
// await connectMongodb();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  "/graphql",
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(await createApolloGraphqlServer(httpServer), {
    context: async ({ req }) => {
      const token = req.headers.authorization?.split(" ")[1];
      if (token) {
        try {
          const user = new GlobalService().decodeJWTToken(token);
          return { user };
        } catch (error) {
          console.error("Token error:", error);
        }
      }

      return {};
    },
  })
);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
});
