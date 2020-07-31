import * as actionTypes from "../actionTypes";

const initialState = [];

const setFriends = (state, action) => {
    return action.payload
}

const clearFriends = (state, action) => {
    return initialState;
}

const friendReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_FRIENDS: return setFriends(state, action);
        case actionTypes.CLEAR_FRIENDS: return clearFriends(state, action);
        default: return state;
    }
}

export default friendReducer;