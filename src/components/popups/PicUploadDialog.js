
// libraries
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import AvatarEditor from 'react-avatar-edit'


// material-ui
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

// utils
import { updateUserPic } from '../../store/actions/index';

export default function PicUploadDialog(props){
    // local state
    const [ file, setFile ] = React.useState(null)
    const [ fileType, setFileType ] = React.useState(null);
    const [ fileName, setFileName ] = React.useState(null);

    // redux state and dispatch
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
        props.handleClosePicUploaderDialog()

        // for sending files to the backend
        const formData = new FormData();
        formData.append('pic', file);

        if(file) await dispatch(updateUserPic(auth.token, formData))
    }

    const handleClose = () => {
        setFile(null);
        props.handleClosePicUploaderDialog()
    }

    return (
        <Dialog onClose={props.handleClosePicUploaderDialog} aria-labelledby="simple-dialog-title" open={props.openPicUploaderDialog}>
            <br/>
            <DialogTitle id="simple-dialog-title">Upload New Picture</DialogTitle>
            <DialogContent>
                <AvatarEditor
                    width={390}
                    height={295}
                    onFileLoad={onFileLoad}
                    onCrop={img => onCropImg(img)}
                    onClose={() => setFile(null)}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary" variant="contained">
                    Cancel
                </Button>
                <Button onClick={handleSaveImage} disabled={file ? false : true } color="secondary" variant="contained">
                    Save
                </Button>
            </DialogActions>
            <br/>
        </Dialog>
    );
}