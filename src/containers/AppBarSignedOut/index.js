// libraries
import React from 'react';
import { useHistory } from 'react-router-dom';

// material-ui
import Grid from '@material-ui/core/Grid';

// custom components
import NavButton from '../../components/buttons/NavButton';
import HomeText from '../../components/text/HomeText.js';

export default  function AppBarSignedOut() {
    const history = useHistory();

    const handleHomeRedirect = () => {
        history.push('/')
    }

    const handleLoginRedirect = () => {
        history.push('/login')
    }

    const handleSignUpRedirect = () => {
        history.push('/signup')
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