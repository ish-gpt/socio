import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Feed.css';
import Drawer from '@mui/material/Drawer';
import './NavigationSection.css'
import insta from '../images/App-Logo-1.png';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';

const drawerWidth = 70;

export default function NavigationSection() {
    let IconsArr = [<SearchIcon />, <ExploreOutlinedIcon />, <SlideshowOutlinedIcon />, <FavoriteBorderIcon />, <></>, <AccountCircleOutlinedIcon />]

    function handleUploadReel() {
        console.log("Handle upload will not work from here. Although we can implement same way as feed.js section")
    }

    return (
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
                <div className='insta-logo-wrapper'>
                    <img className='insta-logo' src={insta} alt='ig-logo'></img>
                </div>
            </Toolbar>
            <List>
                {['Search', ' Explore', 'Reel', 'Notification', 'Create', 'Profile'].map((text, index) => (
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
                        </ListItemButton>

                    </ListItem>

                ))}
                <Link to='/inbox' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem sx={{ marginBottom: 2 }} disablePadding>
                        <ListItemButton component='label'>
                            <ListItemIcon style={{ color: 'black' }}>
                                <ChatBubbleOutlineIcon />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem sx={{ marginBottom: 2 }} disablePadding>
                        <ListItemButton component='label'>
                            <ListItemIcon style={{ color: 'black' }}>
                                <HomeIcon />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
        </Drawer>
    )
}
