
// libraries
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash'

// material-ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// custom components
import CustomSnack from '../../components/popups/CustomSnack';

// utils
import { updateProfile, updateUser } from '../../store/actions/index';

export default function Step3(props){
    // local state
    const [ hometown, setHometown ] = React.useState(null);
    const [ livesIn, setLivesIn ] = React.useState(null);
    const [ interest, setInterest ] = React.useState(null);
    const [ worksIn, setWorksIn ] = React.useState(null);
    const [ quote, setQuote ] = React.useState(null);
    const [ error, setError ] = React.useState(false)

    // redux state & dispatch
    const auth = useSelector(state => state.auth);
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();

    // handles state change
    const handleUpdateTrait = e => {
        const updatedTrait = {
            title: e.target.name,
            value: e.target.value,
            hidden: false,
        }
        
        // logic for deciding which state fxn to use
        if(e.target.id === 'hometown') setHometown(updatedTrait); 
        else if(e.target.id === "livesIn") setLivesIn(updatedTrait);
        else if(e.target.id === "interest") setInterest(updatedTrait);
        else if(e.target.id === "worksIn") setWorksIn(updatedTrait);
        else if(e.target.id === 'quote') setQuote(updatedTrait);
    }

    const handleCompleteOnBoarding = async () => {
        // TODO: ADD LOADER

        // update basic info
        const updatedProfile = cloneDeep(profile);
        if(hometown) updatedProfile.hometown = hometown;
        if(livesIn) updatedProfile.livesIn = livesIn;
        if(interest) updatedProfile.interest = interest;
        if(worksIn) updatedProfile.worksIn = worksIn;
        if(quote) updatedProfile.quote = quote;
        
        // reach out to db
        await dispatch(updateProfile(auth.token, updatedProfile));
        await dispatch(updateUser(auth.token, {onBoarded: true}));

        // cleanup
        props.handleNext();
    }

    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth={'sm'} 
                open={props.step === 3} 
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">A Little About You</DialogTitle>

                <DialogContent>
                    <TextField
                        margin="dense"
                        id="hometown"
                        name="Hometown"
                        label="Where did you grow up?"
                        type="text"
                        value={hometown ? hometown.value : ""}
                        onChange={handleUpdateTrait}
                        fullWidth/>

                    <TextField
                        margin="dense"
                        id="livesIn"
                        name="Lives In"
                        label="Where do you live?"
                        type="text"
                        value={livesIn ? livesIn.value : ""}
                        onChange={handleUpdateTrait}
                        fullWidth/>

                    <TextField
                        margin="dense"
                        id="interest"
                        name="Interest"
                        label="What are your interest?"
                        type="text"
                        value={interest ? interest.value : ""}
                        onChange={handleUpdateTrait}
                        fullWidth/>

                    <TextField
                        margin="dense"
                        id="worksIn"
                        name="Works In"
                        label="How do you do for a living?"
                        type="text"
                        value={worksIn ? worksIn.value : ""}
                        onChange={handleUpdateTrait}
                        fullWidth/>

                    <TextField
                        margin="dense"
                        id="quote"
                        name="Quote"
                        label="What are words that you live by?"
                        type="text"
                        value={quote ? quote.value : ""}
                        onChange={handleUpdateTrait}
                        fullWidth/>

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCompleteOnBoarding} color="secondary" variant="contained">
                        Finish
                    </Button>
                </DialogActions>
            </Dialog>
            <CustomSnack open={error} onClose={() => setError(false)} severity="error">
                Something Went Wrong...
            </CustomSnack>
        </div>
    )
}