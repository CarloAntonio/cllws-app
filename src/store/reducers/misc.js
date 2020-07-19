
import * as actionTypes from "../actionTypes";

const initialState = {
    showProblemDrawer: false
};

const openProblemDrawer = (state, action) => {
    return {
        ...state,
        showProblemDrawer: true
    }
}

const closeProblemDrawer = (state, action) => {
    return {
        ...state,
        showProblemDrawer: false
    }
}

const miscReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_PROBLEM_DRAWER: return openProblemDrawer(state, action);
        case actionTypes.CLOSE_PROBLEM_DRAWER: return closeProblemDrawer(state, action);
        default: return state;
    }
}

export default miscReducer;