import { Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import ThumbnailUpload from './ThumbnailUpload'
import VideoUpload from './VideoUpload'
import CoTypography from '../../../atoms/common/CoTypography'


const ChapterOne = () => {
  return (
  <>
    <Grid container justifyContent="center"  sx={{ marginTop: 2, marginBottom: 2 }}>
        <Grid item xs={2} />

        <Grid item xs={1} style={{ display: 'flex', alignItems: 'center' }}>
            <CoTypography size="Title">강의명</CoTypography>
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="standard-basic" variant="standard" />
        </Grid>
        <Grid item xs={3} />
    </Grid>

    <Grid container justifyContent="center" sx={{ marginTop: 2, marginBottom: 2 }}>
      <Grid item xs={2} />
      <Grid item xs={1}>
        <CoTypography size="Title">썸네일</CoTypography>
      </Grid>
      <Grid item xs={6}>
        <ThumbnailUpload />
      </Grid>
      <Grid item xs={3} />
    </Grid>

    <Grid container justifyContent="center" sx={{ marginTop: 2, marginBottom: 2 }}>
      <Grid item xs={2} />
      <Grid item xs={1}>
        <CoTypography size="Title">동영상</CoTypography>
      </Grid>
      <Grid item xs={6}>
        <VideoUpload />
      </Grid>
      <Grid item xs={3} />
    </Grid>
  </>
  )
}

export default ChapterOne