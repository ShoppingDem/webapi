const GroupModel = require('../../models/group');
const User = require('../../models/user');
const { UserInputError, AuthenticationError } = require('apollo-server');

const Group = {
  create: async (_, { title, description }, { models, user }) => {
    // Check if the user is authenticated
    if (!user) {
      throw new AuthenticationError("You must be logged in to create a group");
    }

    // Check if the user already has a group with this title
    const existingGroup = await GroupModel.findOne({
      title, 
      members: user.id 
    });

    if (existingGroup) {
      throw new UserInputError("You already have a group with this title");
    }

    // Create the new group
    const newGroup = await GroupModel.create({
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
  },

  checkMembership: async (groupId, userId) => {
    const group = await GroupModel.findById(groupId);
    if (!group) {
      throw new UserInputError("Group not found");
    }

    if (!group.members.includes(userId)) {
      throw new AuthenticationError("You must be a member of the group to perform this action");
    }

    return group;
  }
};

module.exports = Group;