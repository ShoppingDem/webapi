const Group = require('../../models/group');
const User = require('../../models/user');
const { UserInputError, AuthenticationError } = require('apollo-server');

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

module.exports = { createGroup };