import { Button, Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UploadImage from './UploadImage'
import UploadVideo from './UploadVideo'
import CoTypography from '../../../atoms/common/CoTypography'
import styled from 'styled-components'
import SelectFilterType from './SelectFilterType'
import { useChapterOneStore } from '../../../../stores/ContentsStore'

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

  const { chapterOne, chapterOneInput } = useChapterOneStore();

  // 가격 정보 상태 저장
  const handleTitleChange = (e) => {
    chapterOneInput({ contentsTitle: e.target.value });
  };

  // 테스트용
  const test = () =>{
    console.log("컨텐츠 제목  : "+chapterOne.contentsTitle)
    console.log("입력된 가격  : "+chapterOne.price)
    console.log("가격유형  : "+chapterOne.priceType)
    console.log("분야유형  : "+chapterOne.category)
  };

  // const { base, setBase } = insertChaptherOne();
  // const {base, setBase } = useState("");

  return (
  <>
    {/* 콘텐츠 카테고리 입력 */}
    <SelectFilterType title={'분야'} placeholder={'분야 유형을 선택하세요.'} isType={true}/>
 
    {/* 콘텐츠 가격타입 입력 */}
    <SelectFilterType title={'가격'} placeholder={'가격 유형을 선택하세요.'} isType={false}/>

    {/* 콘텐츠 제목 입력 */}
    <Grid container justifyContent="center"  sx={{ marginTop: '2rem', }}>
        <Grid item xs={2} />

        <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent:'center'  }}>
            <CoTypography size="Title">컨텐츠</CoTypography>
        </Grid>
        <Grid item xs={6}>
          <CustomTextField fullWidth id="standard-basic" variant="standard" 
            value={chapterOne.contentsTitle || ''} 
            onChange={handleTitleChange}  
            placeholder='컨텐츠 제목을 입력하세요.'/>
        </Grid>
        <Grid item xs={3} />
    </Grid>

    {/* 콘텐츠 썸네일 입력 */}
    <Grid container justifyContent="center" >
      <Grid item xs={2} />
      <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent:'center'  }}>
        <CoTypography size="Title">썸네일</CoTypography>
      </Grid>
      <Grid item xs={6}>
        <UploadImage />
      </Grid>
      <Grid item xs={3} />
    </Grid>

    {/* 콘텐츠 비디오 입력 */}
    <Grid container justifyContent="center" sx={{ mb: '2rem', }} >
      <Grid item xs={2} />
      <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent:'center'  }}>
        <CoTypography size="Title">동영상</CoTypography>
      </Grid>
      <Grid item xs={6} >
        <UploadVideo />
      </Grid>
      <Grid item xs={3} />
    </Grid>


    {/* <Button onClick={test}>test</Button> */}
  </>
  )
}

export default ChapterOne