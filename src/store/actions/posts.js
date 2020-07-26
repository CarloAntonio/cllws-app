
import * as actionTypes from "../actionTypes";

export const addPost = (token, text) => {
    return dispatch => {
        // fetch auth data
        fetch('http://localhost:8080/post/addPost', {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
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
                throw new Error(resData.message);
            } else {
                dispatch(setNewPost(resData))
                return resData;
            }
        })
        .catch(err => {
            return err
        });
    }
}

export const getPosts = token => {
    return dispatch => {
        // fetch auth data
        fetch('http://localhost:8080/post/getPosts', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
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
                throw new Error(resData.message);
            } else {
                dispatch(setPosts(resData))
                return resData;
            }
        })
        .catch(err => {
            return err
        });
    }
}

export const setNewPost = post => {
    return {
        type: actionTypes.SET_NEW_POST,
        payload: post
    }
}

export const setPosts = posts => {
    return {
        type: actionTypes.SET_POSTS,
        payload: posts
    }
}