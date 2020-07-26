
export const isEmptyObj = obj => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export const isEmptyArr = arr => {
    return arr === undefined || arr.length == 0
}