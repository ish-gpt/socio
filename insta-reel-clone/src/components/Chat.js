import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import UploadIcon from '@mui/icons-material/Upload';
import './Chat.css';

function Chat({ userDetails, selectedUser }) {
    const [msg, setMsg] = useState('');
    let { socket, user } = useContext(AuthContext);
    const [message, setMessage] = useState([]);

    useEffect(() => {
        // console.log(userDetails);
        setMsg('');

        subscribeToMessage();

        return () => {
            unsubscribeFromMessage()
            // check why without this messages were printing two times?
            /**
             * Each time the component re-renders (due to state/prop changes or mounting/unmounting),
             *  a new socket.on("eventName", callback) listener is added without removing the previous
             *  one.
             * To avoid this clean up of events is required
             */
        }

    }, [selectedUser]);

    function subscribeToMessage() {
        socket.on("receivedMsg", (msg) => {
            setMessage((prevMessages) => [...prevMessages, msg]);
        })
    }

    function unsubscribeFromMessage() {
        socket.off("receivedMsg")
    }

    function prepareMessageBody() {
        return {
            msg: msg,
            sender: user.uid,
            receiver: selectedUser.uid
        }
    }

    function sendMessage() {
        const msgBody = prepareMessageBody();
        // let msgBySender = {
        //     id: user.uid,
        //     msg: msg
        // }
        setMessage((prevMessages) => [...prevMessages, msgBody]);
        socket.emit("newMessage", msgBody);
    }



    return (
        selectedUser && <div className='chat-container'>
            <div className='chat-container-header'>
                <div className='user-avatar'>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt="John Doe" src={selectedUser.profileURL} sx={{ width: 65, height: 65 }} />
                        <Typography variant="h5" component="span">
                            <strong><i>{selectedUser.fullName}</i></strong>
                        </Typography>
                    </Stack>
                </div>
            </div>
            <div className='messages-contianer'>
                <div>
                    {
                        message && message.map((msg) => (
                            <div>
                                {
                                    msg.sender === user.uid ?
                                        <div className='message-right'>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Typography variant="h8" component="span">
                                                    <div className='right-message-bubble'>
                                                        <i>{msg.msg}</i>
                                                    </div>
                                                </Typography>
                                                <Avatar alt="John Doe" src={userDetails.profileURL} sx={{ width: 30, height: 30 }} />
                                            </Stack>
                                        </div>
                                        :
                                        <div className='message-left'>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Avatar alt="John Doe" src={selectedUser.profileURL} sx={{ width: 30, height: 30 }} />
                                                <Typography variant="h8" component="span">
                                                    <div className='left-message-bubble'>
                                                        <i>{msg.msg}</i>
                                                    </div>
                                                </Typography>
                                            </Stack>
                                        </div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='chat-container-footer'>
                <div className='message-footer'>
                    <div className='upload-file'>
                        <IconButton aria-label="send" onClick={() => { sendMessage() }}>
                            <UploadIcon />
                        </IconButton>
                    </div>
                    <div className='msg-text'>
                        <input className='input-box' type='text' value={msg} onChange={(e) => { setMsg(e.target.value) }} placeholder={selectedUser.uid}>

                        </input>
                    </div>
                    <div className='send-btn'>
                        <IconButton aria-label="send" onClick={() => { sendMessage() }}>
                            <SendIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
