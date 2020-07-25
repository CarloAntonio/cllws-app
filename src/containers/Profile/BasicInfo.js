// libraries
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

// custom components
import EditProfileDialog from '../../components/popups/EditProfileDialog';
import PicUploadDialog from '../../components/popups/PicUploadDialog';

// actions
import { getBasicInfo } from '../../store/actions/profile'

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

function BasicInfo(props){
    const classes = useStyles();

    let publicProfileMode = false;
    if(props.match.params.id) publicProfileMode = true;

      // redux state and dispatch
    const auth = useSelector(state => state.auth);
    const basicInfo = useSelector(state => state.profile.basicInfo);
    const dispatch = useDispatch();


    // lifecycle
    React.useEffect(() => {
        async function fetchBasicInfo(){
            if(auth.token && !basicInfo) await dispatch(getBasicInfo(auth.token))
        }
        fetchBasicInfo();
    }, [auth.token]);


    // local state
    const [openEditProfileDialog, setOpenEditProfileDialog] = React.useState(false);
    const [openPicUploaderDialog, setOpenPicUploaderDialog] = React.useState(false);

    // logic for handling edit profile modal
    const handleOpenEditProfileDialog = () => {
        setOpenEditProfileDialog(true);
    };
    const handleCloseEditProfileDialog = () => {
        setOpenEditProfileDialog(false);
    };

    const handleOpenPicUploaderDialog = () => {
        setOpenPicUploaderDialog(true);
    };

    const handleClosePicUploaderDialog = () => {
        setOpenPicUploaderDialog(false);
    };

    // redux state & dispatch
    let userData = null;
    // useSelector(state => state.user.summary);
    if(publicProfileMode) userData = null;
    else userData = {...auth.firstName, ...auth.lastName, ...basicInfo}

    // logic for displaying traits
    let basicInfoComponents = []

    console.log(userData);

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

    let profilePic = (
        <Badge
            overlap="circle"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            badgeContent={
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCameraIcon fontSize="large"/>
                </IconButton>
            }
            onClick={handleOpenPicUploaderDialog}
        >
            <Avatar alt="Carlo Bilbao" src={userData ? userData.pic : null } className={classes.large}/>
        </Badge>
    );
    if(publicProfileMode) profilePic = <Avatar alt="Carlo Bilbao" src={userData ? userData.pic : null } className={classes.large}/>;

    let editProfileButton = (
        <Grid container item xs={12} justify="flex-end">
            <Button onClick={handleOpenEditProfileDialog} color="primary">Edit</Button>
        </Grid>
    )
    if(publicProfileMode) editProfileButton = null;

    return(
        <div>
            <Paper className={classes.paper}>
                <Grid container item xs={12} justify="center">
                    {profilePic}
                </Grid>
                <br/>
                <Grid container item xs={12} justify="center">
                    {basicInfoComponents}
                </Grid>
                {editProfileButton}
            </Paper>
            {/* <EditProfileDialog 
                handleCloseEditProfileDialog={handleCloseEditProfileDialog} 
                openEditProfileDialog={openEditProfileDialog}/> */}
            <PicUploadDialog 
                handleClosePicUploaderDialog={handleClosePicUploaderDialog} 
                openPicUploaderDialog={openPicUploaderDialog}/>
        </div>

    )
}

export default withRouter(BasicInfo);