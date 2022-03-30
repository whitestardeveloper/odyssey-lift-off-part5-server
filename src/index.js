const { ApolloServer } = require("apollo-server");
const express = require('express');
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const TrackAPI = require("./datasources/track-api");

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
      origin: 'http://localhost:3000',
      credentials: true
    },
    dataSources: () => {
      return {
        trackAPI: new TrackAPI(),
      };
    },
  });


const app = express();

var corsOptions = {
  origin:'https://client-castsronauts.herokuapp.com/',
  credentials: true // <-- REQUIRED backend setting
};

app.use(cors(corsOptions));
server.applyMiddleware({
  app,
  path: '/',
  cors: false, // disables the apollo-server-express cors to allow the cors middleware use
})

  const { url, port } = await server.listen({ port: precess.env.PORT || 4000 });
  console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);
