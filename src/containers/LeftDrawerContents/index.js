// libraries
import React from 'react';
import { useSelector, useDispatch } from "react-redux";

// custom components
import DrawerHat from './DrawerHat';
import PrimaryOptionsList from './PrimaryOptionsList';
import SecondaryOptionsList from './SecondaryOptionsList';
import FriendsRequestList from './FriendsRequestList';
import FriendsList from './FriendsList';

// material-ui
import Divider from '@material-ui/core/Divider';

// constant
import { displayOptions } from './SecondaryOptionsList'

// actions
import { getFriends } from '../../store/actions';

export default function LeftDrawerContents(){
    // redux
    const options = useSelector(state => state.leftDrawer.options);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getFriends(auth.token))
    }, [auth]);

    let optionsComponents = (
        <React.Fragment>
            <PrimaryOptionsList/>
            <Divider />
            <SecondaryOptionsList/>
        </React.Fragment>
    )

    if(displayOptions[0] === options)  optionsComponents = <FriendsRequestList/>
    if(displayOptions[1] === options)  optionsComponents = <FriendsList/>

    return (
        <React.Fragment>
            <DrawerHat/>
            <Divider/>
            {optionsComponents}
        </React.Fragment>
    )
}