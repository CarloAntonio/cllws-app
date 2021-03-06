
import * as actionTypes from "../actionTypes";

const initialState = {
    token: null,
    isLoading: false,
    initialLoad: true,
    authError: null
};

const setToken = (state, action) => {
    return {
        ...state,
        token: action.payload,
        initialLoad: false
    }
}

const setLoading = (state, action) => {
    return {
        ...state,
        isLoading: true,
        initialLoad: false
    }
}

const loginSuccess = (state, action) => {
    return {
        ...state,
        ...action.payload,
        isLoading: false,
        authError: null
    }
}

const loginError = (state, action) => {
    return {
        ...state,
        token: null,
        isLoading: false,
        authError: action.payload,
    }
}

const logout = (state, action) => {
    return {
        token: null,
        isLoading: false,
        initialLoad: false,
        authError: null
    };
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH_LOADING: return setLoading(state, action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
        case actionTypes.LOGIN_ERROR: return loginError(state, action);
        case actionTypes.SET_TOKEN: return setToken(state, action);
        case actionTypes.LOGOUT: return logout(state, action);
        default: return state;
    }
}

export default authReducer;