import styled from '@emotion/styled';
import { Button, Container, Grid, Input, TextField, Typography } from '@mui/material';
import React from 'react'
import SectionList from '../../components/organisms/contents/insert/SectionList.';
import LinearStepper from '../../components/organisms/contents/insert/LinearStepper';
import InsertCKEditor from '../../components/atoms/common/InsertCKEditor';
import ThumbnailUpload from '../../components/organisms/contents/insert/ThumbnailUpload';
import VideoUpload from '../../components/organisms/contents/insert/VideoUpload';

// style
const ContainerStyle = styled(Container)(({ theme }) => ({
  // padding: 0,
  // paddingTop: theme.spacing(2),
  // justifyContent: "center",

  // product header
  // h3
  "& .productHeader": {
    fontSize: 30,
    fontWeight: 500,
  },
}));


const Insert = () => {
  return (
    <>


    {/* spacing={2} */}

    <ContainerStyle maxWidth="lg">

    <Grid item xs={12} sm={8} md={8}>
      <LinearStepper />
    </Grid>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={2} />
        <Grid item xs={1}>
          <Typography>강의명</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="standard-basic" variant="standard" />
        </Grid>
        <Grid item xs={3} />
      </Grid>

      <Grid container justifyContent="center">
        <Grid item xs={2} />
        <Grid item xs={1}>
          <Typography>썸네일</Typography>
        </Grid>
        <Grid item xs={6}>
          <ThumbnailUpload />
        </Grid>
        <Grid item xs={3} />
      </Grid>

      <Grid container justifyContent="center">
        <Grid item xs={2} />
        <Grid item xs={1}>
          <Typography>동영상</Typography>
        </Grid>
        <Grid item xs={6}>
          <VideoUpload />
        </Grid>
        <Grid item xs={3} />
      </Grid>

      <Grid container justifyContent="center">
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Typography>강의 소개</Typography>
          <InsertCKEditor />
        </Grid>
        <Grid item xs={2} />
      </Grid>

      <Grid container justifyContent="center">
        <Grid item xs={2} />
        <Grid item xs={1}>
          <Typography>강의 코스</Typography>
        </Grid>
        <Grid item xs={6}>
          <SectionList />
        </Grid>
        <Grid item xs={3} />
      </Grid>

    </ContainerStyle>
    </>
    
  )
}

export default Insert;
