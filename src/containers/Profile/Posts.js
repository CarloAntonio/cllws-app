
// libraries
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// custom components
import PostCard from '../../components/cards/PostCard';

// helpers
import { isEmptyArr } from '../../utils/helpers';
import { getPosts } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      width: "100%",
      marginBottom: "8px"
    },
}));

export default function Posts(props){
    const classes = useStyles();

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const posts = useSelector(state => state.posts);
    const dispatch = useDispatch();

      // lifecycles
    React.useEffect(() => {
        // if auth.token is available, then user just logged in
        if(isEmptyArr(posts) && auth.token) dispatch(getPosts(auth.token));
    }, [auth.token]);

    // logic for generating post components
    let postsComponents = [];

    if(posts){
        // sort post by date
        posts.sort((a, b) => a.date - b.date)

        posts.forEach(post => {
            postsComponents.push(<PostCard post={post} user={user} key={post.date}/>)
        })
    }

    return (
        <Paper className={classes.paper}> 
            <Grid item xs={12}>
            <Typography>Posts</Typography>
                {postsComponents}
            </Grid>
        </Paper>
    )
}