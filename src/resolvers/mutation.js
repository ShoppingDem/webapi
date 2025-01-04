const { UserInputError, AuthenticationError } = require('apollo-server');
const Group = require('../models/group');
const User = require('../models/user');
const Item = require('../models/item');

const registerUser = async (_, { email, phoneNumber, name }, { models }) => {
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
};

const createGroup = async (_, { title, description }, { models, user }) => {
  if (!user) {
    throw new AuthenticationError("You must be logged in to create a group");
  }

  const existingGroup = await Group.findOne({
    title, 
    members: user.id 
  });

  if (existingGroup) {
    throw new UserInputError("You already have a group with this title");
  }

  const newGroup = await Group.create({
    title,
    description,
    members: [user.id],
    createdBy: user.id,
  });

  await User.findByIdAndUpdate(user.id, {
    $push: { groups: newGroup.id }
  });

  return newGroup.populate('members');
};
const addUserToGroup = async (_, { userId, groupId }, { user }) => {
  // ... (keep the existing implementation)
};

const removeUserFromGroup = async (_, { userId, groupId }, { user }) => {
  // ... (keep the existing implementation)
};

const deleteGroup = async (_, { groupId }, { user }) => {
  // ... (keep the existing implementation)
};

module.exports = {
  registerUser,
  createGroup,
  addUserToGroup,
  removeUserFromGroup,
  deleteGroup,
};