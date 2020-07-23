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
            if (res.status !== 200) {
            throw new Error('Failed to fetch status');
            }
            return res.json();
        })
        .then(resData => {
            if(resData && resData.message){
                //do nothing because profile has never been filled out
            } else {
                dispatch(setProfile(resData))
            }
        })
        .catch(err => {
            console.log(err);
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

// export const setUserPosts = (posts) => {
//     return {
//         type: actionTypes.SET_USER_POSTS,
//         payload: posts
//     }
// }

// export const addUserPost = (post) => {
//     return {
//         type: actionTypes.ADD_USER_POST,
//         payload: post
//     }
// }