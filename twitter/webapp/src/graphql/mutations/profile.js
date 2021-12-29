import {gql} from "@apollo/client";

export const FOLLOW_PROFILE_MUTATION = gql`
  mutation FollowProfile($userId: Int!) {
    followProfile(userId: $userId){
    profile{
      user{
        id
      }
    }
  }
  }
`;
