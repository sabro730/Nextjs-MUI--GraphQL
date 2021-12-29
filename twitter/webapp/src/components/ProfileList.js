import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {Container} from "@mui/material";
import * as React from "react";
import {gql, useMutation, useQuery} from "@apollo/client";


const GET_USER_PROFILES = gql`
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


const FOLLOW_PROFILE_MUTATION = gql`
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


const ProfileList = () => {

    const {loading: loading, error: error, data: data} = useQuery(
        GET_USER_PROFILES,
        {
            fetchPolicy: "network-only",
            nextFetchPolicy: "cache-first"
        }
    );

    const [followUser] = useMutation(FOLLOW_PROFILE_MUTATION, {
        onCompleted(data) {
            console.log("Successfully followed user");
        }, refetchQueries: [{query: GET_USER_PROFILES}]
    });

    const followUserProfile = (userId) => {
        followUser({variables: {userId: userId}});
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error!</div>;
    }


    return (
        <>
            {
                data?.profiles?.length > 0 ?
                    data?.profiles?.map(profile => (
                        <Container maxWidth='sm' sx={{maxWidth: 'max-content'}} key={profile?.id}>
                            <List>
                                <ListItem sx={{maxWidth: 'inherit'}}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            {profile?.user?.firstName[0]}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={profile?.user?.firstName + " " + profile?.user?.lastName}
                                                  secondary={profile?.user?.username}/>
                                    <Button variant="contained" color="primary"
                                            sx={{backgroundColor: 'green !important'}}
                                            onClick={() => followUserProfile(profile?.user?.id)}>
                                        Follow
                                    </Button>
                                </ListItem>
                                <Divider/>
                            </List>
                        </Container>
                    )) :
                    <div className="text-center">No profiles found!</div>
            }


        </>
    )
}

export default ProfileList;