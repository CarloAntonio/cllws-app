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
// import { envEndpoint } from '../../utils/firebase-service';
// import { setUser } from '../../store/actions/index';

export default function EditProfileDialog(props){

    // state
    const [name, setName] = React.useState(null);
    const [livesIn, setLivesIn] = React.useState(null);
    const [hometown, setHometown] = React.useState(null);
    const [worksIn, setWorksIn] = React.useState(null);
    const [interest, setInterest] = React.useState(null);
    const [quote, setQuote] = React.useState(null);

    // redux state & dispatch
    const auth = useSelector(state => state.firebase.auth);
    const userData = useSelector(state => state.user.summary);
    const dispatch = useDispatch();

    // lifecyle
    React.useEffect(() => {
        // update a component lifecycle "onMount"
        if(userData) {
            if(userData.name && userData.name.value) setName(userData.name);
            if(userData.livesIn && userData.livesIn.value) setLivesIn(userData.livesIn);
            if(userData.hometown && userData.hometown.value) setHometown(userData.hometown);
            if(userData.worksIn && userData.worksIn.value) setWorksIn(userData.worksIn);
            if(userData.interest && userData.interest.value) setInterest(userData.interest);
            if(userData.quote && userData.quote.value) setQuote(userData.quote);
        }
    }, [userData]);

    const handleUpdateSummary = () => {
        const updatedUser = cloneDeep(userData);
        updatedUser.name = name;
        if(livesIn) updatedUser.livesIn = livesIn;
        if(hometown) updatedUser.hometown = hometown;
        if(worksIn) updatedUser.worksIn = worksIn;
        if(interest) updatedUser.interest = interest;
        if(quote) updatedUser.quote = quote;
        updateUser(updatedUser);
        props.handleCloseEditProfileDialog()
    }

    // reach out to the db
    const updateUser = async user => {
        // try{
        //     const response = await fetch(`${envEndpoint}user/updateUser`, {
        //         method: "POST",
        //         headers: new Headers({
        //             'Authorization': `Bearer ${auth.stsTokenManager.accessToken}`, 
        //             'Content-Type': 'application/json'
        //         }), 
        //         body: JSON.stringify({
        //             user,
        //         }),
        //     });

        //     // handle when request completed successfully
        //     if(response.ok && response.status === 200) { 
        //         // pull user data
        //         const result = await response.json();
        //         dispatch(setUser(result));
        //     }
        // } catch(err){
        //     console.log(err);
        // }
    }

    // handles state change
    const handleUpdateTrait = e => {
        let updatedTrait = cloneDeep(userData[e.target.id]);
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
        if(e.target.id === "name") setName(updatedTrait)
        else if(e.target.id === "livesIn") setLivesIn(updatedTrait)
        else if(e.target.id === "hometown") setHometown(updatedTrait)
        else if(e.target.id === "worksIn") setWorksIn(updatedTrait)
        else if(e.target.id === "interest") setInterest(updatedTrait)
        else if(e.target.id === "quote") setQuote(updatedTrait)
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
                        autoFocus
                        margin="dense"
                        id="name"
                        name="Name"
                        label="Name"
                        type="text" 
                        value={name ? name.value : ""}
                        onChange={handleUpdateTrait}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="livesIn"
                        name="Lives In"
                        label="Lives In"
                        type="text"
                        value={livesIn ? livesIn.value : ""}
                        onChange={handleUpdateTrait}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="hometown"
                        name="Hometown"
                        label="Hometown"
                        type="text"
                        value={hometown ? hometown.value: ""}
                        onChange={handleUpdateTrait}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="worksIn"
                        name="Works In"
                        label="Works In"
                        type="text"
                        value={worksIn ? worksIn.value : ""}
                        onChange={handleUpdateTrait}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="interest"
                        name="Interest"
                        label="Interest"
                        type="text"
                        value={interest ? interest.value : ""}
                        onChange={handleUpdateTrait}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="quote"
                        name="Quote"
                        label="Quote"
                        type="text"
                        value={quote ? quote.value : ""}
                        onChange={handleUpdateTrait}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCloseEditProfileDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateSummary} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}