
// libraries
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AvatarEditor from 'react-avatar-edit'

// material-ui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

// custom components
import CustomSnack from '../../components/popups/CustomSnack';

// utils
import { updateUserPic } from '../../store/actions/index';

export default function Step2(props){

    // local state
    const [ file, setFile ] = React.useState(null)
    const [ fileType, setFileType ] = React.useState(null);
    const [ fileName, setFileName ] = React.useState(null);
    const [ error, setError ] = React.useState(false)

    // redux state & dispatch
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onFileLoad = (file) => {
        if(file){
            if(file.name) setFileName(file.name);
            if(file.type) setFileType(file.type);
        }
    }

    const onCropImg = (img) => {
        // convert to file
        fetch(img)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], fileName, {type: fileType });
            setFile(file);
          });
    };

    // reach out to backend
    const handleSaveImage = async () => {
        // TODO: ADD loader...

        // for sending files to the backend
        const formData = new FormData();
        formData.append('pic', file);

        let result = null;
        if(file) result = await dispatch(updateUserPic(auth.token, formData))

        if(result.pic) {
            setFile(null);
            props.handleNext();
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth={'sm'} 
                open={props.step === 2} 
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Say Cheese</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Now for the fun stuff, let's give the people what they came here to see.
                    </DialogContentText>

                    <DialogContent>
                        <Grid container justify="center">
                        <AvatarEditor
                            width={390}
                            height={295}
                            onFileLoad={onFileLoad}
                            onCrop={img => onCropImg(img)}
                            onClose={() => setFile(null)}/>
                        </Grid>
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleSaveImage} disabled={file ? false : true } color="secondary" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <CustomSnack open={error} onClose={() => setError(false)} severity="error">
                Something Went Wrong...
            </CustomSnack>
        </div>
    )
}