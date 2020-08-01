
// libraries
import React from 'react';
import { useSelector } from 'react-redux';

// custom components
import FriendRequestListItem from '../../components/cards/FriendRequestListItem';

// material ui
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Done from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';

// utils
import { isEmptyArr } from '../../utils/helpers';

export default function FriendsRequestList(){
    // redux
    const pendingReq = useSelector(state => state.user.pendingRequest);
    const sentReq = useSelector(state => state.user.sentRequest);

    let sentRequestComponents = (
        <ListItem>
            <ListItemIcon>
                <Done/>
            </ListItemIcon>
            <ListItemText primary={"No Sent Request"} />
        </ListItem>
    )
    if(!isEmptyArr(sentReq)) {
        sentRequestComponents = <List> {sentReq.map(user => <FriendRequestListItem key={user._id} user={user}/>)} </List>
    }

    let pendingRequestComponents = (
        <ListItem>
            <ListItemIcon>
                <Done/>
            </ListItemIcon>
            <ListItemText primary={"No Pending Request"} />
        </ListItem>
    )
    if(!isEmptyArr(pendingReq)) {
        pendingRequestComponents = <List> {pendingReq.map(user => <FriendRequestListItem key={user._id} user={user}/>)} </List>
    }

    return(
        <React.Fragment>
            <ListItem>
                <Typography>Sent</Typography>
            </ListItem>
            {sentRequestComponents}
            <Divider />
            <ListItem>
                <Typography>Requested</Typography>
            </ListItem>
            {pendingRequestComponents}
        </React.Fragment>
    )
}