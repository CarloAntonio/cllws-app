
import * as actionTypes from "../actionTypes";

import { handleResponseErrors, handleJsonErrors } from './utils';

export const getUser = token => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:8080/user/getUser', {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            })

            const jsonData = await handleResponseErrors(response);
            if(jsonData instanceof Error) throw jsonData;

            const result = await handleJsonErrors(jsonData);
            if(result instanceof Error) throw result;
            else dispatch(updateUserRedux(result))

        } catch(err){
            return err;
        }
    }
}

export const getUserPublic = (token, username) => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:8080/user/getUser/' + username, {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            })

            const jsonData = await handleResponseErrors(response);
            if(jsonData instanceof Error) throw jsonData;

            const result = await handleJsonErrors(jsonData);
            if(result instanceof Error) throw result;
            else return result;

        } catch(err){
            return err;
        }
    }
}

export const updateUser = (token, data) => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:8080/user/updateUser', {
                method: 'PATCH',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data
                })
            });
    
            const jsonData = await handleResponseErrors(response);
            if(jsonData instanceof Error) throw jsonData;

            const result = await handleJsonErrors(jsonData);
            if(result instanceof Error) throw result;
            else dispatch(updateUserRedux(result))

        } catch(err){
            return err;
        };
    }
}

export const updateUserPic = (token, formData) => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:8080/user/updateUserPic', {
                method: "PATCH",
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                body: formData
            });

            const jsonData = await handleResponseErrors(response);
            if(jsonData instanceof Error) throw jsonData;

            const result = await handleJsonErrors(jsonData);
            if(result instanceof Error) throw result;
            else {
                dispatch(updateUserRedux(result))
                return result;
            }

        } catch(err){
            return err;
        }
    }
}

export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER
    }
}

const updateUserRedux = data => {
    return {
        type: actionTypes.UPDATE_USER,
        payload: data
    }
}

