
// libraries
import React from 'react';
import { useSelector, useDispatch } from "react-redux";

// material ui
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

// actions
import { openLeftDrawer } from '../../store/actions/index';

export default function LeftSideItems(){
    // hooks
    const dispatch = useDispatch();

    // redux state and dispatches
    const showLeftDrawer = useSelector(state => state.leftDrawer.showLeftDrawer)

    let actionButton = (
        <React.Fragment>
            <IconButton aria-label="open left drawer" onClick={() => dispatch(openLeftDrawer())}>
                <MenuIcon/>
            </IconButton>
            <Typography>Cllws</Typography>
        </React.Fragment>
    )

    if(showLeftDrawer)
        actionButton = <Typography>Cllws</Typography>

    return(
        <Grid container item justify="flex-start" alignItems="center" xs={6}>
            {actionButton}
        </Grid>
    )
}