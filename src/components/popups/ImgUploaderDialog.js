// libraries
import React, { PureComponent } from "react";
import ImageUploader from "react-images-upload";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// material ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ImgUploaderDialog extends PureComponent {
    state = {
        src: null,
        crop: {
          unit: "%",
          width: 30,
          aspect: 16 / 9
        },
        croppedImageUrl: null,
        title: ""
    };

    handleClose = () => {
        this.setState({
            src: null,
            crop: {
              unit: "%",
              width: 30,
              aspect: 16 / 9
            },
            croppedImageUrl: null,
            title: ""
        })
        this.props.closeMediaPostModal();
    };

    // this handles uploading the image
    onDrop = pictures => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            this.setState({ src: reader.result})
        });
        reader.readAsDataURL(pictures[0]);
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
        const croppedImageUrl = await this.getCroppedImg(
            this.imageRef,
            crop,
            "newFile.jpeg"
        );
        this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
        );

        return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error("Canvas is empty");
            return;
            }
            blob.name = fileName;
            window.URL.revokeObjectURL(this.fileUrl);
            this.fileUrl = window.URL.createObjectURL(blob);
            resolve(this.fileUrl);
        }, "image/jpeg");
        });
    }

    handleAddMediaPost = async () => {
        const file = await this.convertBlobUrl(this.setState.croppedImageUrl);
        console.log(file)
        console.log(this.state.title);
    }

    convertBlobUrl = async blobUrl => {
        // convert to file
        const result = await fetch(blobUrl)
        const blob = await result.blob();
        return new File([blob], blob.name, {type: blob.type });
    };

    render(){
        const { crop, croppedImageUrl, src, title } = this.state;

        return (
            <Dialog open={this.props.showMediaPost} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="upload-photo">Upload A Photo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField 
                            id="standard-basic" 
                            label="Title (Required)" 
                            color="primary" 
                            value={title} 
                            onChange={e => this.setState({ title: e.target.value })} 
                            fullWidth 
                            required/>
                    </DialogContentText>

                    <DialogContentText>
                        Remember community guidelines when posting images and videos, thanks for keeping things kosher.
                    </DialogContentText>

                        {!src && (
                            <ImageUploader
                                {...this.props}
                                withIcon={true}
                                singleImage={true}
                                onChange={this.onDrop}
                                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                maxFileSize={5242880} />
                        )}
                        {src && (
                            <ReactCrop
                                src={src}
                                crop={crop}
                                ruleOfThirds
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}/>
                        )}
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleAddMediaPost} disabled={croppedImageUrl && title ? false : true } color="primary">
                    Upload
                </Button>
                </DialogActions>
            </Dialog>
    
        );
    }
};

export default ImgUploaderDialog;