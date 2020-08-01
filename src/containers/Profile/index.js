// libraries
import React from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// custom containers
import BasicInfo from './BasicInfo';
import FriendsList from './FriendsList';
import NewPost from './NewPost';
import Posts from './Posts';
import Personality from './Personality';

const drawerWidth = 240;
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

export default function Profile(){
  const classes = useStyles();
  const dispatch = useDispatch();

  // lifecycle
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [dispatch]);

  return (
    <div className={classes.root}>
    <Grid container spacing={2}>
      {/* Left Hand Side */}
      <Grid item xs={12} lg={5}>
        <BasicInfo/>
        {/* <Personality/> */}
        <FriendsList/>
      </Grid>
      {/* Right Hand Side */}
      <Grid item xs={12} lg={7}>
        <NewPost/>
        <Posts/>
      </Grid>
    </Grid>
  </div>
  )
}