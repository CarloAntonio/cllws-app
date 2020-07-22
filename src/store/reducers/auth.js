
import * as actionTypes from "../actionTypes";

const initialState = {
    uid: null,
    token: null,
    isLoading: false,
    authError: null
};

const setToken = (state, action) => {
    return {
        ...state,
        token: action.payload
    }
}

const setUid = (state, action) => {
    return {
        ...state,
        uid: action.payload
    }
}

const setLoading = (state, action) => {
    return {
        ...state,
        isLoading: true
    }
}

const loginSuccess = (state, action) => {
    console.log(action)
    return {
        ...state,
        uid: action.payload.uid,
        token: action.payload.token,
        isLoading: false,
        authError: null
    }
}

const loginError = (state, action) => {
    return {
        ...state,
        uid: null,
        token: null,
        isLoading: false,
        authError: action.payload,
    }
}

const logout = (state, action) => {
    return {
        ...state,
        uid: null,
        token: null,
        isLoading: false,
        authError: null
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH_LOADING: return setLoading(state, action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
        case actionTypes.LOGIN_ERROR: return loginError(state, action);
        case actionTypes.SET_TOKEN: return setToken(state, action);
        case actionTypes.SET_UID: return setUid(state, action);
        case actionTypes.LOGOUT: return logout(state, action);
        default: return state;
    }
}

export default authReducer;