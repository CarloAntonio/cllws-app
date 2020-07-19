import * as actionTypes from "../actionTypes";

// Local Functions
export const openProblemDrawer = () => {
    return {
        type: actionTypes.OPEN_PROBLEM_DRAWER
    }
}

export const closeProblemDrawer = (err) => {
    return {
        type: actionTypes.CLOSE_PROBLEM_DRAWER
    }
}