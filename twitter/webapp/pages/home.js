import {Container} from "@material-ui/core";
import React, {useState} from "react";
import Tweet from "../components/Tweet";
import {MenuSidebar} from "../components/MenuSidabar";
import Head from "next/head";

const Home = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    return (
        <>
            <Head>
                {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
                <title>
                    Home | Twitter
                </title>
            </Head>
            <Container>
                <MenuSidebar
                    onClose={() => setSidebarOpen(true)}
                    open={isSidebarOpen}
                >
                    <Tweet />
                </MenuSidebar>
            </Container>
        </>

    );
};


export default Home;
