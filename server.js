const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./src/schema/typeDefs');
const resolvers = require('./src/resolvers');

// Assume you've already set up your MongoDB connection
mongoose.connect('mongodb://localhost:27017/your_database', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});