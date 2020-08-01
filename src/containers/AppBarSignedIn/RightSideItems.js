
// libraries
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

// material ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

// custom components
import NotificationList from './NotificationList';
import QuickMenu from './QuickMenu';

// styles
const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));

export default function RightSideItems(){
    // hooks
    const history = useHistory();
    const classes = useStyles();

    // redux
    const user = useSelector(state => state.user);
    const showLeftDrawer = useSelector(state => state.leftDrawer.showLeftDrawer);

    let avatar = (
        <IconButton onClick={() => history.push('/profile')}>
            <Avatar alt={user.firstName} src={user.pic} className={classes.avatar}/>
        </IconButton>
    )
    if(!user.pic) avatar = (
        <IconButton onClick={() => history.push('/profile')}>
            <Avatar alt={user.firstName} className={classes.avatar}>{user.firstName.charAt(0).toUpperCase()}</Avatar>
        </IconButton>
    )

    return(
        <Grid container item justify="flex-end" xs={6}>
            {showLeftDrawer ? null : avatar}
            <NotificationList/>
            <QuickMenu/>
        </Grid>
    )
}