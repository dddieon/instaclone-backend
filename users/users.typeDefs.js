import { gql } from "apollo-server";

export default gql`
  # Result
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }

  # Mutation
  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): User
    login(
      username: String!,
      password: String!,
    ): LoginResult!
  }

  type Query {
    seeProfile(username: String!): User
  }
`