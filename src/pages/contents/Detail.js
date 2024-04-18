import React, { useEffect, useState } from 'react'
import VideoPlayer from "../../components/organisms/contents/detail/video/VideoPlayer";
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';

import { useTheme } from '@emotion/react';
import ContentsDetail from "../../components/organisms/contents/detail/contentsDetail/ContentsDetail";
import ContentsPrice from '../../components/organisms/contents/detail/contentsPrice/ContentsPrice';
import ContentsSide from '../../components/organisms/contents/detail/contentsSide/ContentsSide';
import ContentsInfo from '../../components/organisms/contents/detail/contentsInfo/ContentsInfo';
import { useContentsCountStateStore, useContentsStore } from '../../stores/ContentsStore';
import { useParams } from "react-router-dom";

// style
const ContainerStyle = styled(Container)(({ theme }) => ({
    padding: 0,
    paddingTop: theme.spacing(5),
    // display: 'flex',
    // flexDirection: 'column',
  
    // product header
    // h3
    // "& .productHeader": {
    //   fontSize: 30,
    //   fontWeight: 500,
    // },
  }));

const GridStyle = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0.7),
  }));
  
const BoxLineStyle = styled(Box)(({ theme }) => ({
    position: "sticky",
    top: "10%",
    borderLeft: `1px solid ${theme.palette.divider}`, // 구분선 색상과 굵기를 MUI 기본값에 맞춤
    // '&:hover': {
    //     borderColor: theme.palette.primary.main, // 호버 시 테마의 primary 색상으로 변경
    //     borderLeft: `2px solid ${theme.palette.primary.main}`,
    // }
}));

const Detail = () => {

    const { contentsId } = useParams();

    const theme = useTheme();

    const { fetchContents, getContents, getVideo, getContentsOutput,
            stateNum } = useContentsStore();
    const { getCountState } = useContentsCountStateStore();



    useEffect(() => {
        const adjustHeight = () => {
          const videoBox = document.querySelector('.video-box');
          const sideApp = document.querySelector('.side-app');
    
          if (videoBox && sideApp) {
            const videoBoxHeight = videoBox.offsetHeight;
            sideApp.style.height = `${videoBoxHeight}px`;
          }
        };
        const url = new URL(window.location.href);
        const pathSegments = url.pathname.split('/');
        const contentsId = pathSegments.pop() || '기본값';
        ////////////////////////////////////////////////////
        getContentsOutput(contentsId);
        ////////////////////////////////////////////////////
        window.addEventListener('resize', adjustHeight);
        adjustHeight(); // 초기 설정을 위해 한 번 호출
        return () => window.removeEventListener('resize', adjustHeight); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    }, []);

  return (
    <>
    <ContainerStyle>

        <GridStyle container >

            {/* Video */}
            <Grid item xs={12} lg={9}>
                {/* <Box sx={{ bgcolor: 'grey.300', height: '600px' }} /> */}
                <Box className="video-box" sx={{ position: 'relative', width: '100%', paddingTop: '56.25%', // 16:9 비율 
                    '& > *': { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }, bgcolor: 'grey.300',
                }}>
                    <VideoPlayer />
                </Box>
            </Grid>

            {/* SideApp */}
            <Grid className="side-app" item xs={12} lg={3} sx={{paddingLeft: 3.75}}>
            {/* sx={{ bgcolor: 'grey.300', borderRadius: '5px', display: { xs: 'none', lg: 'block' }, }} */}
                <Grid sx={{ height: '100%'}}> 
                    <ContentsSide/>
                </Grid>
            </Grid>
        </GridStyle>

        <GridStyle container >

            {/* ContentsDetail */}
            <Grid item xs={9} lg={9}>

                {/* ContentInfo */}
                <ContentsInfo
                    countState={getCountState}
                    contents={getContents}
                    video={getVideo}
                    color="rgb(145, 158, 171)"
                />
                {/* ContentsDetail */}
                <ContentsDetail/>

            </Grid>

            {/* ContentsPrice */}
            <Grid item xs={3} lg={3} sx={{paddingLeft: 3.75, paddingTop: 3.75}}>
                <Grid position='sticky' top='10%' sx={{borderLeft: `1px solid ${theme.palette.divider}`}}>
                    <ContentsPrice contentsId={contentsId} bookmarkCount={getContents.bookmarkCount} reviewRating={getContents.reviewRating} reviewCount={getContents.reviewCount}/>
                </Grid>
            </Grid>

        </GridStyle>
    </ContainerStyle>
    </>
  );
}

export default Detail;