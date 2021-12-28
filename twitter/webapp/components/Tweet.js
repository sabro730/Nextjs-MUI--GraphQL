import {gql, useMutation, useQuery} from "@apollo/client";
import {
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
    Typography,
} from "@material-ui/core";
import React, {useState} from "react";
import TweetCard from "./TweetCard";

const Tweet = () => {
    // const [title, setTitle] = useState("");
    // const [todoid, setTodoid] = useState(null);
    // const [edittodo, setEdittodo] = useState(false);
    // const {loading, error, data} = useQuery(GET_ALL_TWEETS);
    // const {loading: userloding, error: usererror, data: userdata} = useQuery(
    //     GET_ALL_TWEETS
    // );
    //
    // const [createTodo] = useMutation(Add_TODO, {
    //     onCompleted(data) {
    //         setTitle("");
    //     },
    //     refetchQueries: [
    //         {
    //             query: GET_ALL_TWEETS,
    //         },
    //     ],
    // });
    // const [updateTodo] = useMutation(EDIT_TODO, {
    //     onCompleted(data) {
    //         console.log("Update todo", data);
    //         setTitle("");
    //         setEdittodo(false);
    //     },
    //     refetchQueries: [
    //         {
    //             query: GET_ALL_TWEETS,
    //         },
    //     ],
    // });
    // const [delateTodo] = useMutation(DELETE_TODO, {
    //     onCompleted(data) {
    //         console.log("Delate todo", data);
    //     },
    //     refetchQueries: [
    //         {
    //             query: GET_ALL_TWEETS,
    //         },
    //     ],
    // });
    // const addNewTodo = () => {
    //     createTodo({variables: {title: title}});
    // };
    // const editButtonHandeler = (id, title) => {
    //     setTitle(title);
    //     setEdittodo(true);
    //     setTodoid(parseInt(id));
    // };
    // const editAtodo = () => {
    //     updateTodo({variables: {id: todoid, title: title}});
    // };
    // const delateSingleTodo = (id) => {
    //     delateTodo({variables: {id: id}});
    // };

    // if (loading) return <h1>Loding...</h1>;
    // if (error) return <h1>Error...</h1>;
    return (
        <Container>
            <TweetCard />
        </Container>
    );
};

export default Tweet;
