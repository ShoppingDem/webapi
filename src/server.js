const { ApolloServer } = require('apollo-server');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');
const models = require('./models');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;
const connectDB = async () => {
  if (process.env.NODE_ENV === 'development') {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    console.log('Connected to in-memory MongoDB');
  } else {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  }
};

connectDB().catch(err => console.error('Error connecting to MongoDB:', err));
// Environment variable to determine if we're in development mode
const isDev = process.env.NODE_ENV === 'development';

// Okta configuration (only used in production)
const oktaJwtVerifier = !isDev ? new OktaJwtVerifier({
  issuer: process.env.OKTA_ISSUER || 'https://YOUR_OKTA_DOMAIN/oauth2/default',
  clientId: process.env.OKTA_CLIENT_ID || 'YOUR_CLIENT_ID'
}) : null;
const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if (isDev) {
      // In development mode, use a mock user
      return { 
        models, 
        user: { 
          sub: 'dev@example.com', 
          name: 'Dev User',          
        } 
      };
    }

    // Production mode
    const token = req.headers.authorization || '';

    if (token) {
      try {
        const jwt = token.replace('Bearer ', '');
        const { claims } = await oktaJwtVerifier.verifyAccessToken(jwt, 'api://default');

        return { models, user: claims };
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    }

    return { models };
  }
});

module.exports = server;