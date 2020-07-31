import * as actionTypes from "../actionTypes";

import { handleResponseErrors, handleJsonErrors } from './utils';

export const getFriends = token => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:8080/friend/getFriends', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            const jsonData = await handleResponseErrors(response);
            if(jsonData instanceof Error) throw jsonData;

            const result = await handleJsonErrors(jsonData);
            if(result instanceof Error) throw result;
            else dispatch(setFriends(result));

        } catch(err){
            return err;
        }
    }
}

export const sendFriendRequest = (token , username) => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:8080/friend/addRequest', {
                method: 'PATCH',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            })
            
            const jsonData = await handleResponseErrors(response);
            if(jsonData instanceof Error) throw jsonData;

            const result = await handleJsonErrors(jsonData);
            if(result instanceof Error) throw result;
            else console.log(result);

        } catch(err){
            return err;
        }
    }
}

// Local Functions
export const setFriends = friends => {
    return {
        type: actionTypes.SET_FRIENDS,
        payload: friends
    }
}

export const clearFriends = () => {
    return {
        type: actionTypes.CLEAR_FRIENDS
    }
}

