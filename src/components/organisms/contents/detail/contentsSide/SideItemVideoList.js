import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Avatar, Box, Card, CardMedia, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import VideoThumbnail from '../video/VideoThumbnail';
import { useVideoUrlStore } from '../../../../../stores/ContentsStore';
import VideoDuration from '../video/VideoDuration';



///Enable, Disable
const GridContainerStyle = styled(Grid)(({ theme }) => ({
  display: "flex",
}));

const SideItemVideoList = (props) => {

  const theme = useTheme();
  const videoRef = useRef(null);
  const { videoBaceURL } = useVideoUrlStore();
  const [videoSrc, setVideoSrc] = useState();

  useEffect(() => {
    if(props.videoPath !== null){
      setVideoSrc(videoBaceURL + props.videoPath)
      console.log(videoSrc)
      console.log("또 못가져오냐?")
    }
  }, [videoSrc]);

  // const [duration, setDuration] = useState(null);

  // useEffect(() => {
  //   // 비디오 요소 생성
  //   const video = document.createElement('video');
  //   video.src = videoSrc;
  //   video.crossOrigin = 'anonymous'; // CORS 정책 준수

  //   // 메타데이터 로드 완료 시 비디오 길이 설정
  //   const onLoadedMetadata = () => {
  //     setDuration(video.duration);
  //     video.remove(); // 비디오 요소 제거
  //   };

  //   video.addEventListener('loadedmetadata', onLoadedMetadata);

  //   // 컴포넌트 언마운트 시 이벤트 리스너 제거
  //   return () => {
  //     video.removeEventListener('loadedmetadata', onLoadedMetadata);
  //   };
  // }, [videoSrc]);


  return (
    <GridContainerStyle

      sx={{ paddingLeft: 0.1, paddingY: 0.7, 

      ':hover': {backgroundColor: props.isSelected ? "" :theme => theme.palette.action.hover, cursor: 'pointer'}, 
      backgroundColor: props.isSelected ? theme.palette.action.selected : "transparent",

      }} onClick={props.onItemSelect} >
        
      <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{color:"#585858"}}variant='caption' paddingX={0.5}>{props.count +1}</Typography>
      </Grid>

      <Grid item >
        <Link to="/" component={Link} underline="hover" color="inherit">
          <CardMedia
            component="img"
            image="" 
            alt={props.title}
            sx={{
              // width: '100%', 
              // height: '100%',
              width: theme => theme.spacing(5.5),
              height: theme => theme.spacing(5.5),
              borderRadius: '0.4rem', 
            }} />
            {/* url을 받아와야 하는데..? 전역상태관리로 가야하나? 섬네일 하나때문에? */}
            {/* <VideoThumbnail videoUrl={videoSrc} captureTime={1} />       */}
        </Link>
      </Grid>
      
      
      
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
            {/* {duration.toFixed(2)} */} 00:14
          </Typography>
          {/* <VideoDuration videoUrl={videoSrc}></VideoDuration> */}
        </Grid>
        
      </Grid>

    </GridContainerStyle>
  );
};

export default SideItemVideoList;
