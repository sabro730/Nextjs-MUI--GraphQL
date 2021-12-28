import {Container} from "@material-ui/core";
import React from "react";
import Tweet from "../components/Tweet";
import Head from "next/head";

const Home = () => {
    return (
        <>
            <Head>
                {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
                <title>
                    Home | Twitter
                </title>
            </Head>
            <Container>
                    <Tweet />
            </Container>
        </>

    );
};


export default Home;
