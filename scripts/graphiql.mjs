import { serveEncodedDefinition } from "@composedb/devtools-node";

/**
 * Runs GraphiQL server to view & query composites.
 */
const server = await serveEncodedDefinition({
  ceramicURL: process.env.NEXT_PUBLIC_CERAMIC || "http://localhost:7007",
  graphiql: true,
  path: "./src/__generated__/definition.json",
  port: process.env.GRAPHIQL_PORT || 5001,
});

console.log(`Graphiql server started on ${server.url}`);

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Server stopped");
  });
});
