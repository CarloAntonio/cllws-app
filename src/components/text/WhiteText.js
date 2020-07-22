// libraries
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.common.white,
    },
}));

export default function HomeText(props){
    const classes = useStyles();
    return (
        <Typography {...props} className={classes.root}>{props.children}</Typography>
    )
}