import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// custom containers
import BasicInfo from './BasicInfo';
import NewPost from './NewPost';
import Posts from './Posts';
// import FLAvatar from './FLAvatar';

// utils
// import { envEndpoint } from '../../utils/firebase-service';
// import { setUserPosts } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: "84px auto",
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

export default function Profile(){
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={5}>

            {/* Basic Info */}
            <BasicInfo/>

            {/* Personality Section */}
            <Paper className={classes.paper}>
              <Grid container item xs={12} justify="center">
                <Typography align="center">Personality</Typography>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography gutterBottom align="left" variant="subtitle2">
                      Two Truths and a Lie
                    </Typography>
                    <Typography variant="body2" align="left" color="textSecondary">
                      I like to play basketball, I am a founder of a company, I dance competatively
                    </Typography>
                  </CardContent>
                </Card>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography gutterBottom align="left" variant="subtitle2">
                      Never Have I Ever
                    </Typography>
                    <Typography variant="body2" align="left" color="textSecondary">
                      Gotten a tattoo, but currently considering one. Most likey a sleeve.
                    </Typography>
                  </CardContent>
                </Card>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography gutterBottom align="left" variant="subtitle2">
                      My Simple Pleasures
                    </Typography>
                    <Typography variant="body2" align="left" color="textSecondary">
                      Doing a load of sheets and blankets, putting it in the dryer, doing 1 hr intense workout shower, eat, sleep on recently dried sheets.
                    </Typography>
                  </CardContent>
                </Card>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography gutterBottom align="left" variant="subtitle2">
                      Best Travel Story
                    </Typography>
                    <Typography variant="body2" align="left" color="textSecondary">
                      Backpacking for 2 days in Yosemite with 3 other friends. Everything that could have gone wrong did, but it was still be best adventure I've ever had.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Paper>

            {/* Friends List */}
            {/* <Paper className={classes.paper}>
              <Grid container item xs={12} justify="center">
                <Grid container item xs={12} justify="center">
                  <Typography align="center">Friends</Typography>
                </Grid>
                <FLAvatar/>
                <FLAvatar/>
              </Grid>
            </Paper> */}

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