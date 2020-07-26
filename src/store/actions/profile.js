import * as actionTypes from "../actionTypes";

import { handleResponseErrors, handleJsonErrors } from './utils';

export const getBasicInfo = token => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:8080/profile/getBasicInfo', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            const jsonData = await handleResponseErrors(response);
            if(jsonData instanceof Error) throw jsonData;

            const result = await handleJsonErrors(jsonData);
            if(result instanceof Error) throw result;
            else dispatch(setProfile(result))

        } catch(err){
            return err;
        }
    }
}

export const updateProfile = (token, data) => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:8080/profile/updateBasicInfo', {
                method: "POST",
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({data})
            })

            const jsonData = await handleResponseErrors(response);
            if(jsonData instanceof Error) throw jsonData;

            const result = await handleJsonErrors(jsonData);
            if(result instanceof Error) throw result;
            else dispatch(setProfile(result))

        } catch(err){
            return err;
        }
    }
}

// Local Functions
export const setProfile = profile => {
    return {
        type: actionTypes.SET_PROFILE,
        payload: profile
    }
}