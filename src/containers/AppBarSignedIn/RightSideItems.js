
// libraries
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

// material ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Avatar from '@material-ui/core/Avatar';

// styles
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

export default function RightSideItems(){
    // local state
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    // hooks
    const history = useHistory();
    const classes = useStyles();

    // redux
    const user = useSelector(state => state.user);
    const showLeftDrawer = useSelector(state => state.leftDrawer.showLeftDrawer);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return;
        setOpen(false);
    };

    const handleListKeyDown = event => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

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
            <IconButton
                ref={anchorRef}
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleToggle}>
                <NotificationsIcon/>
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <MenuItem onClick={handleClose}>Donate</MenuItem>
                                <MenuItem disabled onClick={handleClose}>Social Room</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
            </Popper>
        </Grid>
    )
}