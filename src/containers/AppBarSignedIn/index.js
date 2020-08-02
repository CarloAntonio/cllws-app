// libraries
import React from 'react'
import { useSelector } from "react-redux";
import clsx from 'clsx';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// custom components
import LeftSideItems from './LeftSideItems';
import RightSideItems from './RightSideItems';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
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
  
export default function AppBarrSignedIn() {
    const classes = useStyles();

    // redux state and dispatches
    const showLeftDrawer = useSelector(state => state.leftDrawer.showLeftDrawer)

    return(
        <div>
            <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: showLeftDrawer, })} >
                <Toolbar>
                    <Grid container justify="space-between" alignItems="center" spacing={2}>
                        <LeftSideItems/>
                        <RightSideItems/>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}