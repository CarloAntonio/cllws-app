import * as actionTypes from "../actionTypes";

const initialState = [];

const setNewPost = (state, action) => {
    const newState = [...state];
    newState.push(action.payload);
    return newState;
}

const setPosts = (state, action) => {
    const posts = action.payload.map(post => {
        return {
            ...post,
            date: new Date(post.date)
        }
    })
    return posts
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_NEW_POST: return setNewPost(state, action);
        case actionTypes.SET_POSTS: return setPosts(state, action);
        default: return state;
    }
}

export default postReducer;