const { UserInputError, AuthenticationError } = require('apollo-server');
const User = require('../models/user');
const Group = require('../models/group');
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
  // Check if the user is authenticated
  if (!user) {
    throw new AuthenticationError("You must be logged in to create a group");
  }

  // Check if the user already has a group with this title
  const existingGroup = await Group.findOne({
    title, 
    members: user.id 
  });

  if (existingGroup) {
    throw new UserInputError("You already have a group with this title");
  }

  // Create the new group
  const newGroup = await Group.create({
    title,
    description,
    members: [user.id], // Add the creating user as the first member
  });

  // Add the group to the user's groups
  await User.findByIdAndUpdate(user.id, {
    $push: { groups: newGroup.id }
  });

  // Return the new group
  return newGroup.populate('members');
};

const addUserToGroup = async (_, { userId, groupId }, { user }) => {
  if (!user) throw new AuthenticationError('You must be logged in to add users to a group');

  const group = await Group.findById(groupId);
  if (!group) throw new UserInputError('Group not found');

  if (!group.members.includes(user.id)) throw new AuthenticationError('You must be a member of the group to add users');

  if (group.members.includes(userId)) throw new UserInputError('User is already a member of this group');

  group.members.push(userId);
  await group.save();
  await User.findByIdAndUpdate(userId, { $push: { groups: groupId } });

  return group;
};

const removeUserFromGroup = async (_, { userId, groupId }, { user }) => {
  if (!user) throw new AuthenticationError('You must be logged in to remove users from a group');

  const group = await Group.findById(groupId);
  if (!group) throw new UserInputError('Group not found');

  if (!group.members.includes(user.id)) throw new AuthenticationError('You must be a member of the group to remove users');

  group.members = group.members.filter(memberId => memberId.toString() !== userId);
  await group.save();
  await User.findByIdAndUpdate(userId, { $pull: { groups: groupId } });

  return group;
};

// Add other mutations here...

module.exports = {
  registerUser,
  createGroup,
  addUserToGroup,
  removeUserFromGroup,
  // Add other mutations to the export...
};