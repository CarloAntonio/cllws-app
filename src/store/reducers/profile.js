import * as actionTypes from "../actionTypes";

const initialState = {
    basicInfo: null
};

const setProfile = (state, action) => {
    return {
        ...state,
        basicInfo: action.payload
    }
}

// const setUserPosts = (state, action) => {
//     return {
//         ...state,
//         posts: action.payload
//     }
// }

// const addUserPost = (state, action) => {
//     return {
//         ...state,
//         posts: [...state.posts, action.payload]
//     }
// }


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PROFILE: return setProfile(state, action);
        // case actionTypes.SET_USER_POSTS: return setUserPosts(state, action);
        // case actionTypes.ADD_USER_POST: return addUserPost(state, action);
        default: return state;
    }
}

export default profileReducer;