
import * as actionTypes from "../actionTypes";

const initialState = {
    showLeftDrawer: true,
    options: 'root',
};

const openLeftDrawer = (state, action) => {
    return {
        ...state,
        showLeftDrawer: true
    }
}

const closeLeftDrawer = (state, action) => {
    return {
        ...state,
        showLeftDrawer: false
    }
}

const setLDOptions = (state, action) => {
    return {
        ...state,
        options: action.payload
    }
}

const miscReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_LEFT_DRAWER: return openLeftDrawer(state, action);
        case actionTypes.CLOSE_LEFT_DRAWER: return closeLeftDrawer(state, action);
        case actionTypes.SET_LD_OPTIONS: return setLDOptions(state, action);
        default: return state;
    }
}

export default miscReducer;