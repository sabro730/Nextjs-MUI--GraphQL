import {useMutation} from "@apollo/client";
import gql from "graphql-tag";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useEffect, useState} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Alert} from "@mui/material";
import {LOGIN_MUTATION, REGISTER_NEW_USER} from "../graphql/mutations/auth";

const theme = createTheme();

const AuthPage = () => {
    const [registernow, setRegisternow] = useState(false);
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [error, setError] = useState("");


    const [tokenAuth] = useMutation(LOGIN_MUTATION, {
        onCompleted(data) {
            if (data?.tokenAuth?.token) {
                window.localStorage.setItem("token", data?.tokenAuth?.token);
                window.location.href = "/home";
            } else {
                setError("Something went wrong try again ☹️");
            }
        },
    });

    const [
        createUser,
        {loading: registerloding, error: registerError},
    ] = useMutation(REGISTER_NEW_USER, {
        onCompleted(data) {
            if (data?.createUser?.user?.username) {
                alert(
                    `User Was Created For User Name "${data?.createUser?.user?.username}"`
                );
                setRegisternow(false);
            } else {
                setError("Something went wrong try again ☹️");
            }
        },
    });

    const loginNow = () => {
        tokenAuth({
            variables: {username: username, password: password1}
        }).then(() => console.log("Login Success")).catch(() => setError("Invalid Credentials"));
    };

    const RegisterNewUser = () => {
        if (password1 === password2) {
            createUser({
                variables: {
                    username: username, password: password1, firstName: firstName,
                    lastName: lastName
                }
            }).then(() => console.log("Registered New User")).catch(() => setError("Something went wrong try again ☹️"));
        } else {
            setError("Two Password Not Matched Try Again!");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Typography variant="h4" align="center">
                    Welcome To Twitter
                </Typography>
                <CssBaseline/>

                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'deepskyblue'}}>
                        <AccountCircleIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {registernow ? "Sign up" : "Sign in"}
                    </Typography>
                    {
                        registernow ? (
                            <Box sx={{mt: 3}}>
                                {error &&
                                <div className="p-5">
                                    <Alert severity="error">{error}</Alert>
                                </div>
                                }
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="family-name"
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                            autoComplete="username"
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            onChange={(e) => setPassword1(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="retype=password"
                                            label="Re-enter Password"
                                            type="password"
                                            id="retype-password"
                                            autoComplete="retype-password"
                                            onChange={(e) => setPassword2(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    sx={{mt: 3, mb: 2}}
                                    onClick={RegisterNewUser}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link variant="body2" onClick={() => setRegisternow(false)}
                                              sx={{cursor: "pointer"}}>
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        ) : (
                            <Box sx={{mt: 1}}>
                                {error &&
                                <div className="p-2">
                                    <Alert severity="error">{error}</Alert>
                                </div>
                                }
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword1(e.target.value)}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary"/>}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    sx={{mt: 3, mb: 2}}
                                    onClick={loginNow}
                                    disabled={!username || !password1}
                                >
                                    Sign In
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Link variant="body2" onClick={() => setRegisternow(true)} sx={{cursor: "pointer"}}
                                    >
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Box>
                        )
                    }
                </Box>
            </Container>
        </ThemeProvider>
    );
};


export default AuthPage;
