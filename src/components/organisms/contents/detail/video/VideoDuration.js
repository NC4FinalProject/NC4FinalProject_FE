import React, { useState, useEffect } from 'react';

function VideoDuration({ videoUrl }) {
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    // 비디오 요소 생성
    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = 'anonymous'; // CORS 정책 준수

    // 메타데이터 로드 완료 시 비디오 길이 설정
    const onLoadedMetadata = () => {
      setDuration(video.duration);
      video.remove(); // 비디오 요소 제거
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [videoUrl]);

  return (
    <div>
      {duration ? `Video Duration: ${duration} seconds` : 'Loading video duration...'}
    </div>
  );
}

export default VideoDuration;
