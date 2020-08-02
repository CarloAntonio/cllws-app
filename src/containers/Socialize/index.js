// libraries
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// custom components
import SocialPostCard from './SocialPostCard';

// helpers
import { isEmptyArr } from '../../utils/helpers';
import { getFeed } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      margin: "24px auto",
      fontSize: "calc(10px + 2vmin)",
      maxWidth: "1020px"
    },
}));

export default function Posts(props){
    const classes = useStyles();

    const [posts, setPosts] = React.useState([]);

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    // lifecycle
    React.useEffect(() => {
        window.scrollTo(0, 0)
        
        async function fetchFeed(){
            if(auth.token && !isEmptyArr(user.friends)) {
                const result = await dispatch(getFeed(auth.token, user.friends));
                setPosts(result)
            }
        }
        fetchFeed();
    }, [auth.token, dispatch, user.friends]);

    // logic for generating post components
    let postsComponents = [];

    if(!isEmptyArr(posts)){
        // sort post by date
        posts.sort((a, b) => a.date - b.date)

        posts.forEach(post => {
            postsComponents.push(<SocialPostCard post={post} user={user} key={post.date}/>)
        })
    }

    return (
        <div className={classes.root}>
            <Grid container justify="center" spacing={2}>
                <Grid item xs={7}>
                    {postsComponents}
                </Grid>
            </Grid>
        </div>
    )
}