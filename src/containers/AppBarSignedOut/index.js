// libraries
import React from 'react';
import { withRouter } from 'react-router-dom';

// material-ui
import Grid from '@material-ui/core/Grid';

// custom components
import NavButton from '../../components/buttons/NavButton';
import HomeText from '../../components/text/HomeText.js';

function AppBarSignedOut(props) {

    const handleHomeRedirect = () => {
        props.history.push('/')
    }

    const handleLoginRedirect = () => {
        props.history.push('/login')
    }

    const handleSignUpRedirect = () => {
        props.history.push('/signup')
    }

    return (
        <Grid container item justify="space-between">
            <Grid item>
                <HomeText onClick={handleHomeRedirect} variant="h4">Akads</HomeText>
            </Grid>
            <Grid item>
                <NavButton onClick={null} disabled={true}>Donate</NavButton>
                <NavButton onClick={handleLoginRedirect}>Login</NavButton>
                <NavButton onClick={handleSignUpRedirect}>Sign Up</NavButton>
            </Grid>
        </Grid>
    );
}

export default withRouter(AppBarSignedOut);