import {ApolloProvider} from "@apollo/client";
import {useApollo} from "../lib/apolloClient";
import 'tailwindcss/tailwind.css'
import AuthPage from "../components/AuthPage";
import {useEffect, useState} from "react";
import {StyledEngineProvider} from '@mui/material/styles';


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
                    {!localStorage ? <AuthPage/> : <Component {...pageProps} />}
                </div>
            </StyledEngineProvider>
        </ApolloProvider>
    );
}

export default MyApp;
