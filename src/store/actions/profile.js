import * as actionTypes from "../actionTypes";

export const getBasicInfo = token => {
    return dispatch => {
        // fetch auth data
        fetch('http://localhost:8080/profile/getBasicInfo', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            if (res.status === 404){
                // You did something wrong and here is what you did wrong
                return res.json();
            }
            if (res.status !== 200) {
                throw new Error('Failed to fetch status');
            }
            return res.json();
        })
        .then(resData => {
            if(resData && resData.message){
                dispatch(setProfile(null))
            } else {
                dispatch(setProfile(resData))
            }
        })
        .catch(err => {
            return err
        });
    }
}

export const updateProfile = (token, data) => {
    return dispatch => {
        return fetch('http://localhost:8080/profile/updateBasicInfo', {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data})
        })
        .then(res => {
            if (res.status === 404){
                // You did something wrong and here is what you did wrong
                return res.json();
            }
            if (res.status !== 200) {
                throw new Error('Failed to fetch status');
            }
            return res.json();
        })
        .then(resData => {
            if(resData && resData.message){
                dispatch(setProfile(null))
            } else {
                dispatch(setProfile(resData))
            }
        })
        .catch(err => {
            return err;
        });
    }
}

// Local Functions
export const setProfile = profile => {
    return {
        type: actionTypes.SET_PROFILE,
        payload: profile
    }
}