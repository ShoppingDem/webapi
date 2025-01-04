const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('../src/schema/typeDefs');
const resolvers = require('../src/resolvers');
const models = require('../src/models');

const testServer = (token) => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      models,
      user: token ? { id: 'testUserId' } : null, // Mock user object
    }),
  });
};

const resetDatabase = async () => {
  await Promise.all(
    Object.values(mongoose.connection.collections).map(async (collection) => 
      collection.deleteMany({})
    )
  );
};

module.exports = {
  testServer,
  resetDatabase,
};