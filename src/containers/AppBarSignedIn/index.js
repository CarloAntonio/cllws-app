// libraries
import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import clsx from 'clsx';
import { withRouter } from "react-router-dom";

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import MenuIcon from '@material-ui/icons/Menu';

// utils
import { clearReduxAndLogout, openLeftDrawer } from '../../store/actions/index';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    large: {
        width: theme.spacing(14),
        height: theme.spacing(14),
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
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));
  
function CustomAppBar(props) {
    const classes = useStyles();

    // redux state and dispatches
    const showLeftDrawer = useSelector(state => state.leftDrawer.showLeftDrawer)
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

    let actionButton = (
        <React.Fragment>
                    <IconButton aria-label="add an alarm" onClick={() => dispatch(openLeftDrawer())}>
            <MenuIcon/>
        </IconButton>
            <Typography aria-label="add an alarm" onClick={null}>
                Cllws
            </Typography>
        </React.Fragment>

    )
    if(showLeftDrawer){
        actionButton = (
            <Typography aria-label="add an alarm" onClick={null}>
                Cllws
            </Typography>
        )
    }

    // logic for displaying name
    let name = user ? user.email : "";
    if(user && user.firstName) name = user.firstName;
    if(user && user.firstName && user.lastName) name = name + " " + user.lastName;

    return(
        <div className={classes.root}>
            <AppBar position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: showLeftDrawer,
                })}
            >
                <Toolbar>
                <Grid container justify="space-between" alignItems="center" spacing={2}>
                    <Grid container item justify="flex-start" alignItems="center" xs={6}>
                        {actionButton}
                    </Grid>
                    
                    <Grid container item justify="flex-end" xs={6}>
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
                                    <MenuItem onClick={() => dispatch(clearReduxAndLogout())}>Logout</MenuItem>
                                </MenuList>
                                </ClickAwayListener>
                            </Paper>
                            </Grow>
                        )}
                        </Popper>
                    </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withRouter(CustomAppBar);