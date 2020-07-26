import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash'

// material-ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// utils
import { updateProfile } from '../../store/actions/index';

export default function EditProfileDialog(props){

    // state
    const [hometown, setHometown] = React.useState(null);
    const [livesIn, setLivesIn] = React.useState(null);
    const [interest, setInterest] = React.useState(null);
    const [worksIn, setWorksIn] = React.useState(null);
    const [quote, setQuote] = React.useState(null);

    // redux state & dispatch
    const auth = useSelector(state => state.auth);
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();

    // lifecyle
    React.useEffect(() => {
        // update a component lifecycle "onMount"
        if(profile) {
            if(profile.hometown && profile.hometown.value) setHometown(profile.hometown);
            if(profile.livesIn && profile.livesIn.value) setLivesIn(profile.livesIn);
            if(profile.interest && profile.interest.value) setInterest(profile.interest);
            if(profile.worksIn && profile.worksIn.value) setWorksIn(profile.worksIn);
            if(profile.quote && profile.quote.value) setQuote(profile.quote);
        }
    }, [profile]);

    // handles state change
    const handleUpdateTrait = e => {
        let updatedTrait = cloneDeep(profile[e.target.id]);
        if(!updatedTrait) {
            updatedTrait = {
                title: e.target.name,
                value: e.target.value,
                hidden: true,
            }
        } else {
            updatedTrait.value = e.target.value;
        }
        
        // logic for deciding which state fxn to use
        if(e.target.id === "livesIn") setLivesIn(updatedTrait)
        else if(e.target.id === "hometown") setHometown(updatedTrait)
        else if(e.target.id === "worksIn") setWorksIn(updatedTrait)
        else if(e.target.id === "interest") setInterest(updatedTrait)
        else if(e.target.id === "quote") setQuote(updatedTrait)
    }

    const handleUpdateProfile = () => {
        const updatedProfile = cloneDeep(profile);
        if(hometown) updatedProfile.hometown = hometown;
        if(livesIn) updatedProfile.livesIn = livesIn;
        if(interest) updatedProfile.interest = interest;
        if(worksIn) updatedProfile.worksIn = worksIn;
        if(quote) updatedProfile.quote = quote;
        dispatch(updateProfile(auth.token, updatedProfile));
        props.handleCloseEditProfileDialog()
    }
    
    return (
        <div>
            <Dialog open={props.openEditProfileDialog} onClose={props.handleCloseEditProfileDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Summary</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Share as much or as little about yourself. The hidden feature (eye icon) prevents everyone but yourself to see that information.
                    </DialogContentText>

                    <TextField
                        margin="dense"
                        id="hometown"
                        name="Hometown"
                        label="Hometown"
                        type="text"
                        value={hometown ? hometown.value: ""}
                        onChange={handleUpdateTrait}
                        fullWidth/>

                    <TextField
                        margin="dense"
                        id="livesIn"
                        name="Lives In"
                        label="Lives In"
                        type="text"
                        value={livesIn ? livesIn.value : ""}
                        onChange={handleUpdateTrait}
                        fullWidth/>

                    <TextField
                        margin="dense"
                        id="interest"
                        name="Interest"
                        label="Interest"
                        type="text"
                        value={interest ? interest.value : ""}
                        onChange={handleUpdateTrait}
                        fullWidth/>

                    <TextField
                        margin="dense"
                        id="worksIn"
                        name="Works In"
                        label="Works In"
                        type="text"
                        value={worksIn ? worksIn.value : ""}
                        onChange={handleUpdateTrait}
                        fullWidth/>

                    <TextField
                        margin="dense"
                        id="quote"
                        name="Quote"
                        label="Quote"
                        type="text"
                        value={quote ? quote.value : ""}
                        onChange={handleUpdateTrait}
                        fullWidth/>

                </DialogContent>

                <DialogActions>
                    <Button onClick={props.handleCloseEditProfileDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateProfile} color="primary">
                        Update
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}