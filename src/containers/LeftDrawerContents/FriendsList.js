// libraries
import React from 'react';
import { useSelector } from 'react-redux';

// custom components
import FriendRequestListItem from '../../components/cards/FriendRequestListItem';

// material ui
import List from '@material-ui/core/List';

export default function FriendsRequestList(){
    // redux
    const friends = useSelector(state => state.friends);

    return <List> {friends.map(user => <FriendRequestListItem key={user._id} user={user}/>)} </List>;
}