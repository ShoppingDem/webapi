const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    email: String
    phoneNumber: String
    name: String!
    groups: [Group!]
  }

  type Group {
    id: ID!
    title: String!
    description: String
    members: [User!]!
    items: [Item!]!
  }

  type Item {
    id: ID!
    name: String!
    description: String
    quantity: Int!
    purchased: Boolean!
    createdBy: User!
    group: Group!
  }

  type Query {
    hello: String
    getUser(id: ID!): User
    getAllUsers: [User!]!
    getUserByEmail(email: String!): User
    getUserByPhone(phoneNumber: String!): User
    getGroup(id: ID!): Group
    getAllGroups: [Group!]!
    getGroupItems(groupId: ID!): [Item!]!
    getAllItems: [Item!]!
    getItem(id: ID!): Item  # Add this line
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    registerUser(email: String, phoneNumber: String, name: String!): User!
    login(email: String, phoneNumber: String): AuthPayload!
    createGroup(title: String!, description: String): Group!
    addUserToGroup(userId: ID!, groupId: ID!): Group!
    removeUserFromGroup(userId: ID!, groupId: ID!): Group!
    addItemToGroup(name: String!, description: String, quantity: Int!, groupId: ID!): Item!
    removeItemFromGroup(itemId: ID!, groupId: ID!): Group!
    purchaseItem(itemId: ID!): Item!
    scanReceipt(groupId: ID!, receiptData: String!): Group!
  }
`;

module.exports = typeDefs;