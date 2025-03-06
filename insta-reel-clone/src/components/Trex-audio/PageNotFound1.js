import React, { useEffect, useRef } from 'react';
import trex from '../../images/T-Rex-Dino.png';
import desert from '../../images/desert-t-rex.png';
import './PageNotFound.css';

export default function PageNotFound1() {
    const dinoImgRef = useRef(null);
    const canvaRef = useRef(null);
    let context, maxAmp = 0, height;
    let myGamePiece, CanvaAnimationId, SoundAnimationId;
    let lineSpeed = 5, obstacleSpeed = 5;
    useEffect(() => {
        return () => {
            // navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
            //     console.log('Microphone Permission Removed');
            // })
        }
    }, []);

    setInterval(() => {
        lineSpeed += 0.3;
        obstacleSpeed += 0.3;
    }, 10000);

    useEffect(() => {
        myGamePiece = new component(36, 36, 'red', 10, canvaRef.current.height - 90);

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
                    analyser.getByteTimeDomainData(dataArray);
                    let maxAmplitude = 0;
                    for (let i = 0; i < dataArray.length; i++) {
                        const amplitude = dataArray[i];
                        if (amplitude > maxAmplitude) {
                            maxAmp = amplitude;
                        }
                    }
                    accelerate(maxAmp);
                    SoundAnimationId = requestAnimationFrame(draw);
                }

                draw()
                console.log('Microphone Permission Granted');
            }).catch(() => {

            });
        }




        let baseLine = new LineComponent(0, canvaRef.current.height - 50, canvaRef.current.width, canvaRef.current.height - 50);
        let obstacle = new component(80, 20, 'blue', canvaRef.current.width, canvaRef.current.height - 130)
        let frameNo = 0;
        let lineArr = [];
        let ObstacleArr = [];
        let random;
        for (let start = 1; start < canvaRef.current.width; start += (random + 30)) {
            random = (Math.random() * 10) + 25;
            lineArr.push(new LineComponent(start, (canvaRef.current.height - 50) + random, start + random, (canvaRef.current.height - 50) + random));
        }

        // *********Function To move Red Game Square*****
        /*
        function updatePosition() {
            if (myGamePiece.x > (canvaRef.current.width)) {
                context.clearRect(0, 0, canvaRef.current.width, canvaRef.current.height);
                myGamePiece.x = 0;
                myGamePiece.update();
            }
            context.clearRect(0, 0, canvaRef.current.width, canvaRef.current.height);
            myGamePiece.x += 1;
            myGamePiece.update();
            requestAnimationFrame(updatePosition);
            let baseLine = new LineComponent(0, canvaRef.current.height - 50,canvaRef.current.width, canvaRef.current.height - 50);
        }
        updatePosition();
        */

        function AfterEveryNFrame(N) {
            if ((frameNo / N) % 15 == 0) return true;
            return false;
        }



        // *********Function To move small small lines *****
        function updateLinesPosition() {
            frameNo++;
            context.clearRect(0, 0, canvaRef.current.width, canvaRef.current.height);
            // myGamePiece = new component(36, 36, 'red', 10, canvaRef.current.height - 90 );

            if (AfterEveryNFrame(Math.floor(Math.random() * 100)) || frameNo === 1) {
                ObstacleArr.push(new component(80, 20, 'blue', canvaRef.current.width, canvaRef.current.height - 130));
            }

            for (let lineNo = 0; lineNo < lineArr.length; lineNo++) {
                random = (Math.random() * 10) + 20;
                if (lineArr[lineNo].eX < 0) {
                    lineArr[lineNo].sX = canvaRef.current.width + 3;
                    lineArr[lineNo].sY = (canvaRef.current.height - 50) + random;
                    lineArr[lineNo].eX = canvaRef.current.width + random;
                    lineArr[lineNo].eY = (canvaRef.current.height - 50) + random;
                    lineArr[lineNo].update();
                }
                lineArr[lineNo].sX -= lineSpeed;
                lineArr[lineNo].eX -= lineSpeed;
                lineArr[lineNo].update();
            }

            for (let obsNo = 0; obsNo < ObstacleArr.length; obsNo++) {
                ObstacleArr[obsNo].x -= obstacleSpeed;
                ObstacleArr[obsNo].update();

                if (ObstacleArr[obsNo].x < -10) { // to prevent the array from overloading as we are only pushing the obstacle in array and not removing it.
                    ObstacleArr.splice(obsNo, 1);   // so here taking care of removing the element when no longer in frame.
                }
            }
            let baseLine = new LineComponent(0, canvaRef.current.height - 50, canvaRef.current.width, canvaRef.current.height - 50);
            myGamePiece.newPosition();
            myGamePiece.update();
            CanvaAnimationId = requestAnimationFrame(updateLinesPosition);
            if (myGamePiece.isCollidedWithObstacle(ObstacleArr)) {
                cancelAnimationFrame(CanvaAnimationId);
                cancelAnimationFrame(SoundAnimationId)
            }

        }

        updateLinesPosition();

    }, []);



    function LineComponent(startX, startY, endX, endY) {
        this.sX = startX;
        this.sY = startY;
        this.eX = endX;
        this.eY = endY;
        this.width = endX - startX;

        context = canvaRef.current.getContext('2d');
        context.beginPath();
        context.moveTo(this.sX, this.sY);
        context.lineTo(this.eX, this.eY);
        context.lineWidth = 2;
        context.stroke();

        this.update = function () {
            context.beginPath();
            context.moveTo(this.sX, this.sY);
            context.lineTo(this.eX, this.eY);
            context.lineWidth = 2;
            context.stroke();
        }
    }

    // So basically - we take the max Amp of our sound and with that we see if sound is zero or not which in our case 
    // is [n-128 <= 1] if this the case we want gampiece to be at bottom means positive gravity
    // and if difference is greater than 1 mean user is making some noise then we have to move our
    // game piece above means negative gravity value. And here we define our gravityFactor as gravityFactor = n / 1024;

    function accelerate(n) {
        let gravityFactor = n / 255;
        if (Math.abs(n - 128) <= 1) {
            myGamePiece.gravity = 0.3; // increase this value to make gamePiece fall fast/
        } else {
            myGamePiece.gravity = -gravityFactor // increase this value to make gamePiece rise fast/ 
        }
    }

    function component(height, width, color, x, y) {
        this.y = y;
        this.x = x;
        this.width = width
        this.height = height;
        this.SpeedX = 0;
        this.SpeedY = 0;
        this.gravity = 0;
        this.gravitySpeed = 0;
        context = canvaRef.current.getContext('2d');
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height);
        this.update = function () {
            context.fillStyle = color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
        this.newPosition = function () {
            this.gravitySpeed += this.gravity;
            this.x += this.SpeedX;
            this.y += this.SpeedY + this.gravitySpeed;
            this.isBottomReached();
            this.isTopReached();
        }
        this.isBottomReached = function () {
            var groundBottom = canvaRef.current.height - 90;
            if (this.y > groundBottom) {
                this.y = groundBottom;
                this.gravitySpeed = 0;
            }
        }
        this.isTopReached = function () {
            if (this.y <= 0) {
                this.y = 0
                this.gravitySpeed = 0.5;
            }
        }
        this.isCollidedWithObstacle = function (ObstacleArr) {
            for (let indx = 0; indx < ObstacleArr.length; indx++) {
                let myRight = this.x + this.width;
                let myBottom = this.y + this.height;
                let myTop = this.y;
                let myLeft = this.x;
                let othersLeft = ObstacleArr[indx].x;
                let othersTop = ObstacleArr[indx].y
                let othersBottom = ObstacleArr[indx].y + ObstacleArr[indx].height;
                let othersRight = ObstacleArr[indx].x + ObstacleArr[indx].width;

                let crash = true;
                if ((myRight + 2 < othersLeft) || (myBottom + 2 < othersTop)) {
                    crash = false;
                }
                return crash;
            }
        }
    }



    return (
        <div id='soundbar'>
            <div className='canvas-wrapper'>
                <canvas ref={canvaRef} id="myCanvas" width={window.innerWidth - 100} height={window.innerHeight / 2} style={{ border: '3px solid black', margin: '22px' }}></canvas>
            </div>
        </div>
    )
}
