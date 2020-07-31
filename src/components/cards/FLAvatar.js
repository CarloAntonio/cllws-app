
// libraries
import React from 'react';
import { withRouter } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
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
        props.history.push(`${props.location.pathname}/${props.friend.username}`)
    }

    // logic for displaying name
    let name = props.friend ? props.friend.email : "";
    if(props.friend && props.friend.firstName) name = props.friend.firstName;
    if(props.friend && props.friend.firstName && props.friend.lastName) name = name + " " + props.friend.lastName;

    return (
        <Grid container item xs={3} justify="center" onClick={handleClick}>
            <IconButton>
                <Avatar alt={name} src={props.friend.pic} className={classes.small} />
            </IconButton>
            <Typography align="center">{name}</Typography>
        </Grid>
    )
}

export default withRouter(FLAvatar)