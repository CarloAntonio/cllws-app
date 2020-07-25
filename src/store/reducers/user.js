
import * as actionTypes from "../actionTypes";

const initialState = {};

const updateUser = (state, action) => {
    return {
        ...state,
        ...action.payload,
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_USER: return updateUser(state, action);
        default: return state;
    }
}

export default userReducer;
