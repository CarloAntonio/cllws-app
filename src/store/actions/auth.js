
import * as actionTypes from "../actionTypes";

export const signUp = credentials => {
    return dispatch => {
        // update auth loading state
        dispatch(setLoading());

        return fetch('http://localhost:8080/auth/signup', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        })
        .then(res => {
            // reaches backend, handle possible errors
            if (res.status === 422) {
                // You did things right, but for some reason something happened on our end.
                throw new Error('An Error Has Occured');
            }
            if (res.status === 401){
                // You did something wrong and here is what you did wrong
                return res.json();
            }
            if(res.status !== 200 && res.status !== 201) {
                // You did something wrong but we didn't want to take the time to tell you what you did wrong so here is a catch all error
                throw new Error('Creating a user failed!');
            }
            return res.json();
        })
        .then(resData => {
            if(resData.token && resData.uid){
                dispatch(loginSuccess(resData))
                localStorage.setItem('token', resData.token);
                localStorage.setItem('uid', resData.uid);
                const remainingMilliseconds = 60 * 60 * 1000;
                const expiryDate = new Date(
                    new Date().getTime() + remainingMilliseconds
                );
                localStorage.setItem('expiryDate', expiryDate.toISOString());
                dispatch(setAutoLogout(remainingMilliseconds));
                return { code: 'ok' };
            } else if (resData.message) {
                // something went wrong and here's how to fix it
                throw new Error(resData.message);
            } else {
                // something went wrong but we have no feedback to give you
                throw new Error('Creating a user failed!');
            }
        })
        .catch(err => {
            dispatch(loginError(err))
            return err;
        });
    }  
}
export const login = credentials => {
    return dispatch => {
        // update auth loading state
        dispatch(setLoading());

        // fetch auth data
        return fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        })
        .then(res => {
            // reaches backend, handle possible errors
            if (res.status === 422) {
                // You did things right, but for some reason something happened on our end.
                throw new Error('An error has occured, our engineers are looking into fixing the problem');
            }
            if (res.status === 401){
                // You did something wrong and here is what you did wrong
                return res.json();
            }
            if(res.status !== 200 && res.status !== 201) {
                // You did something wrong but we didn't want to take the time to tell you what you did wrong so here is a catch all error
                throw new Error('Could not authenticate you');
            }
            return res.json();
        })
        .then(resData => {
            if(resData.token && resData.uid){
                // things went right
                dispatch(loginSuccess(resData))
                localStorage.setItem('token', resData.token);
                localStorage.setItem('uid', resData.uid);
                const remainingMilliseconds = 60 * 60 * 1000;
                const expiryDate = new Date(
                    new Date().getTime() + remainingMilliseconds
                );
                localStorage.setItem('expiryDate', expiryDate.toISOString());
                dispatch(setAutoLogout(remainingMilliseconds));
                return { code: 'ok' };
            } else if (resData.message) {
                // something went wrong and here's how to fix it
                throw new Error(resData.message);
            } else {
                // something went wrong but we have no feedback to give you
                throw new Error('Could not authenticate you!');
            }
        })
        .catch(err => {
            dispatch(loginError(err))
            return err;
        });
    }
}

// Local Actions
const setLoading = () => {
    return {
        type: actionTypes.SET_AUTH_LOADING
    }
}

const loginSuccess = resData => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: resData
    }
}

const loginError = err => {
    return {
        type: actionTypes.LOGIN_ERROR, 
        payload: err
    }
}

export const setAutoLogout = milliseconds => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logoutIntermediate());
        }, milliseconds);
    }
};

export const logoutIntermediate = () => {
    return dispatch => {
        dispatch(logout())
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('userId');
    }
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT,
    }
}

export const setToken = token => {
    return {
        type: actionTypes.SET_TOKEN,
        payload: token
    }
}

export const setUid = uid => {
    return {
        type: actionTypes.SET_UID,
        payload: uid
    }
}