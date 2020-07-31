import * as actionTypes from "../actionTypes";

// Local Functions
export const openLeftDrawer = () => {
    return {
        type: actionTypes.OPEN_LEFT_DRAWER
    }
}

export const closeLeftDrawer = (err) => {
    return {
        type: actionTypes.CLOSE_LEFT_DRAWER
    }
}

export const setLDOptions = (option) => {
    return {
        type: actionTypes.SET_LD_OPTIONS,
        payload: option
    }
}