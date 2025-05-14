import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { typeDefs, resolvers } from "./schema.mjs";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";

async function createApolloGraphqlServer(httpServer) {
  // 1. Create WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  // 2. WebSocket server cleanup
  const serverCleanup = useServer({ schema }, wsServer);

  const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (formattedError, error) => {
      if (formattedError?.extensions?.code === "UNAUTHENTICATED") {
        return { message: "you must be logged in to query this schema" };
      }
      if (formattedError.message.startsWith("Database Error: ")) {
        return { message: "Internal server error" };
      }
      // Otherwise return the formatted error. This error can also
      // be manipulated in other ways, as long as it's returned.
      return formattedError;
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ footer: true }),
    ],
  });

  // Ensure we wait for our server to start
  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
