import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Container } from "@mui/material";
import * as React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_PROFILES } from "../graphql/queries/profile";
import { FOLLOW_PROFILE_MUTATION } from "../graphql/mutations/profile";
import { blue } from "@mui/material/colors";



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
                                        <Avatar sx={{backgroundColor: blue[500]}}>
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