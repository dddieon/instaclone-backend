import {gql} from "apollo-server";

export default gql`
  type createAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccountResult(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): createAccountResult
  }
`