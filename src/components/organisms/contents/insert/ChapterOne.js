import { Button, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import UploadImage from './UploadImage'
import UploadVideo from './UploadVideo'
import CoTypography from '../../../atoms/common/CoTypography'
import styled from 'styled-components'

const CustomTextField = styled(TextField)({
  '& .MuiInput-input::placeholder': {
    fontSize: '0.9rem', // 원하는 글자 크기로 조정
  },
  '& .MuiInput-input': {
    textAlign: 'center', // 입력 필드 텍스트를 수평 중앙 정렬
    // 필요하다면 lineHeight도 조정할 수 있음
  },
});

const ChapterOne = () => {
  return (
  <>
    <Grid container justifyContent="center"  sx={{ marginTop: 2, }}>
        <Grid item xs={2} />

        <Grid item xs={1} style={{ display: 'flex', alignItems: 'center' }}>
            <CoTypography size="Title">컨텐츠</CoTypography>
        </Grid>
        <Grid item xs={6}>
          <CustomTextField fullWidth id="standard-basic" variant="standard" placeholder='컨텐츠 제목을 입력하세요.'/>
        </Grid>
        <Grid item xs={3} />
    </Grid>

    <Grid container justifyContent="center" >
      <Grid item xs={2} />
      <Grid item xs={1} style={{ display: 'flex', alignItems: 'center' }}>
        <CoTypography size="Title">썸네일</CoTypography>
      </Grid>
      <Grid item xs={6}>
        <UploadImage />
      </Grid>
      <Grid item xs={3} />
    </Grid>

    <Grid container justifyContent="center" >
      <Grid item xs={2} />
      <Grid item xs={1} style={{ display: 'flex', alignItems: 'center' }}>
        <CoTypography size="Title">동영상</CoTypography>
      </Grid>
      <Grid item xs={6} >
        <UploadVideo />
      </Grid>
      <Grid item xs={3} />
    </Grid>
  </>
  )
}

export default ChapterOne