import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import './Actions.css';
import { dbInstance } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";

function Actions({ userData, postData }) {
  const [like, setLikes] = useState(null);
  useEffect(() => {
    let check = postData.likes.includes(userData.uid);
    setLikes(check);
  }, [postData]);

  const handleLikeClick = async () => {
    if (like) {
      let arr = postData.likes.filter((userId) => (userData.uid != userId));
      let postRef = doc(dbInstance, 'posts', postData.postId);
      await updateDoc(postRef, {
        likes: arr
      })
    } else {
      let arr = [...postData.likes, userData.uid];
      let postRef = doc(dbInstance, 'posts', postData.postId);
      await updateDoc(postRef, {
        likes: arr
      })
    }
  }
  return (

    <div>
      {
        like != null ? <>
          {
            like != true ? <FavoriteBorderIcon onClick={handleLikeClick} className='unlike-styling-icon' fontSize='large' /> : <FavoriteIcon onClick={handleLikeClick} fontSize='large' className='like-styling-icon' />
          }
          <ChatBubbleOutlineIcon fontSize='large' className='icons' />
          <SendIcon fontSize='large' className='icons' />
        </> : <></>
      }
    </div>
  )
}

export default Actions
