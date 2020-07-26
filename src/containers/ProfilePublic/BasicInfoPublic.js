// libraries
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      width: "100%",
      marginBottom: "8px"
    },
    large: {
      width: theme.spacing(25),
      height: theme.spacing(25),
    },
    traitBox: {
        paddingBottom: "6px"
    }
}));

export default function BasicInfoPublic(props){
    const classes = useStyles();

    const userData = props.userData;

    // logic for displaying traits
    let basicInfoComponents = []

    if(userData){
        const oddNumberTraits = Object.keys(userData).length % 2 === 0;

        if(userData.firstName){
            basicInfoComponents.push(
                <Grid item xs={12} lg={6} className={classes.traitBox} key={userData.firstName}>
                    <Typography color='textPrimary' align="left">Name</Typography>
                    <Typography align="left">{userData.firstName}</Typography>
                </Grid>
            )
        }

        if(userData.hometown && userData.hometown.title){
            basicInfoComponents.push(
                <Grid item xs={12} lg={6} className={classes.traitBox} key={userData.hometown.title}>
                    <Typography color='textPrimary' align="left">{userData.hometown.title}</Typography>
                    <Typography align="left">{userData.hometown.value}</Typography>
                </Grid>
            )
        }

        if(userData.livesIn && userData.livesIn.title){
            basicInfoComponents.push(
                <Grid item xs={12} lg={6} className={classes.traitBox} key={userData.livesIn.title}>
                    <Typography color='textPrimary' align="left">{userData.livesIn.title}</Typography>
                    <Typography align="left">{userData.livesIn.value}</Typography>
                </Grid>
            )
        }

        if(userData.worksIn && userData.worksIn.title){
            basicInfoComponents.push(
                <Grid item xs={12} lg={6} className={classes.traitBox} key={userData.worksIn.title}>
                    <Typography color='textPrimary' align="left">{userData.worksIn.title}</Typography>
                    <Typography align="left">{userData.worksIn.value}</Typography>
                </Grid>
            )
        }

        if(userData.interest && userData.interest.title){
            basicInfoComponents.push(
                <Grid item xs={12} lg={6} className={classes.traitBox} key={userData.interest.title}>
                    <Typography color='textPrimary' align="left">{userData.interest.title}</Typography>
                    <Typography align="left">{userData.interest.value}</Typography>
                </Grid>
            )
        }

        if(userData.quote && userData.quote.title){
            basicInfoComponents.push(
                <Grid item xs={12} lg={6} className={classes.traitBox} key={userData.quote.title}>
                    <Typography color='textPrimary' align="left">{userData.quote.title}</Typography>
                    <Typography align="left">{userData.quote.value}</Typography>
                </Grid>
            )
        }

        // filler grid item to keep row even
        if(oddNumberTraits){
            basicInfoComponents.push(
                <Grid item xs={12} lg={6} className={classes.traitBox} key={1234}>
                </Grid>
            )
        }
    } else {
        basicInfoComponents.push(
            <Grid item xs={12} className={classes.traitBox} key={123456789}>
                <Typography color='textPrimary' align="left">You Have No Profile To Share, Click edit to add Your info</Typography>
            </Grid>
        )
    }

    return(
        <div>
            <Paper className={classes.paper}>
                <Grid container item xs={12} justify="center">
                    <Avatar alt="Carlo Bilbao" src={userData ? userData.pic : null } className={classes.large}/>
                </Grid>
                <br/>
                <Grid container item xs={12} justify="center">
                    {basicInfoComponents}
                </Grid>
            </Paper>
        </div>

    )
}