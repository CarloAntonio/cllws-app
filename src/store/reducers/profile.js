import * as actionTypes from "../actionTypes";

const initialState = {};

const setProfile = (state, action) => {
    return {
        ...state,
        ...action.payload
    }
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PROFILE: return setProfile(state, action);
        default: return state;
    }
}

export default profileReducer;