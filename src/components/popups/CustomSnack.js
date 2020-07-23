
// libraries
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomSnack(props) {
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity={props.severity}>
                {props.children}
            </Alert>
        </Snackbar>
    );
}