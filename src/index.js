const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const TrackAPI = require("./datasources/track-api");
const express = require("express");
const cors = require("cors");

const app = express();

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        trackAPI: new TrackAPI(),
      };
    },
  });

  
var corsOptions = {
  origin: 'https://server-castsronauts.herokuapp.com/',
  credentials: true // <-- REQUIRED backend setting
};

app.use(cors(corsOptions));

  server.applyMiddleware({
		app,
		path: '/',
		cors: false
	});

  const { url, port } = await server.listen({ port: process.env.PORT || 4000 });
  console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);
