import { readFileSync } from "fs";
import { globSync } from "glob";
import gql from "graphql-tag";
import { resolversData as postControllerResolver } from "../Resolvers/postResolver.js";
import { resolvers as graphqlCustomerResolver } from "../Resolvers/customerResolver.js";

// Use glob to find all GraphQL files in the src directory
const currentFilePath = "./graphql/**/*.graphql";
const graphqlFiles = globSync(currentFilePath);

// Read and concatenate the contents of all GraphQL files
const typeDefs = gql(
  graphqlFiles
    .map((file) => readFileSync(file, { encoding: "utf-8" }))
    .join("\n")
);

// Multiple files to keep your project modularised
// Dynamically merge resolvers
// const resolvers: Record<string, any> = {};
// const resolverModules = [postControllerResolver];

// resolverModules.forEach((resolverModule) => {
//   Object.keys(resolverModule).forEach((operation) => {
//     console.log(`operation : ${operation}, resolverModule: `);
//     console.log(resolverModule);
//     // resolvers[operation] = [...resolverModule[operation]];
//   });
// });
const resolvers = {
  Query: {
    ...postControllerResolver.Query,
    ...graphqlCustomerResolver.Query,
  },
  Mutation: {
    ...postControllerResolver.Mutation,
    ...graphqlCustomerResolver.Mutation,
  },
};
export { typeDefs, resolvers };
