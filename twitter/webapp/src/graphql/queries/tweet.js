import {gql } from "@apollo/client";

export const GET_ALL_TWEETS = gql`
    {
  tweets{
    id
    description
    createdAt
    user{
      username
      firstName
      lastName
    }
  }
}
`;