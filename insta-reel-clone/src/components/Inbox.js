import React, { useContext, useEffect, useState } from 'react';
import NavigationSection from './NavigationSection';
import { AuthContext } from '../context/AuthContext';
import { getUserData, getAllUsers } from '../firebaseCRUD';
import Avatar from '@mui/material/Avatar';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import chaticon from '../images/chatting.jpg';
import './Inbox.css';
import Chat from './Chat';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import OnlineUserBadge from './badge/OnlineUserBadge';
import OfflineUserBadge from './badge/OfflineUserBadge';

export default function Inbox() {
    let { logout, user, socket } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState(null);
    const [allUsersDetails, setAllUsersDetails] = useState(null);
    const [friendToChat, setFriendToChat] = useState(null);
    const navigate = useNavigate();
    const { onlineUser } = useContext(AuthContext);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        getUserData(user).then(async (res) => {
            setUserDetails(res);
            let usersData = await getAllUsers();
            usersData = usersData.filter((doc) => res.uid !== doc.uid)
            setAllUsersDetails(usersData);
        });
        // console.log("---", onlineUser);
    }, [user, onlineUser]);

    // socket.on("receivedMsg", (msg) => {
    //     console.log("000------", msg);
    // })

    const handleChangeURL = (userData) => {
        // window.history.pushState({}, '', `/inbox/${userData.uid}`);
        navigate(`/inbox/${userData.uid}`, { replace: true }); // Change the URL to '/new-url'
        setFriendToChat(userData.uid);
        setSelectedUser(userData)
    };

    return (
        <div>
            <div>
                <NavigationSection></NavigationSection>
            </div>
            {
                userDetails && <div style={{ marginLeft: '70px', paddingLeft: '1em', height: '100vh' }} className='chats-section-wrapper'>
                    <div className='section-friends' style={{ borderRight: '1px solid lightgray', height: '100%' }}>
                        <div className='user-detail'>
                            <div>
                                <h2>
                                    {
                                        userDetails.fullName
                                    }
                                    <KeyboardArrowDownOutlinedIcon />
                                </h2>
                            </div>
                            <div className='new-msg-icon'>
                                <NoteAltOutlinedIcon titleAccess='New Message'></NoteAltOutlinedIcon>
                            </div>
                        </div>
                        <div className='notes-section'>
                            <Avatar alt="Remy Sharp" src={userDetails.profileURL} sx={{ width: 76, height: 76 }} />
                            <span style={{ color: 'grey', paddingLeft: '0.2em' }}>Your Note</span>
                        </div>
                        <div className='msg-req-section'>
                            <div>
                                <h4>Messages</h4>
                            </div>
                            <div style={{ paddingRight: '1em' }}>
                                <h4>Request</h4>
                            </div>
                        </div>
                        <div className='friends-section'>
                            {
                                allUsersDetails && allUsersDetails.map((userData) => (
                                    <div className='friend-list-item'>

                                        <Button variant="text" color='black' fullWidth style={{ justifyContent: 'flex-start' }} onClick={() => { handleChangeURL(userData) }}>
                                            <div className='friend-img-name-wrapper'>
                                                <div className='friend-avatar'>
                                                    {onlineUser.find((onlineId) => onlineId === userData.uid) ? <OnlineUserBadge userData={userData}></OnlineUserBadge> : <OfflineUserBadge userData={userData}></OfflineUserBadge>}
                                                </div>
                                                <div style={{ alignContent: 'center', marginLeft: '1em' }}>
                                                    <h4>{userData.fullName}</h4>
                                                </div>
                                            </div>
                                        </Button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='section-chat'>
                            {/* <img src={chaticon}></img> */}
                        <Chat userDetails={userDetails} selectedUser={selectedUser}></Chat>
                    </div>
                </div>
            }
        </div>
    )
}
