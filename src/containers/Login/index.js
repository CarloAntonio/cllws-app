import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";

// custom components
import AppBarSignedOut from '../AppBarSignedOut';

// utils
import { login } from '../../store/actions/index';

// assets
import image1 from '../../assets/images/slider-icon.png';
import bg from '../../assets/images/banner-bg.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "2rem 16rem 8rem",
        background: `url(${bg}) no-repeat center center fixed`,
        backgroundSize: "cover",
        height: "100vh"
    },
    img: {
        width: '100%',
        height: 'auto',
    }
}));
  
export default function Login(props) {

    const classes = useStyles();
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // state delaration
    const [showSnackbar, shouldShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword ] = useState("");
    // const [confirmPassword, setConfirmPassword ] = useState("");

    const handleLogin = async event => {
        event.preventDefault();
        const credentials = { email, password };
        
        const result = await dispatch(login(credentials));
        if(result && result.code !== 'ok'){
            setSnackbarMessage(result.message);
            shouldShowSnackbar(true);
        } else {
            props.history.push('/')
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarMessage("");
        shouldShowSnackbar(false);
    }

    if (!auth.isLoading && auth.token) return <Redirect to="/"/>

    return(
        <div className={classes.root}>
            <Grid container spacing={3} justify="space-between" alignItems="center">
                <AppBarSignedOut/>
                <Grid container item spacing={6} alignItems="center">
                    <Grid item xs={6}>
                        <div>
                            <img src={image1} className={classes.img} alt="First Vector Graphic"/>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            <div style={{ textAlign: "center" , padding: "5rem 0rem"}}>
                                <form noValidate autoComplete="off" style={{ paddingBottom: "6rem"}}>
                                    <Grid item xs={12}>
                                        <TextField 
                                            style={{ minWidth: "12rem", width: "75%", maxWidth: "24rem"}}
                                            onChange={event => setEmail(event.target.value)}
                                            value={email}
                                            type="email"
                                            id="email" 
                                            label="Email" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                            style={{ minWidth: "12rem", width: "75%", maxWidth: "24rem"}}
                                            onChange={event => setPassword(event.target.value)}
                                            value={password}
                                            type="password"
                                            id="password"
                                            label="Password" />
                                    </Grid>
                                </form>
                                <Button 
                                    onClick={handleLogin}
                                    variant="contained" 
                                    color="primary">
                                    Login
                                </Button>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                TransitionComponent={Fade}
                ContentProps={{ "aria-describedby": "message-id" }}
                style={{ color: "white" }}
                message={<span id="message-id">{snackbarMessage}</span>}/>
        </div>
    )
}