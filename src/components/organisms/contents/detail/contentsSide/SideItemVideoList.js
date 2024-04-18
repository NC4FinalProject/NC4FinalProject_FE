import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Avatar, Box, Card, CardMedia, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import VideoThumbnail from '../video/VideoThumbnail';
import { useVideoAddInfoStore } from '../../../../../stores/ContentsStore';
import VideoDuration from '../video/VideoDuration';



///Enable, Disable
const GridContainerStyle = styled(Grid)(({ theme }) => ({
  display: "flex",
}));

const formatDuration = (seconds) => {
  // 분과 초를 계산
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // 두 자리수로 포맷팅
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
};

const SideItemVideoList = (props) => {

  const theme = useTheme();
  const videoRef = useRef(null);

  const { videoBaceURL, durationList, setDurationList, videoTotalDuration, videoDuration, getVideoTotalDuration, setVideoTotalDuration } = useVideoAddInfoStore();

  const [videoSrc, setVideoSrc] = useState();
  const [duration, setDuration] = useState();



  useEffect(() => {
    // props.videoPath가 유효한지 확인
    if (props.videoPath) {
      const fullVideoUrl = videoBaceURL + props.videoPath;
      setVideoSrc(fullVideoUrl); // videoSrc 상태 업데이트
  
      const video = document.createElement('video');
      video.src = fullVideoUrl; // 직접 fullVideoUrl을 할당
  
      video.addEventListener('loadedmetadata', () => {
        setDuration(video.duration); // 재생 시간 설정;
        // setVideoTotalDuration(videoTotalDuration + Number(video.duration));
      });  
      // 메타데이터 로드를 위해 비디오 요소를 문서에 추가할 필요는 없음
      // 하지만 필요하다면 video.play() 같은 작업을 수행하기 전에 할 수 있음
      // getVideoTotalDuration(videoDuration+videoTotalDuration)
      // console.log("111111111111111111")
      // console.log(videoTotalDuration)
    }
  }, [props.videoPath, videoSrc, duration]); // 의존성 배열에 videoBaceURL 추가

  useEffect(() => {
    if(duration)
      setDurationList(duration);
  }, [duration]);

  return (
    <GridContainerStyle

      sx={{ paddingLeft: 0.1, paddingY: 0.7, 

      ':hover': {backgroundColor: props.isSelected ? "" :theme => theme.palette.action.hover, cursor: 'pointer'}, 
      backgroundColor: props.isSelected ? theme.palette.action.selected : "transparent",

      }} onClick={props.onItemSelect} >
        
      <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{color:"#585858"}}variant='caption' paddingX={0.5}>{props.count +1}</Typography>
      </Grid>

      {/*<Grid item >*/}
      {/*  <Link to="/" component={Link} underline="hover" color="inherit">*/}
      {/*    <CardMedia*/}
      {/*      component="img"*/}
      {/*      image="" */}
      {/*      alt={props.title}*/}
      {/*      sx={{*/}
      {/*        // width: '100%', */}
      {/*        // height: '100%',*/}
      {/*        width: theme => theme.spacing(5.5),*/}
      {/*        height: theme => theme.spacing(5.5),*/}
      {/*        borderRadius: '0.4rem', */}
      {/*      }} />*/}
      {/*      /!* url을 받아와야 하는데..? 전역상태관리로 가야하나? 섬네일 하나때문에? *!/*/}
      {/*      /!* <VideoThumbnail videoUrl={videoSrc} captureTime={1} />       *!/*/}
      {/*  </Link>*/}
      {/*</Grid>*/}
      
      
      
      {/* <video ref={videoRef} style={{ display: 'none' }} src={videoUrl} crossOrigin="anonymous" /> */}
      <Grid item xs={9}  paddingX={0.5} >
        
        <Grid sx={{ 
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal', }}>
          
          {/* 내용 @행간 줄임이요 */}
          <Typography sx={{ fontSize: '0.85rem', lineHeight: '1.15' }} component="p">
            {props.videoTitle}
          </Typography>
        </Grid>
        
        {/* 타임 */}
        <Grid>
          <Typography sx={{ color: "#A4A4A4", fontSize: '0.7rem', lineHeight: '1.10' }} component="p">
            {/* {duration.toFixed(2)} 00:14 */}
            {formatDuration(duration)}
            {/* {duration} */}
          </Typography>
          {/* <VideoDuration videoUrl={videoSrc}></VideoDuration> */}
        </Grid>
        
      </Grid>

    </GridContainerStyle>
  );
};

export default SideItemVideoList;
