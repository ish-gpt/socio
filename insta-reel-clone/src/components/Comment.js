import React from 'react'
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import './Comment.css';
import CommentSection from './CommentSection';

export default function Comment(props) {
    // console.log("----------", props.userData, props.postData)
    const handleClose = () => {
        props.setPopup(false);
    };

    return (
        <Dialog
            fullWidth
            maxWidth='lg'
            open={props.openPopup}
            onClose={handleClose}
        >
            <div className='commnet-modal-wrapper'>
                <div className='modal-video-wrapper'>
                    <video src={props.postData.pURL} controls className='modal-video'></video>
                </div>
                <div className='modal-comment-wrapper'>
                    <CommentSection userData={props.userData} postData={props.postData}></CommentSection>
                </div>
            </div>
            {/* <Button onClick={handleClose}>Close</Button> */}
        </Dialog>
    )
}
