import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// material ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

// actions
import { clearReduxAndLogout } from '../../store/actions/index';

export default function PrimaryOptions(){

    // hooks
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const primaryOptions = [
        { text: 'Public Profile', action: () => history.push(`/profile/${user.username}`) },
        { text: 'Donate', action: null },
        { text: 'Learn', action: () => history.push("/learn") },
        { text: 'Socialize', action: () => history.push("/socialize") },
        { text: 'Logout', action: () => dispatch(clearReduxAndLogout())},
    ]

    return (
        <List>
            {primaryOptions.map((option, index) => (
            <ListItem button key={option.text} onClick={option.action}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={option.text} />
            </ListItem>
            ))}
        </List>
    )
}