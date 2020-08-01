
import * as actionTypes from "../actionTypes";

import { handleResponseErrors, handleJsonErrors } from './utils';

export const addPost = (token, text) => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:8080/post/addPost', {
                method: "POST",
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            })

            const jsonData = await handleResponseErrors(response);
            if(jsonData instanceof Error) throw jsonData;

            const result = await handleJsonErrors(jsonData);
            if(result instanceof Error) throw result;
            else dispatch(setNewPost(result))

        } catch(err){
            return err;
        }
    }
}

export const getPosts = token => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:8080/post/getPosts', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })

            const jsonData = await handleResponseErrors(response);
            if(jsonData instanceof Error) throw jsonData;

            const result = await handleJsonErrors(jsonData);
            if(result instanceof Error) throw result;
            else dispatch(setPosts(result))

        } catch(err){
            return err;
        }
    }
}

export const getPostsPublic = (token, username) => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:8080/post/getPosts/' + username, {
                headers: {
                    Authorization: 'Bearer ' + token,
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

export const getFeed = (token, friends) => {

    const queryString = encodeURIComponent(JSON.stringify(friends))

    return async dispatch => {
        try {
            const response = await fetch('http://localhost:8080/feed/getFeed/' + queryString, {
                headers: {
                    Authorization: 'Bearer ' + token,
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

export const clearPosts = () => {
    return {
        type: actionTypes.CLEAR_POSTS
    }
}