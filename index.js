require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./src/schema/typeDefs');
const resolvers = require('./src/resolvers');
const models = require('./src/models');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    models,
    // You can add more context here if needed
  }),
});

async function startServer() {
  let mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    const mongod = await MongoMemoryServer.create();
    mongoUri = mongod.getUri();
  }

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');

  const { url } = await server.listen();
  console.log(`🚀 Server ready at ${url}`);
}

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});