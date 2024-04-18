import React, { useEffect, useRef, useState } from 'react'
import { useContentsStore, useVideoAddInfoStore } from '../../../../../stores/ContentsStore';

const VideoPlayer = () => {

  const videoRef = useRef(null); // 비디오 요소를 참조하기 위한 ref 생성

  const { getVideo, stateNum, stateNumChange } = useContentsStore();
  const { videoBaceURL, videoURL, getVideoURL } = useVideoAddInfoStore();

  const [videoSrc, setVideoSrc] = useState();

  useEffect(()=>{
    stateNumChange(1);
  },[])

  useEffect(() => {
    if (getVideo && getVideo.length > 0 && stateNum > 0 && stateNum <= getVideo.length) {
        const videoSrc = videoBaceURL + getVideo[stateNum - 1].videoPath;
        setVideoSrc(videoSrc);
        getVideoURL(videoSrc)
        console.log("''''''''''''''''");
        console.log(`"${videoSrc}"`)
        console.log(`"${stateNum}"`)
        console.log("''''''''''''''''");
    } else {
        console.error("getVideo 배열이 비어 있거나 stateNum 값이 적절하지 않습니다.");
    }
}, [getVideo, stateNum]);

  useEffect(() => {
    // 사용자가 설정한 볼륨 불러오기 (저장되지 않았다면 기본값 0.5로 설정)
    const savedVolume = localStorage.getItem('userVolume') || 0.5;
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.volume = savedVolume; // 볼륨 설정 
      // videoElement.play().catch(error => console.error("Auto-play failed", error)); // 자동 재생 시도
    } 
    const handleVolumeChange = () => { // 볼륨 변경 감지 이벤트 핸들러
      localStorage.setItem('userVolume', videoElement.volume.toString()); // 현재 볼륨 저장
    };
    videoElement.addEventListener('volumechange', handleVolumeChange);
    return () => {
      videoElement.removeEventListener('volumechange', handleVolumeChange);
    };

  }, [videoSrc]);

  return (
    <>
      <video
        key={videoSrc}
        ref={videoRef} // ref 사용
        id="my-video"
        className="video-js vjs-default-skin"
        controls
        preload="auto"
        poster="MY_VIDEO_POSTER.jpg"
        data-setup="{}"
        style={{ width: '100%', height: '100%' }}
      >
      
        <source src={videoSrc} type="video/mp4" />      
      
        <p className="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
        </p>
      </video>
      <script src="https://vjs.zencdn.net/8.10.0/video.min.js"></script>
      {/* <button onClick={test}></button> */}
    </>
  )
}

export default VideoPlayer;