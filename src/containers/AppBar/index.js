import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import clsx from 'clsx';
import { withRouter } from "react-router-dom";

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

// utils
import { logout } from '../../store/actions/index';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: "#FFF"
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
}));
  
function CustomAppBar(props) {
    const classes = useStyles();

    // redux state and dispatches
    const showProblemDrawer = useSelector(state => state.misc.showProblemDrawer)
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false);
    };
    
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const handlePublicProfileClick = e => {
        handleRedirect(`/profile/${user.username}`);
        handleClose(e);
    }

    const handleHomeRoomClick = e => {
        handleRedirect("/homeroom");
        handleClose(e);
    }
    
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleRedirect = (location) => {
        props.history.push(location);
    }

    let avatar = <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>;
    if(user && user.firstName) {
        avatar = (<Avatar>{user.firstName.charAt(0).toUpperCase()}</Avatar>)
    }
    
    return(
        <div>
            <AppBar position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: showProblemDrawer,
                })}
            >
                <Toolbar>
                    <Chip
                        avatar={avatar}
                        color="primary"
                        label={<Typography variant="subtitle1" className={classes.title}>{"Carlo Bilbao"}</Typography>}
                        onClick={() => handleRedirect("/profile")}
                        variant="outlined"/>

                    <Typography variant="h6" className={classes.title}>
                        Akads
                    </Typography>
                    
                    <div>
                        <IconButton
                            ref={anchorRef}
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleToggle}>
                            <KeyboardArrowDown style={{ fontSize: 29 }}/>
                        </IconButton>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={handlePublicProfileClick}>Public Profile</MenuItem>
                                    <MenuItem disabled onClick={handleClose}>Donate</MenuItem>
                                    <MenuItem onClick={handleHomeRoomClick}>Home Room</MenuItem>
                                    <MenuItem disabled onClick={handleClose}>Social Room</MenuItem>
                                    <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
                                </MenuList>
                                </ClickAwayListener>
                            </Paper>
                            </Grow>
                        )}
                        </Popper>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withRouter(CustomAppBar);