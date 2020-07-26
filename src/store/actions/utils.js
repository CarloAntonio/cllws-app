
export const handleResponseErrors = res => {
    // reaches backend, handle possible errors
    if (res.status === 422) {
        // Error occured and we are fixing
        return new Error('An Error Occurred And We Are Working To Fix It');
    }
    if (res.status === 401 || res.status === 404){
        // Error occured and how to fix it
        return res.json();
    }
    if(res.status !== 200 && res.status !== 201) {
        // Catch all error code
        return new Error('An Error Occurred');
    }
    return res.json();
}

export const handleJsonErrors = jsonData => {
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