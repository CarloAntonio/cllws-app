import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.common.white
    },
}));

export default function NavLink(props){
    const classes = useStyles();
    return (
        <Button {...props} className={classes.root}>{props.children}</Button>
    )
}