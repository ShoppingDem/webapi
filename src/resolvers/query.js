const User = require('../models/user');

const Query = {
  hello: () => "Hello, World!",
  getUser: (_, { id }, { models }) => {
    // Implement getUser logic
  },
  getAllUsers: (_, __, { models }) => {
    // Implement getAllUsers logic
  },
  getUserByEmail: async (_, { email }) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  },
};

module.exports = Query;