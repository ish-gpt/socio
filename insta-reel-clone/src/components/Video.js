import React,{useRef} from 'react';
import './Video.css';
import Actions from './Actions';

function Video(props) {
  const divRef = useRef(null);
  function handleScroll () {
    let next = divRef.current.parentElement.nextElementSibling;
    if (next) {
      next.scrollIntoView();
    }
  }
  return (
    <div ref={divRef} className='videos-wrapper'>
      <div className='insta-video-wrapper'>
        <video onEnded={handleScroll} src={props.src} controls className='insta-video'></video>
      </div>
      <div style={{paddingLeft:'31%'}}>
        <Actions userData={props.userData} postData={props.postData} />
      </div>
    </div>
  )
}

export default Video
