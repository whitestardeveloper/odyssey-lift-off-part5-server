const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const TrackAPI = require("./datasources/track-api");

const link = createHttpLink({
  uri: '*',
  credentials: 'same-origin'
});

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    link,
    dataSources: () => {
      return {
        trackAPI: new TrackAPI(),
      };
    },
  });

  const { url, port } = await server.listen({ port: precess.env.PORT || 4000 });
  console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);
