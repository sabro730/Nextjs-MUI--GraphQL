import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import {useQuery} from "@apollo/client";
import {Box} from "@mui/material";
import {GET_ALL_TWEETS} from "../graphql/queries/tweet";

const TweetCard = () => {

    const {loading: loading, error: error, data: data} = useQuery(
        GET_ALL_TWEETS
    );

    if (loading) return <p>Loading tweets...</p>;
    if (error) return <p>Error :(</p>;

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getMonthName = (date) => {
        const TweetDate = new Date(date);
        const month = TweetDate.getMonth();
        const day = TweetDate.getDate();
        const year = TweetDate.getFullYear();
        return monthNames[month] + " " + day + ", " + year;
    }

    return (
        <>
            <Box>
                <Typography align="center" variant="h4" sx={{paddingTop: 5}}>
                    Latest Tweets
                </Typography>
                {
                    data?.tweets?.length > 0 ? data?.tweets?.map((tweet) => (
                        <Card sx={{maxWidth: 700, marginTop: 2, marginLeft: 15}} key={tweet.id}>
                            <div>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{backgroundColor: red[500]}} aria-label="tweet">
                                            {tweet?.user?.firstName?.charAt(0)}
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon/>
                                        </IconButton>
                                    }
                                    title={tweet?.user?.firstName + " " + tweet?.user?.lastName}
                                    subheader={getMonthName(tweet?.createdAt)}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {tweet?.description}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteBorderOutlinedIcon/>
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ChatBubbleOutlineOutlinedIcon/>
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <IosShareOutlinedIcon/>
                                    </IconButton>
                                </CardActions>
                            </div>
                        </Card>
                    )) : <div className="text-center">No tweets yet</div>
                }
            </Box>
        </>
    );
}

export default TweetCard;