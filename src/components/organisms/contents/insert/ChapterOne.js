import { Button, Grid, IconButton, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UploadImage from './UploadImage'
import UploadVideo from './UploadVideo'
import CoTypography from '../../../atoms/common/CoTypography'
import styled from 'styled-components'
import SelectFilterType from './SelectFilterType'
import { useChapterOneStore } from '../../../../stores/ContentsStore'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


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

  const { chapterOne, chapterOneInput,
          videoInfo, addVideoInfo, removeVideoInfo,
          videoFile, thumbnail } = useChapterOneStore();

  // 가격 정보 상태 저장
  const handleTitleChange = (e) => {
    chapterOneInput({ contentsTitle: e.target.value });
  };

  // 테스트용################################
  const test = () =>{
    // console.log("컨텐츠 제목  : "+chapterOne.contentsTitle)
    // console.log("입력된 가격  : "+chapterOne.price)
    // console.log("가격유형  : "+chapterOne.priceType)
    // console.log("분야유형  : "+chapterOne.category)
    console.log(videoInfo)
    console.log(videoFile)
    console.log(chapterOne+"이거 뭔데?")
    console.log(chapterOne)
    console.log("=============섬네일 있나?")
    console.log(thumbnail)
    
    
    // videoFile.forEach((formData, index) => {
    //   for (let [key, value] of formData.entries()) {
    //     if (value instanceof File) {
    //       console.log(`File ${key} ${index + 1}: ${value.name}`);
    //     }
    //   }
    // });
  };

  useEffect(()=>{
    if(videoInfo.length === 0){
      addVideoInfo({
        videoId: 1,
        videoTitle: "",
        videoTime: "",
        videoPath: "",
        videoStorageId: "",
        videoReplyList: []
      });
    }
  },[])

  // 비디오 입력 폼 추가!!!!!!!!!!!!!!!!
  const addVideoInfoFunc = () => {
    addVideoInfo({
      videoId: videoInfo.length + 1,
      videoTitle: "",
      videoTime: "",
      videoPath: "",
      videoStorageId: "",
      videoReplyList: []
    });
  }

  const removeVideoInfoFunc = () => {
    removeVideoInfo();
  }

  return (
  <>
    {/* 콘텐츠 카테고리 입력 */}
    <SelectFilterType title={'분야'} placeholder={'분야 유형을 선택하세요.'} isType={true}/>
 
    {/* 콘텐츠 가격타입 입력 */}
    <SelectFilterType title={'가격'} placeholder={'가격 유형을 선택하세요.'} isType={false}/>

    {/* 콘텐츠 제목 입력 */}
    <Grid container justifyContent="center"  sx={{ marginTop: '2.5rem' }}>
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
    <Grid container justifyContent="center" sx={{ marginTop: '1rem' }}>
      <Grid item xs={2} />
      <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent:'center'  }}>
        <CoTypography size="Title">썸네일</CoTypography>
      </Grid>
      <Grid item xs={6}>
        <UploadImage />
      </Grid>
      <Grid item xs={3} />
    </Grid>

    {/* 컨텐츠 비디오 입력 */}
    <Grid container justifyContent="center" sx={{ marginTop: '1rem' }} >
      <Grid item xs={2} />
      <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent:'center'  }}>
        <CoTypography size="Title">동영상</CoTypography>
      </Grid>
      <Grid item xs={6} >
        {videoInfo.map((video, index)=>(
          <UploadVideo
            key={index}
            index={index}/>
        ))}
      </Grid>
      <Grid item xs={3} />
    </Grid>
  
    {/* 
    1. 여기도 결국 영상이 추가된 상태인지 아닌지를 체크하고 그 정보를 받아 이 버튼을 표시하고 안하고를 만들어야 한다
    2. 파일 삭제 - 프론트 
    3. 파일 추가 - 프론트
    4. 파일 넘버 추가 - 프론트
    5. 파일명 반영 - 프론트
    6. 전역 상태 저장 - 프론트

    7. 썸네일, 동영상 전역 상태 저장 각 필드에 의한 아이디 또는 내용 담기 - 프론트

    8. 컨텐츠, 커리큘럼 객체에 이어 3번쨰 객체 담기 각각의 객체는 평면적 구조를 가짐 - 프론트
    9. 폼데이터로 담아 서버 전송 - 서버
    10. 실제로 서버를 통해 오브젝트스토리지 또는 영상에 적합한 스토리지에 저장하기 - 서버
    11. 연동 후, 불러와 바인딩 하기 - 서버와 프론트
    */}

    {/* 컨텐츠 비디오 추가와 삭제  */} 
    <Grid container justifyContent="center" >
      <Grid item xs={3} />
      <Grid item xs={6} sx={{ display: 'flex', justifyContent:'center'}} >
        <IconButton onClick={addVideoInfoFunc} sx={{px:'0rem'}}>
          <KeyboardArrowDownIcon sx={{ color: 'black', fontSize: '1.5rem' }} />
        </IconButton>
        <IconButton onClick={removeVideoInfoFunc} sx={{px:'0rem'}}>
          <KeyboardArrowUpIcon sx={{ color: 'black', fontSize: '1.5rem' }} />
        </IconButton>
      </Grid>
      <Grid item xs={3} />
    </Grid>
    <Button onClick={test}>test</Button>
  </>
  )
}

export default ChapterOne