import React, { useEffect, useState } from 'react';
import { dbInstance } from '../firebase';
import { doc, onSnapshot } from "firebase/firestore";
import { query, orderBy, limit, collection } from "firebase/firestore"; 
import Video from './Video';
import CircularProgress from '@mui/material/CircularProgress';
import './Posts.css';

function Posts(props) {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        const docRef = collection(dbInstance, "posts");
        const q = query(docRef, orderBy("createdAt", "desc"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let postsArr = [];
            querySnapshot.forEach((doc) => {
                let data = { ...doc.data(), postId:doc.id };
                postsArr.push(data);
            });
            setPosts(postsArr);
        })
    },[])
  return (
    <div className='feed-wrapper'>
        {
              posts != null ? <div className='all-videos-wrapper'>{
                  posts.map((post, index) => (
                      <React.Fragment key={index}>
                          <div className='video-section'>
                              <Video src={post.pURL} userData={props.userData} postData={post}></Video>
                          </div>
                      </React.Fragment>
                  ))
              }
                </div>
                :< CircularProgress />
          }
          <div className='suggestion-wrapper'>Suggestion component here</div>
    </div>
  )
}

export default Posts
