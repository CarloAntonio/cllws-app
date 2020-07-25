
import * as actionTypes from "../actionTypes";

export const getUser = token => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:8080/user/getUser', {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            })

            const jsonData = await handleResponseErrors(response);
            if(jsonData instanceof Error) throw jsonData;

            const result = await handleJsonErrors(jsonData);
            if(result instanceof Error) throw result;
            else dispatch(updateUserRedux(result))

        } catch(err){
            return err;
        }
    }
}

export const updateUser = (token, data) => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:8080/user/updateUser', {
                method: 'PATCH',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data
                })
            });
    
            const jsonData = await handleResponseErrors(response);
            if(jsonData instanceof Error) throw jsonData;

            const result = await handleJsonErrors(jsonData);
            if(result instanceof Error) throw result;
            else dispatch(updateUserRedux(result))

        } catch(err){
            return err;
        };
    }
}

export const updateUserPic = (token, formData) => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:8080/user/updateUserPic', {
                method: "PATCH",
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                body: formData
            });

            const jsonData = await handleResponseErrors(response);
            if(jsonData instanceof Error) throw jsonData;

            const result = await handleJsonErrors(jsonData);
            if(result instanceof Error) throw result;
            else {
                dispatch(updateUserRedux(result))
                return result;
            }

        } catch(err){
            return err;
        }
    }
}

const handleResponseErrors = res => {
    // reaches backend, handle possible errors
    if (res.status === 422) {
        // You did things right, but for some reason something happened on our end.
        return new Error('An Error Occurred And We Are Working To Fix It');
    }
    if (res.status === 401){
        // You did something wrong and here is what you did wrong
        return res.json();
    }
    if(res.status !== 200 && res.status !== 201) {
        // You did something wrong but we didn't want to take the time to tell you what you did wrong so here is a catch all error
        return new Error('An Error Occurred');
    }
    return res.json();
}

const handleJsonErrors = jsonData => {
    if(jsonData.message){
        // something went wrong and here's how to fix it
        return new Error(jsonData.message);
    } else if (jsonData) {
        // things went right
        return jsonData;
    } else {
        // something went wrong but we have no feedback to give you
        return new Error('Could not authenticate you!');
    }
}

const updateUserRedux = data => {
    return {
        type: actionTypes.UPDATE_USER,
        payload: data
    }
}