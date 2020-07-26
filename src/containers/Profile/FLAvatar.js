
// libraries
import React from 'react';
import { withRouter } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// assets
import image1 from '../../assets/images/profile.jpg';

const useStyles = makeStyles((theme) => ({
    small: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
}));

function FLAvatar(props){
    const classes = useStyles();

    const handleClick = () => {
        props.history.push(`${props.location.pathname}/ant`)
    }

    return (
        <Grid container item xs={3} justify="center">
            <Avatar alt="Carlo Bilbao" src={image1} className={classes.small} onClick={handleClick}/>
            <Typography align="center">Anaaa</Typography>
        </Grid>
    )
}

export default withRouter(FLAvatar)