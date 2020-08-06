
// libraries
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

// material ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

// actions
import { setLDOptions } from '../../store/actions';

// constants
import { subjects } from '../../utils/constants';

export const defaultOptions = ['Request', 'Friends'];

export default function SecondaryOptionsList(){
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    
    let optionComponents = [];
    if(location && location.pathname.split('/')[1] === "learn") {
        optionComponents = subjects.map((text, index) => {
            return (
                <ListItem button key={text} onClick={() => history.push(`/learn/${text}`)}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            )
        })
    } else {
        optionComponents = defaultOptions.map((text, index) => {
            return (
                <ListItem button key={text} onClick={() => dispatch(setLDOptions(text))}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            )
        })
    }
    
    return (
        <List>
            {optionComponents}
        </List>
    )
}