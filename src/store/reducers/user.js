
import * as actionTypes from "../actionTypes";

const initialState = {};

const updateUser = (state, action) => {
    return {
        ...state,
        ...action.payload,
    }
}

const clearUser = (state, action) => {
    return initialState;
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_USER: return updateUser(state, action);
        case actionTypes.CLEAR_USER: return clearUser(state, action);
        default: return state;
    }
}

export default userReducer;
