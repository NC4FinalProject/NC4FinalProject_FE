import React from 'react'

const VideoPlayer = () => {
  return (
    <>
        <video
            id="my-video"
            className="video-js vjs-default-skin"
            controls
            // preload="auto"
            // width="640"
            // height="264"
            // poster="MY_VIDEO_POSTER.jpg"
            preload="auto"
            poster="MY_VIDEO_POSTER.jpg"

            data-setup="{}"
            style={{ width: '100%', height: '100%' }} // 스타일 추가
        >
            <source src="MY_VIDEO.mp4" type="video/mp4" />
            <source src="MY_VIDEO.webm" type="video/webm" />
            <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
            </p>
        </video>
        <script src="https://vjs.zencdn.net/8.10.0/video.min.js"></script>

    </>
  )
}

export default VideoPlayer;