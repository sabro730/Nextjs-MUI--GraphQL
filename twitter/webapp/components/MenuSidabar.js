import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Box,
    Button, CssBaseline,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, Paper, TextareaAutosize, Toolbar, Tooltip,
    Typography,
    useMediaQuery
} from '@mui/material';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import {gql, useMutation, useQuery} from "@apollo/client";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

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
        href: '/',
        icon: (<HomeIcon fontSize="medium"/>),
        title: 'Home'
    },
    {
        href: '/',
        icon: (<ExploreIcon fontSize="medium"/>),
        title: 'Explore'
    },
    {
        href: '/',
        icon: (<NotificationsIcon fontSize="medium"/>),
        title: 'Notifications'
    },
    {
        href: '/',
        icon: (<MessageIcon fontSize="medium"/>),
        title: 'Messages'
    },
    {
        href: '/',
        icon: (<BookmarkBorderIcon fontSize="medium"/>),
        title: 'Bookmarks'
    },
    {
        href: '/',
        icon: (<PlaylistAddIcon fontSize="medium"/>),
        title: 'Lists'
    },
    {
        href: '/',
        icon: (<PersonIcon fontSize="medium"/>),
        title: 'Profile'
    },
    {
        href: '/',
        icon: (<ExpandMoreIcon fontSize="medium"/>),
        title: 'More'
    },
];

const GET_USER_DATA = gql`
  {
    user {
      id
      username
    }
  }
`;

const ADD_TWEET = gql`
  mutation CreateTweet($description: String!) {
    createTweet(description: $description) {
      tweet {
        id
        description
        date
      }
    }
  }
`;

const GET_ALL_TWEETS = gql`
    {
  tweets{
    id
    description
    date
    user{
      username
      firstName
      lastName
    }
  }
}
`;

export const MenuSidebar = ({props, children}) => {

    const [PopupState, setPopupState] = useState(false);
    const [description, setDescription] = useState("");

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
        createTweet({variables: {description: description}});
        setPopupState(false);
    };

    const {loading: userloding, error: usererror, data: userdata} = useQuery(
        GET_USER_DATA
    );

    const drawerWidth = 280;

    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        if (isMobile) {
            setOpen(false);
        }
    }, [isMobile]);

    const handleOpen = () => {
        setPopupState(true);
        console.log("Cuhaa")
    };

    const logoutNow = () => {
        window.localStorage.clear();
        window.location.href = "/";
    };

    const handleClose = () => {
        setPopupState(false);
        console.log("Cuhaa")
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Typography variant="h5" Wrap sx={{fontWeight: "bold !important"}}>
                        Twitter
                    </Typography>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Typography align="center" variant="h6">
                                Hello {userdata?.user?.username}!
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
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                }}
            >
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        {items.map((item, index) => (
                            <ListItem button key={index} href={item.href}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.title}/>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button variant="outlined" color="primary" sx={{margin: '20px'}} onClick={handleOpen}>
                        New Tweet
                    </Button>
                </Box>
            </Drawer>
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