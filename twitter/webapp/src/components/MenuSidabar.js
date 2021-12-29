import React, { useState} from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    AppBar,
    Box,
    Button, CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, TextareaAutosize, Toolbar, Tooltip,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import {gql, useMutation, useQuery} from "@apollo/client";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import {ADD_TWEET} from "../graphql/mutations/tweet";
import {GET_ALL_TWEETS} from "../graphql/queries/tweet";
import {GET_USER_DATA} from "../graphql/queries/user";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


const items = [
    {
        href: '/home',
        icon: (<HomeIcon fontSize="medium"/>),
        title: 'Home'
    },
    {
        href: '/profiles',
        icon: (<PersonIcon fontSize="medium"/>),
        title: 'People'
    },
];

export const MenuSidebar = ({props, children}) => {

    const [PopupState, setPopupState] = useState(false);
    const [description, setDescription] = useState("");

    const [error, setError] = useState('');


    const [createTweet] = useMutation(ADD_TWEET, {
        onCompleted(data) {
            setDescription("");
        },
        refetchQueries: [
            {
                query: GET_ALL_TWEETS,
            },
        ],
    });

    const addNewTweet = () => {
        createTweet({variables: {description: description}}).catch(() => {
            setError("Tweet is too long");
            setPopupState(true);
        });
        if (error === '') {
            setPopupState(false);
        }
    };


    const {loading: userloding, error: usererror, data: userdata} = useQuery(
        GET_USER_DATA
    );


    const handleOpen = () => {
        setPopupState(true);
    };

    const logoutNow = () => {
        window.localStorage.clear();
        window.location.href = "/";
    };

    const handleClose = () => {
        setPopupState(false);
        setError('');
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Typography variant="h5" sx={{fontWeight: "bold !important"}}>
                        Twitter
                    </Typography>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Typography align="center" variant="h6">
                                Hello, {userdata?.user?.username}!
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="end">
                        <Grid item>
                            <Tooltip placement="top-end" onClick={logoutNow} title={''}>
                                <Button variant='contained' sx={{backgroundColor: 'mediumvioletred !important'}}
                                        color='error'>Logout</Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Box>
                <Drawer
                    variant="permanent"
                >
                    <Toolbar/>
                    <Box sx={{overflow: 'auto'}}>
                        <List>
                            {items.map((item, index) => (
                                <a href={item?.href} key={index}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            {item?.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item?.title}/>
                                    </ListItem>
                                </a>
                            ))}
                        </List>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant="outlined" color="primary" sx={{margin: '20px'}} onClick={handleOpen}>
                            New Tweet
                        </Button>
                    </Box>
                </Drawer>
            </Box>


            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                {children}
            </Box>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={PopupState}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    What's up?
                </BootstrapDialogTitle>
                {
                    error &&
                    <Alert severity="error">{error}</Alert>
                }
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <TextareaAutosize
                            aria-label="maximum height"
                            maxRows={10}
                            minRows={6}
                            minLength={20}
                            placeholder="Write your tweet here..."
                            style={{width: 500}}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant="outlined" color="success" onClick={addNewTweet}>
                        Post Tweet
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Box>
    );
};


MenuSidebar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};
