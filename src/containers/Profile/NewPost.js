
// libraries
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// utils
import { addPost } from '../../store/actions'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      margin: "84px",
      fontSize: "calc(10px + 2vmin)",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      width: "100%",
      marginBottom: "8px"
    },
    card: {
      marginTop: "8px",
      width: "100%",
    },
}));

export default function NewPost() {
    const classes = useStyles();

    // local state
    const [ textPost, setTextPost ] = React.useState("");

    // redux state and dispatch
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handlePostSubmit = async () => {
        await dispatch(addPost(auth.token, textPost));
        setTextPost("");
    }

    return(
        <Paper className={classes.paper}> 
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={12}>
                <TextField
                    id="filled-multiline-static"
                    label="What's on your mind?"
                    value={textPost}
                    onChange={e => setTextPost(e.target.value)}
                    multiline
                    fullWidth
                />
                </Grid>
                <Grid item xs={12} align="right">
                <Button variant="contained" color="secondary" disabled={textPost === "" ? true : false } onClick={handlePostSubmit}>
                    Post
                </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}