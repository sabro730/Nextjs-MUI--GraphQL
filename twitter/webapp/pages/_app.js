import {ApolloProvider} from "@apollo/client";
import {useApollo} from "../lib/apolloClient";
import 'tailwindcss/tailwind.css'
import AuthPage from "../src/components/AuthPage";
import {useEffect, useState} from "react";
import {StyledEngineProvider} from '@mui/material/styles';
import {MenuSidebar} from "../src/components/MenuSidabar";


function MyApp({Component, pageProps}) {
    const apolloClient = useApollo(pageProps.initialApolloState);

    const [localStorage, setlocalStorage] = useState(0);
    useEffect(() => {
        setlocalStorage(window.localStorage.getItem('token'));
    }, []);

    return (
        <ApolloProvider client={apolloClient}>
            <StyledEngineProvider injectFirst>
                <div style={{margin: "20px"}}>
                    {!localStorage ? <AuthPage/> :
                    <MenuSidebar>
                        <Component {...pageProps}/>
                    </MenuSidebar>}
                </div>
            </StyledEngineProvider>
        </ApolloProvider>
    );
}

export default MyApp;
