import React from  'react';
import { useSelector, useDispatch } from "react-redux";

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// custom components
import FLAvatar from '../../components/cards/FLAvatar';

// actions
// import { getFriends } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      width: "100%",
      marginBottom: "8px"
    },
}));

export default function FriendsList(){
    const classes = useStyles();

    // const auth = useSelector(state => state.auth);
    const friends = useSelector(state => state.friends);
    // const dispatch = useDispatch();

    // React.useEffect(() => {
    //     dispatch(getFriends(auth.token))
    // }, [auth]);

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