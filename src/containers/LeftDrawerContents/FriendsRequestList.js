
// libraries
import React from 'react';
import { useSelector } from 'react-redux';

// custom components
import FriendRequestListItem from '../../components/cards/FriendRequestListItem';

// material ui
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

export default function FriendsRequestList(){
    // redux
    const pendingReq = useSelector(state => state.user.pendingRequest);
    const sentReq = useSelector(state => state.user.sentRequest);

    return(
        <React.Fragment>
            <ListItem key={1234}>Pending Request</ListItem>
            <List> {pendingReq.map(user => <FriendRequestListItem key={user._id} user={user}/>)} </List>
            <Divider />
            <ListItem key={2345}>Sent Request</ListItem>
            <List> {sentReq.map(user => <FriendRequestListItem key={user._id} user={user}/>)} </List>
        </React.Fragment>
    )
}