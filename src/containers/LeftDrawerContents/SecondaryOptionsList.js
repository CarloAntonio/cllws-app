
// libraries
import React from 'react';
import { useDispatch } from 'react-redux';

// material ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

// actions
import { setLDOptions } from '../../store/actions';

export const displayOptions = ['Friends Request'];

export default function SecondaryOptionsList(){
    const dispatch = useDispatch();

    return (
        <List>
            {displayOptions.map((text, index) => (
            <ListItem button key={text} onClick={() => dispatch(setLDOptions(text))}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
    )
}