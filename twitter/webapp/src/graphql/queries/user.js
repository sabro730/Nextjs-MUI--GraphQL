import {gql} from "@apollo/client";

export const GET_USER_DATA = gql`
  {
    user {
      id
      username
    }
  }
`;