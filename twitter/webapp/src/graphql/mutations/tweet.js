import {gql} from "@apollo/client";

export const ADD_TWEET = gql`
  mutation CreateTweet($description: String!) {
    createTweet(description: $description) {
      tweet {
        id
        description
        createdAt
      }
    }
  }
`;