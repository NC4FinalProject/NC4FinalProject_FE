import React, { useEffect, useRef, useState } from 'react';

function VideoThumbnail({ videoUrl, captureTime }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.crossOrigin = "anonymous"; // 여기에 crossOrigin 속성 적용
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.currentTime = captureTime;
    });

    video.addEventListener('seeked', () => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataURL = canvas.toDataURL();
      setThumbnail(imageDataURL);
    });
    console.log(thumbnail);
    console.log("뭐야아아아아아")
  }, [videoUrl, captureTime]); // 의존성 배열에 videoUrl 추가

  return (
    <>
      <video ref={videoRef} src={videoUrl} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {thumbnail && <img src={thumbnail} alt="Video Thumbnail" />}
    </>
  );
}


export default VideoThumbnail;
