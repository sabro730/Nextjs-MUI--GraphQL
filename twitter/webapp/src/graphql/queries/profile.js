import { gql } from "@apollo/client";

export const GET_USER_PROFILES = gql`
  {
  profiles{
    id
    user{
      id
      username
      firstName
      lastName
    }
  }
}
`;