import * as actionTypes from "../actionTypes";

const initialState = {};

const setProfile = (state, action) => {
    console.log(action.payload)
    return {
        ...state,
        ...action.payload
    }
}

const clearProfile = (state, action) => {
    return initialState;
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PROFILE: return setProfile(state, action);
        case actionTypes.CLEAR_PROFILE: return clearProfile(state, action);
        default: return state;
    }
}

export default profileReducer;