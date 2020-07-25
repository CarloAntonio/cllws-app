// libraries
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// custom components
import CustomSnack from '../../components/popups/CustomSnack';

// utils
import { updateUser } from '../../store/actions/index';

export default function Step3(props){
    // local state
    const [ firstName, setFirstName ] = React.useState(null);
    const [ lastName, setLastName ] = React.useState(null);
    const [ error, setError ] = React.useState(false)

    // redux state & dispatch
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleUpdateUser = () => {
        dispatch(updateUser(auth.token, { firstName, lastName }));
        props.handleNext();
    }

    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth={'sm'} 
                open={props.step === 1} 
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">The Basics</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        What do you they call you is this here parts?
                    </DialogContentText>
                    
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        type="text" 
                        value={firstName ? firstName : ""}
                        onChange={e => setFirstName(e.target.value)}
                        fullWidth/>

                    <TextField
                        margin="dense"
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        type="text"
                        value={lastName ? lastName : ""}
                        onChange={e => setLastName(e.target.value)}
                        fullWidth/>

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleUpdateUser} disabled={firstName ? false : true } color="secondary" variant="contained">
                        Next
                    </Button>
                </DialogActions>
            </Dialog>
            <CustomSnack open={error} onClose={() => setError(false)} severity="error">
                Something Went Wrong...
            </CustomSnack>
        </div>
    )
}