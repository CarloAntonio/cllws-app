// libraries
import React from 'react';
import { useSelector } from 'react-redux';

// custom components
import DrawerHat from './DrawerHat';
import PrimaryOptionsList from './PrimaryOptionsList';
import SecondaryOptionsList from './SecondaryOptionsList';
import FriendsRequestList from './FriendsRequestList';

// material-ui
import Divider from '@material-ui/core/Divider';

// constant
import { displayOptions } from './SecondaryOptionsList'

export default function LeftDrawerContents(){
    // redux
    const options = useSelector(state => state.leftDrawer.options);

    let optionsComponents = (
        <React.Fragment>
            <PrimaryOptionsList/>
            <Divider />
            <SecondaryOptionsList/>
        </React.Fragment>
    )

    if(displayOptions[0] === options)  optionsComponents = <FriendsRequestList/>

    return (
        <React.Fragment>
            <DrawerHat/>
            <Divider/>
            {optionsComponents}
        </React.Fragment>
    )
}