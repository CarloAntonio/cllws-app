
// libraries
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

// custom containers
import BasicInfoPublic from './BasicInfoPublic';
import PostsPublic from './PostsPublic';
import PersonalityPublic from './PersonalityPublic';
import FriendsListPublic from './FriendsListPublic';

// utils
import { 
    getUserPublic, 
    getPostsPublic,
    getFriendsPublic 
} from '../../store/actions';

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

function ProfilePublic(props){
    const classes = useStyles();

    // local state
    const [ userData, setUserData ] = useState({});
    const [ userPosts, setUserPosts ] = useState([]);
    const [ userFriends, setUserFriends ] = useState([]);

    // extract username from path
    const username = props.match.params.username;

    // redux state and dispatch
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // lifecycle
    React.useEffect(() => {
        window.scrollTo(0, 0)
        
        async function fetchUserPublicInfo(){
            if(auth.token && username) {
                const userData = await dispatch(getUserPublic(auth.token, username))
                setUserData(userData);
                const postsData = await dispatch(getPostsPublic(auth.token, username))
                setUserPosts(postsData);
                const friendsData = await dispatch(getFriendsPublic(auth.token, userData._id));
                setUserFriends(friendsData);
            }
        }
        fetchUserPublicInfo();
    }, [auth.token, username]);

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={5}>
                    <BasicInfoPublic userData={userData}/>
                    <PersonalityPublic/>
                    <FriendsListPublic friends={userFriends}/>
                </Grid>
                <Grid item xs={12} lg={7}>
                    <PostsPublic userPosts={userPosts} userData={userData}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(ProfilePublic);