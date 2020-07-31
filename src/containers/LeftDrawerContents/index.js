import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';

// actions
import { closeLeftDrawer, setLDOptions } from '../../store/actions';

const displayOptions = ['Friends Request'];

const useStyles = makeStyles((theme) => ({
    drawerHeaderLeft: {
      backgroundColor: theme.palette.secondary.main,
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'space-between',
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
  }));

function LeftDrawerContents(props){
    const theme = useTheme();
    const classes = useStyles();

    // redux
    const options = useSelector(state => state.leftDrawer.options);
    const pendingReq = useSelector(state => state.user.pendingRequest);
    const sentReq = useSelector(state => state.user.sentRequest);
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    // local actions
    const handleRedirect = username => {
        props.history.push(props.location.pathname + "/" + username);
    }

    let optionsComponents = (
        <React.Fragment>
            <List>
              {['Public Profile', 'Donate', 'Home Room', 'Social Room', 'Logout'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {displayOptions.map((text, index) => (
                <ListItem button key={text} onClick={() => dispatch(setLDOptions(text))}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
        </React.Fragment>
    )

    if(displayOptions[0] === options){
        optionsComponents = (
            <React.Fragment>
                <ListItem key={1234}>Pending Request
                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                    {/* <ListItemText primary={"Pending Request"} /> */}
                </ListItem>
                <List>
                {pendingReq.map((user, index) => (
                    <ListItem button key={user._id} onClick={() => handleRedirect(user.username)}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={user.username} />
                    </ListItem>
                ))}
                </List>
                <Divider />
                <ListItem key={2345}>Sent Request
                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                    {/* <ListItemText primary={"Sent Request"} /> */}
                </ListItem>
                <List>
                {sentReq.map((user, index) => (
                    <ListItem button key={user._id} onClick={() => handleRedirect(user.username)}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={user.username} />
                    </ListItem>
                ))}
                </List>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <div className={classes.drawerHeaderLeft}>
                <IconButton onClick={() => props.history.push('/profile')}>
                    <Avatar alt={user.username.charAt(0).toUpperCase()} src={user.pic} className={classes.avatar}/>
                </IconButton>
                <IconButton onClick={() => dispatch(closeLeftDrawer())}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            {optionsComponents}
        </React.Fragment>
    )
}

export default withRouter(LeftDrawerContents);