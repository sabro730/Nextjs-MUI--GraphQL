import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation LoginNow($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const REGISTER_NEW_USER = gql`
  mutation RegisterNow($username: String!, $password: String!, $firstName: String!, $lastName: String!) {
    createUser(username: $username, password: $password, firstName: $firstName, lastName: $lastName) {
      user {
        id
        username
      }
    }
  }
`;
