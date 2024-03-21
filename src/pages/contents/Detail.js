import React from 'react'
import VideoPlayer from "../../components/organisms/contents/detail/VideoPlayer";
import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';
import ContentsDetail from '../../components/organisms/contents/detail/ContentsDetail';
import ContentsInfo from '../../components/organisms/contents/detail/ContentsInfo';
import { ListApp } from '../../components/organisms/contents/detail/sideApp/ListApp';


const GridStyle = styled(Grid)(({ theme }) => ({
    // marginTop: theme.spacing(0),
    marginBottom: theme.spacing(2)
}));

const Detail = () => {
  return (
    <>
    <Container>

        <GridStyle container spacing={3.75} height={'524px'} overflow={'hidden'} alignItems="stretch">
            
            {/* Video */}
            <Grid item xs={12} lg={9}>
                <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%', 
                '& > *': { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }, bgcolor: 'grey.300'}}>
                    <VideoPlayer />
                </Box>
            </Grid>

            {/* overflowY: 'scroll', */}
            {/* overflowY: 'auto' // 내용이 더 많아지면 스크롤 */}
            {/* SideApp */}
            <Grid item xs={12} lg={3} >
                <Box sx={{ bgcolor: 'grey.300', borderRadius: '5px', display: { xs: 'none', lg: 'block', height: '100%' },}} >
                    {/* <ChatApp></ChatApp> */}
                    <ListApp></ListApp>
                    {/* <ReplyApp></ReplyApp> */}
                </Box>
            </Grid>

        </GridStyle>

        <GridStyle container spacing={3.75}>

        {/* ContentsDetail */}
        <Grid item xs={8} lg={9}>
            <ContentsInfo></ContentsInfo>
            <ContentsDetail></ContentsDetail>
        </Grid>

        {/* ContentsInfo */}
        <Grid item xs={4} lg={3}>
            <Box sx={{
                position: 'sticky',
                top: '10%', // 뷰포트 상단에서 50px 아래에 위치하도록 설정
                // backgroundColor: 'lightblue',
                // padding: '10px',
                // margin: '20px 0',
            }}>
                <Box sx={{ bgcolor: 'grey.300', borderRadius: '5px', height: '25vh'}}>
                    88,000원
                </Box>
            </Box>
        </Grid>

        </GridStyle>
    </Container>
    </>
  );
}

export default Detail;