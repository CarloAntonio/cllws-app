
// libraries
import React from  'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// custom components
import FLAvatar from '../../components/cards/FLAvatar';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      width: "100%",
      marginBottom: "8px"
    },
}));

export default function FriendsList(props){
    const classes = useStyles();
    const friends = props.friends;

    if(!friends) return null;
    
    const friendsComponent = friends.map(friend => {
        return <FLAvatar friend={friend} key={friend._id}/>
    })

    return (
        <Paper className={classes.paper}>
            <Grid container item xs={12} justify="center">
            <Grid container item xs={12} justify="center">
                <Typography align="center">Friends</Typography>
            </Grid>
                {friendsComponent}
            </Grid>
        </Paper>
    )
}