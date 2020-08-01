// libraries
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

// material ui
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import LogoutIcon from '@material-ui/icons/DirectionsWalk';
import PaymentIcon from '@material-ui/icons/Payment';

// actions
import { clearReduxAndLogout } from '../../store/actions/index';

export default function QuickMenu(){
    // hooks
    const dispatch = useDispatch()
    const history = useHistory();

    // local state
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

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

        
    return (
        <React.Fragment>
            <IconButton
                ref={anchorRef}
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleToggle}>
                <ExpandMoreIcon/>
            </IconButton>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={() => history.push("/profile")}>
                                        <ListItemIcon>
                                            <PersonIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <PaymentIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Donate" />
                                    </MenuItem>
                                    <MenuItem onClick={() => dispatch(clearReduxAndLogout())}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                        </Grow>
                    )}
                </Popper>
        </React.Fragment>
    )
}