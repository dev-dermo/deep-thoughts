const express = require('express');

// import ApolloServer
const { ApolloServer } = require('apollo-server-express');

// import GraphQL schema
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// integrate our Apollo server with our express app as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);

    // log where we can go to test our GQL API
    console.log(`Visit http://localhost:${PORT}${server.graphqlPath}`);
  });
});
