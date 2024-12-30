const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectToDatabase = async () => {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
  }
  const mongoUri = mongoServer.getUri();
  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to in-memory database');
  } catch (err) {
    console.error('Failed to connect to in-memory database:', err);
    throw err;
  }
};

const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
    mongoServer = null;
  }
  console.log('Closed in-memory database connection');
};

beforeAll(async () => {
  await connectToDatabase();
}, 60000);

afterAll(async () => {
  await disconnectDatabase();
}, 60000);
module.exports = {
  setupTestData: async () => {
    try {
      await mongoose.model('Group').deleteMany({});
      await mongoose.model('User').updateMany({}, { $set: { groups: [] } });
    } catch (err) {
      console.error('Error in setupTestData:', err);
    }
  },
  getMockModels: () => ({
    Group: mongoose.model('Group'),
    User: mongoose.model('User'),
  }),
  connectToDatabase,
  disconnectDatabase,
};
