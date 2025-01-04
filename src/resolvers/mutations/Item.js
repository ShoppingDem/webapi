const GroupModel = require('../../models/group');
const Item = require('../../models/item');
const { UserInputError, AuthenticationError } = require('apollo-server');

const ItemMutations = {
  addItemToGroup: async (_, { groupId, itemData }, { user }) => {
    if (!user) {
      throw new AuthenticationError("You must be logged in to add an item to a group");
    }

    const group = await GroupModel.findById(groupId);
    if (!group) {
      throw new UserInputError("Group not found");
    }

    if (!group.members.includes(user.id)) {
      throw new AuthenticationError("You must be a member of the group to add items");
    }

    const newItem = new Item({
      ...itemData,
      createdBy: user.id,
      group: groupId
    });

    await newItem.save();

    group.items.push(newItem.id);
    await group.save();

    return newItem;
  },

  removeItemFromGroup: async (_, { groupId, itemId }, { user }) => {
    if (!user) {
      throw new AuthenticationError("You must be logged in to remove an item from a group");
    }

    const group = await GroupModel.findById(groupId);
    if (!group) {
      throw new UserInputError("Group not found");
    }

    if (!group.members.includes(user.id)) {
      throw new AuthenticationError("You must be a member of the group to remove items");
    }

    const item = await Item.findById(itemId);
    if (!item) {
      throw new UserInputError("Item not found");
    }

    if (item.group.toString() !== groupId) {
      throw new UserInputError("This item does not belong to the specified group");
    }

    // Remove the item from the group
    group.items = group.items.filter(id => id.toString() !== itemId);
    await group.save();

    // Delete the item
    await Item.findByIdAndDelete(itemId);

    return { success: true, message: "Item removed successfully" };
  }
};

module.exports = ItemMutations;