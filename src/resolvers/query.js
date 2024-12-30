const User = require('../models/user');
const Item = require('../models/item');

const Query = {
  hello: () => `
    Welcome to the Group Shopping List API!

    This API allows users to create and manage shopping lists, add items to purchase,
    and track purchased items. Here's what you can do:

    1. User Management:
       - Register new users
       - Log in to get an authentication token
       - Retrieve user information

    2. Item Management:
       - Add items to a shopping list
       - Remove items from the list
       - Mark items as purchased
       - View all items

    Use the provided mutations and queries to interact with the API and manage your 
    shopping experience efficiently!
  `,

  getUser: async (_, { id }) => {
    try {
      return await User.findById(id);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  },

  getAllUsers: async () => {
    try {
      return await User.find();
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw new Error('Failed to fetch all users');
    }
  },

  getUserByEmail: async (_, { email }) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new Error('Failed to fetch user by email');
    }
  },

  getUserByPhone: async (_, { phoneNumber }) => {
    try {
      const user = await User.findOne({ phoneNumber });
      return user;
    } catch (error) {
      console.error('Error fetching user by phone:', error);
      throw new Error('Failed to fetch user by phone');
    }
  },

  getAllItems: async (_, __, { models }) => {
    try {
      const items = await models.Item.find({}).populate('createdBy group');
      return items;
    } catch (error) {
      console.error('Error fetching all items:', error);
      throw new Error('Failed to fetch items');
    }
  },

  getItem: async (_, { id }) => {
    try {
      return await Item.findById(id);
    } catch (error) {
      console.error('Error fetching item:', error);
      throw new Error('Failed to fetch item');
    }
  },
};

module.exports = Query;
