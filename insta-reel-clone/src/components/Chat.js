import React, { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import UploadIcon from '@mui/icons-material/Upload';
import AxiosService from '../axios/axiosInstance.js';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import './Chat.css';
import { Button } from '@mui/material';

function Chat({ userDetails, selectedUser }) {
    const API_ENDPOINT = 'api/v1/message';
    const [msg, setMsg] = useState('');
    let { socket, user } = useContext(AuthContext);
    const [message, setMessage] = useState([]);
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState('');
    const [cancelIcon, setCancelIcon] = useState(false);
    const imgRef = useRef(null)
    const containerRef = useRef(null);
    const cancelIconRef = useRef(null);
    const layerRef = useRef(null);

    useEffect(() => {
        if (fileUrl) {
            imgRef.current.src = fileUrl;
            containerRef.current.addEventListener('mouseleave', (e) => {
                setCancelIcon(false);
                cancelIconRef.current.removeEventListener('click',()=>{});
                layerRef.current.classList.remove('layer')
            })
            containerRef.current.addEventListener('mouseenter', (e) => {
                setCancelIcon(true);
                cancelIconRef.current.style.cursor = 'pointer';
                cancelIconRef.current.addEventListener('click', () => {
                    removeImagePreview()
                })
                layerRef.current.classList.add('layer')
            })
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('mouseleave',()=>{});
                containerRef.current.removeEventListener('mouseenter',()=>{});
            }
        }
    }, [file, fileUrl]);


    useEffect(() => {
        // console.log(userDetails);
        setMsg('');
        setMessage([]);

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

    function removeImagePreview() {
        setFileUrl('');
        setFile(null);
    }

    function subscribeToMessage() {
        socket.on("receivedMsg", (msg) => {
            if (msg.sender !== selectedUser.uid) return;
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
            receiver: selectedUser.uid,
            image: file
        }
    }

    const onImageUpload = (e) => {
        let file = e.target.files[0];
        setFile(file);

        if (file) {
            setFileUrl(URL.createObjectURL(file))
        }
    }

    async function saveMessage(msgBody) {
        let token = await AxiosService.getFirebaseAuthToken();
        let URL = `${API_ENDPOINT}/send/${selectedUser.uid}`;
        await AxiosService.post(URL,
            { data: msgBody },
            {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    async function sendMessage() {
        const msgBody = prepareMessageBody();
        setMessage((prevMessages) => [...prevMessages, msgBody]);
        socket.emit("newMessage", msgBody);
        saveMessage(msgBody);
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
                {
                    file ? <div className='preview-img-container' ref={containerRef}>
                        <img className='preview-img' tabIndex={0} ref={imgRef}></img>
                        <div ref={layerRef}></div>
                        <div className='cancel-icon' ref={cancelIconRef}>
                            {cancelIcon  && <CancelOutlinedIcon />}
                        </div>   
                    </div> : <></>
                }
                <div className='message-footer'>
                    <div className='msg-text'>
                        <input className='input-box' type='text' value={msg} onChange={(e) => { setMsg(e.target.value) }} placeholder={selectedUser.uid}>

                        </input>
                    </div>
                    <div className='upload-file'>
                        <IconButton aria-label="send" component='label'>
                            <input type="file" accept='image/*' hidden onChange={onImageUpload} />
                            <CollectionsOutlinedIcon />
                        </IconButton>
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
