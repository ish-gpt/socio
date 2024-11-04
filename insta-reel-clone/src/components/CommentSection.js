import React from 'react';
import './CommentSection.css';
import Actions from './Actions';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TextField from '@mui/material/TextField';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

export default function CommentSection({ userData, postData }) {
    return (
        <div className='comments-wrapper'>
            <div className='comments-nav'>
                <div className='profile-wrapper'>
                    <img className='user-profile' src={postData.userProfile}></img>
                </div>
                <div style={{ placeContent: 'center' }}>
                    <h3>{
                        postData.uName
                    }</h3>
                </div>
            </div>
            <div className='comments-content'>
                <div className='comments'>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm<br></br>
                </div>
            </div>
            <div className='comments-actions'>
                <div className='comment-icons'>
                    <div className='like-comment-share'>
                        <Actions userData={userData} postData={postData}></Actions>
                    </div>
                    <div className='save-icon'>
                        <TurnedInNotIcon></TurnedInNotIcon>
                    </div>
                </div>
                <div className='likes-section'>
                    <strong>1,324 Likes</strong>
                </div>
                <div className='comment-text-box'>
                    <TextField id="outlined-basic" fullWidth label="Comment" variant="outlined"
                        slotProps={{
                            input: {
                                startAdornment: <InsertEmoticonIcon position="start">kg</InsertEmoticonIcon>,
                                endAdornment:<>Post</>
                            },
                        }}
                    >
                    </TextField>
                </div>
            </div>
        </div>
    )
}
