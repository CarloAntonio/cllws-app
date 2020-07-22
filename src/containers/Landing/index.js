// libraries
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

// custom components
import AppBarSignedOut from '../AppBarSignedOut';
import WhiteText from '../../components/text/WhiteText';
import SeconaryText from '../../components/text/SecondaryText';

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
    },
}));

export default function Landing() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3} justify="space-between" alignItems="center">
                <AppBarSignedOut/>
                <Grid container item spacing={6} alignItems="center">
                    <Grid item xs={6}>
                        <div>
                            <WhiteText variant="h4">Akads is a learning platform made <strong>just for YOU</strong></WhiteText>
                            <br/>
                            <SeconaryText variant="subtitle1">We'll have the application up and running, but until then, feel free to join our mailing list to get updates!</SeconaryText>
                            <br/>
                            <Button variant="contained" color="secondary" href="#about">
                                Find Out More
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <img src={image1} className={classes.img} alt="First Vector Graphic"/>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}