
// libraries
import React from 'react';
import { useHistory } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));

export default function FriendRequestListItem(props){
    const classes = useStyles();
    const history = useHistory()

    let name = props.user.firstName;
    if(props.user.lastName) name = name + " " + props.user.lastName;

    // local actions
    const handleRedirect = username => {
        history.push("/profile/" + username)
    }

    return(
        <ListItem button onClick={() => handleRedirect(props.user.username)}>
            <ListItemIcon>
                <Avatar alt={props.user.username.charAt(0).toUpperCase()} src={props.user.pic} className={classes.avatar}/>
            </ListItemIcon>
            <ListItemText primary={name} />
        </ListItem>
    )
}