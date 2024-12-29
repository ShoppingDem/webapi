const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    email: String
    phoneNumber: String
    name: String!
  }

  type Query {
    hello: String
    getUser(id: ID!): User
    getAllUsers: [User!]!
    getUserByEmail(email: String!): User
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    registerUser(email: String, phoneNumber: String, name: String!): User!
    login(email: String, phoneNumber: String): AuthPayload!
  }
`;

module.exports = typeDefs;