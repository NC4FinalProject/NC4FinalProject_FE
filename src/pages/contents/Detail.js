import React from 'react'
import VideoPlayer from "../../components/organisms/contents/detail/VideoPlayer";
import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';
import ContentsDetail from '../../components/organisms/contents/detail/contentsDetail/ContentsDetail';
import ContentsInfo from '../../components/organisms/contents/detail/contentInfo/ContentsInfo';
import ReplyApp from '../../components/organisms/contents/detail/sideApp/ReplyApp';
import ListApp from '../../components/organisms/contents/detail/sideApp/ListApp';
import ChatApp from '../../components/organisms/contents/detail/sideApp/ChatApp';




// style
const ContainerStyle = styled(Container)(({ theme }) => ({
    padding: 0,
    paddingTop: theme.spacing(2),
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
    marginBottom: theme.spacing(2)
}));

const Detail = () => {
  return (
    <>
    <ContainerStyle maxWidth="lg">

        <GridStyle container spacing={3.75}>

            {/* Video */}

            <Grid item xs={12} lg={9}>

                {/* <Box sx={{ bgcolor: 'grey.300', height: '600px' }} /> */}

                <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%', // 16:9 비율 
                    '& > *': { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }, bgcolor: 'grey.300',  // 배경색 설정
                }}>
                    {/* 실제 콘텐츠를 여기에 배치 */}
                    <VideoPlayer />
                </Box>
            </Grid>

            {/* SideApp */}

            <Grid item xs={12} lg={3} >
                <Box sx={{ bgcolor: 'grey.300', 
                    borderRadius: '5px', 
                    // height: '100%',
                    // maxHeight: '70vh', // 최대 높이를 100%로 설정
                    // overflow: 'auto', // 내용이 넘치면 스크롤바가 나타나도록 설정
                    display: { xs: 'none', lg: 'block' },}} >
                    {/* <ChatApp></ChatApp> */}
                    {/* <ListApp></ListApp> */}
                    <ReplyApp></ReplyApp>
                </Box>
            </Grid>

        </GridStyle>

        <GridStyle container spacing={3.75}>

        {/* ContentsDetail */}

        <Grid item xs={8} lg={9}>
            {/* <ContentsInfo></ContentsInfo> */}
            <ContentsDetail></ContentsDetail>
        </Grid>

        {/* ContentsPrice */}

        <Grid item xs={4} lg={3}>
            {/* <Box sx={{position: 'sticky', top: '10%'}}>
                <Box sx={{ bgcolor: 'grey.300', borderRadius: '5px', height: '25vh'}}>88,000원</Box>
            </Box> */}
        </Grid>

        </GridStyle>
    </ContainerStyle>
    </>
  );
}

export default Detail;