import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Feed.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import insta from '../images/ig-logo.png';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Suggestion from './Suggestion';
import phoneInsta from '../images/phone-insta.jpg';
import profile1 from '../images/profile-3.jpeg';
import profile2 from '../images/profile-5.jpeg';
import profile3 from '../images/profile-4.jpeg';
import profile4 from '../images/profile-6.jpeg';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/joy/LinearProgress';
import Snackbar from '@mui/joy/Snackbar';
import { uploadUserPosts } from '../profileStorage';
import { getUserData } from '../firebaseCRUD';
import Posts from './Posts';


const drawerWidth = 280;

export default function Feed() {

    // let uploadSuccessfull;
    let IconsArr = [<HomeIcon />, <SearchIcon />, <ExploreOutlinedIcon />, <SlideshowOutlinedIcon />, <ChatBubbleOutlineIcon />, <FavoriteBorderIcon />, <></>, <AccountCircleOutlinedIcon />]
    let { logout, user } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState(false);
    const [open, setOpen] = useState(true)
    const [error, setError] = useState('');
    const [errorTimer, setErrorTimer] = useState(0);
    const [uploadTimer, setUploadTimer] = useState(0);
    const [uploadSuccessfull, setUploadSuccessfull] = useState(true);
    const storiesArray = [profile1, profile2, profile3, profile4, phoneInsta, profile2, profile1, profile4, phoneInsta, profile2, profile3, phoneInsta, profile2, profile3, profile4, phoneInsta, profile2, profile1, phoneInsta, profile2, profile4, profile3, profile3, profile3, profile3]

    useEffect(() => {
        getUserData(user).then((res) => {
            setUserDetails(res);
        });
    }, [user])

    async function logOut() {
        await logout();
    }

    async function handleUploadReel(file) {
        setLoading(true);
        if (file == null) {
            setError('Please Select File First');
            setErrorTimer(5000);
            setTimeout(() => {
                setError('');
                setErrorTimer(0);
                setOpen(true);
            }, 5000);
            return;
        }
        if (((file.size) / (1024 * 1024)) > 100) {
            setError('File Should be < 100MB');
            setErrorTimer(5000);
            setTimeout(() => {
                setError('');
                setErrorTimer(0);
                setOpen(true);
            }, 5000);
            return;
        }

        try {
            await uploadUserPosts(userDetails, file).then(() => {
                setLoading(false);
                setUploadTimer(5000);
                setUploadSuccessfull(true);
                //post upload successfull notification
            }).catch((error) => {
                setLoading(false);
                setError('Error in Uploading Reel', error);
                setErrorTimer(5000);
                setTimeout(() => {
                    setError('');
                    setErrorTimer(0);
                    setOpen(true);
                }, 5000);
            });
        } catch (error) {
            setLoading(false);
            setError('Error in Uploading Reel');
            setErrorTimer(5000);
            setTimeout(() => {
                setError('');
                setErrorTimer(0);
                setOpen(true);
            }, 5000);
        }

    }
    return (
        <div className='user-v'>
            <Box sx={{
                display: 'flex',
                
            }}>
                {/* <CssBaseline /> */}
                <AppBar style={{ color: 'black', backgroundColor: 'white' }}
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                >
                    <div className='feed-header'>
                        <div>
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div">
                                    <Stack direction="row" spacing={2} maxWidth={720} sx={{
                                        overflowX: 'hidden', // Hide overflow (both X and Y) by default
                                        '&:hover': {
                                            overflow: 'auto', // Show overflow when hovering over the Stack
                                            cursor: 'pointer'
                                        },
                                        '&::-webkit-scrollbar': {
                                            display: 'none'
                                        }
                                    }}>
                                        {
                                            storiesArray.map((imgSrc) => (
                                                <div style={{
                                                    display: 'inline-block',
                                                    padding: '3px', // Padding creates space for the border
                                                    background: 'linear-gradient(to right, red, purple)',
                                                    borderRadius: '50%', // Full border radius for a circular shape
                                                }}>
                                                    <Avatar alt="" src={imgSrc} sx={{

                                                        borderRadius: '50%', // Ensure the Avatar remains circular
                                                        backgroundColor: 'white', // Optional: set a background for the inner avatar
                                                    }} />
                                                </div>
                                            ))
                                        }
                                    </Stack>
                                </Typography>
                            </Toolbar>
                        </div>
                        <div>
                            <Suggestion></Suggestion>
                        </div>
                    </div>

                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar>
                        <div className='insta-image-wrapper'>
                            <img className='ig-logo' src={insta} alt='ig-logo'></img>
                        </div>
                    </Toolbar>
                    {/* <Divider /> */}
                    <List>
                        {['Home', 'Search', ' Explore', 'Reel', 'Messages', 'Notification', 'Create', 'Profile'].map((text, index) => (
                            <ListItem sx={{ marginBottom: 2 }} key={text} disablePadding>
                                <ListItemButton component='label'>
                                    <ListItemIcon style={{ color: 'black' }}>
                                        {text == 'Create' ?
                                            <>
                                                <AddBoxOutlinedIcon />
                                                <input type="file" accept='video/*' hidden onChange={(e) => handleUploadReel(e.target.files[0])} />
                                            </>
                                            : IconsArr[index]}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                                {(text == 'Create' && (loading == true)) ? <LinearProgress
                                    color="primary"
                                    size="sm"
                                    value={30}
                                    variant="outlined"
                                    thickness={3}
                                /> : <></>}
                            </ListItem>

                        ))}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Toolbar />
                    <div className='new-div'>
                        <button onClick={logOut}>Logout</button>
                        <Posts className="user" userData={user}></Posts>
                    </div>

                </Box>
                {
                    error != '' ? <Snackbar
                        autoHideDuration={errorTimer}
                        open={open}
                        color='danger'
                        variant='solid'
                        onClose={(event, reason) => {
                            if (reason === 'clickaway') {
                                return;
                            }
                            setOpen(false);
                        }}
                    >
                        {error}
                    </Snackbar> : <></>
                }
                {
                    uploadSuccessfull ? <Snackbar
                        autoHideDuration={uploadTimer}
                        open={uploadSuccessfull}
                        color='success'
                        variant='solid'
                        onClose={(event, reason) => {
                            if (reason === 'clickaway') {
                                return;
                            }
                            // uploadSuccessfull = false;
                            setUploadSuccessfull(false);
                        }}
                    >
                        Post uploaded Successfully
                    </Snackbar> : <></>
                }

            </Box>
        </div>

    );
}
