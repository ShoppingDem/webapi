const { UserInputError } = require('apollo-server');
const User = require('../models/user');

const mutations = {
  registerUser: async (_, { email, phoneNumber, name }, { models }) => {
    if (!email && !phoneNumber) {
      throw new UserInputError('Either email or phone number is required');
    }

    if (!name) {
      throw new UserInputError('Name is required');
    }
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
      if (existingUser) {
        throw new UserInputError('User already exists');
      }

      // Create new user
      const newUser = new User({
        email,
        phoneNumber,
        name
      });
      await newUser.save();

      return newUser;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new UserInputError('Failed to register user');
    }
  },

};

module.exports = mutations;