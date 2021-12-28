import * as React from 'react';
import Typography from '@mui/material/Typography';
import Head from "next/head";
import ProfileList from "../components/ProfileList";

const Profiles = () => {
    return (
        <>
            <Head>
                {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
                <title>
                    Profiles | Twitter
                </title>
            </Head>
            <Typography align="center" variant="h4" sx={{paddingTop: 5}}>
                Follow profiles
            </Typography>
            <ProfileList />
        </>

    );
}

export default Profiles;