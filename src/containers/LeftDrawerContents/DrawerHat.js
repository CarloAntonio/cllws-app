
// libraries
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// material ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// actions
import { closeLeftDrawer, setLDOptions } from '../../store/actions';

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

export default function DrawerHat() {

    // hooks
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();

    // redux
    const user = useSelector(state => state.user);
    const options = useSelector(state => state.leftDrawer.options);

    // handle drawer back button
    const handleDrawerBackButton = () => {
        if(options !== 'root') dispatch(setLDOptions('root'));
        else dispatch(closeLeftDrawer())
    }

    return (
        <div className={classes.drawerHeaderLeft}>
            <IconButton onClick={() => history.push('/profile')}>
                <Avatar alt={user.username.charAt(0).toUpperCase()} src={user.pic} className={classes.avatar}/>
            </IconButton>
            <IconButton onClick={handleDrawerBackButton}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </div>
    )
}