import React, { useEffect, useRef } from 'react';
import trex from '../../images/T-Rex-Dino.png';
import desert from '../../images/desert-t-rex.png';
import './PageNotFound.css';

export default function PageNotFound() {
  const dinoImgRef = useRef(null);
  const canvaRef = useRef(null);
  useEffect(() => {
    let soundbar = document.getElementById('soundbar');
    // soundbar.style.height = '40px';
    // soundbar.style.width = '40px';
    // soundbar.style.backgroundColor = 'red'
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((audioMediaStream) => {
        const audioContext = new AudioContext();
        const audioSource = audioContext.createMediaStreamSource(audioMediaStream);

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        audioSource.connect(analyser);

        setInterval(() => {

        }, 200)

        function draw() {
          // analyser.getByteTimeDomainData(dataArray);
          // let maxAmplitude = 0;
          // for (let i = 0; i < dataArray.length; i++) {
          //   const amplitude = dataArray[i]; 
          //   if (amplitude > maxAmplitude) {
          //     maxAmplitude = amplitude;
          //   }
          // }
          // soundbar.style.height = (maxAmplitude-128) + 'px'
          // soundbar.style.width = 50+'px'
          // requestAnimationFrame(draw);
        }

        requestAnimationFrame(draw)
        console.log('Microphone Permission Granted');
      }).catch(() => {

      });
      console.log("----------");
    }

    return () => {
      // navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
      //     console.log('Microphone Permission Removed');
      // })
    }
  }, []);

  useEffect(() => {
    const ctx = canvaRef.current.getContext("2d");
    // createStructure(ctx);
    createStructure();

    function createStructure() {
      console.log("________________", window.devicePixelRatio);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 2 * window.innerWidth, window.innerHeight);

      ctx.beginPath();
      ctx.moveTo(0, 820);
      ctx.lineTo(2 * window.innerWidth, 820);
      ctx.stroke();
      let random;
      for (let canvaX = 1; canvaX < 2 * window.innerWidth; canvaX += (random + 30)) {
        random = (Math.random() * 10) + 25;
        // console.log(random);

        ctx.beginPath();
        ctx.moveTo(canvaX, 820 + random);
        ctx.lineTo(canvaX + random, 820 + random);
        ctx.lineWidth = 2;
        ctx.stroke();
      }

    }

    // dinoImgRef.current.addEventListener("load", (e) => {
    //   console.log("Loaded")
    //   ctx.drawImage(dinoImgRef.current, 0,0, window.innerWidth,window.innerHeight);
    // });
  }, []);



  return (
    <div id='soundbar'>
      <div style={{display:'none'}} >
        <img ref={dinoImgRef} id='t-rex' height="100%" width="100%" src={desert}></img>
      </div>
      <div className='canvas-wrapper'>
        <canvas ref={canvaRef} id="myCanvas" width={2*window.innerWidth} height={window.innerHeight} style={{}}></canvas>
      </div>
    </div>
  )
}
