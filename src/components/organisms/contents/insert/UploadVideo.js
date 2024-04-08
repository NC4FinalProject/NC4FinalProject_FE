import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CoTypography from '../../../atoms/common/CoTypography';
import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useChapterOneStore } from '../../../../stores/ContentsStore';

const UnderlinedButton = styled(Button)`

border-bottom: 1px solid rgba(0, 0, 0, 0.42);
border-radius: 0;

&:hover {
  border-bottom: 2px solid rgba(0, 0, 0, 0.87);
}

&.Mui-focused {
  border-bottom: 2px solid #3f51b5;
}

&.Mui-disabled {
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
}
`;

const CustomTextField = styled(TextField)({
  '& .MuiInput-input::placeholder': {
    fontSize: '0.9rem', // 원하는 글자 크기로 조정
  },
  '& .MuiInput-input': {
    textAlign: 'center', // 입력 필드 텍스트를 수평 중앙 정렬
    // 필요하다면 lineHeight도 조정할 수 있음
  },
});

const VideoFileState = ({ index, layout, setInputField, inputField}) => {

  const { videoInfo, videoFile, addVideoFile, removeVideoFile } = useChapterOneStore();

  const fileInputRef = useRef(null);

  const HiddenInput = styled('input')({
    display: 'none'
  });

  // const fileName = useMemo(() => {
  //   if (videoFile[index]) {
  //     const formData = videoFile[index];
  //     const file = formData.get('videoFile');
  //     if (file instanceof File) {
  //       return file.name;
  //     }
  //   }
  //   return '';
  // }, [videoFile, index]); 

  const handleFileChange = (event) => {

    if (event.target.files && event.target.files[0]) {
      const videoFileInput = event.target.files[0];
      
      // const formData = new FormData();
      // formData.append('videoFile', videoFileInput);
      
      addVideoFile(videoFileInput);
      setInputField(false);
      console.log("여길 안온다고?")

      if(videoFile[index] !== null){
        layout(false);
      }

    }
    if(videoFile[index] !== null){
      console.log("여길 안온다고? 파일이 널이 아님을 말함")
    }

  };

  const removeVideoFileFunc = () => {
    // removeVideoFile()
  };

  return (
    <>
      <HiddenInput
        accept="video/*"
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        multiple
      />

      <UnderlinedButton fullWidth sx={{
          cursor: 'pointer',
          paddingBottom: '4px',
          paddingTop: '4px',
          color: 'black', // Default text color
          ':hover': {
            borderColor: 'primary.main', // Border color on hover
            color: 'primary.main', // Text color on hover
            backgroundColor: 'transparent', // Optional: Transparent background on hover
          },
        }}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >

        {/* 첨부파일이 없는 최초에 상태일 때, 첨부파일 영상 등록 버튼만 보이고 || 첨부파일이 등록되었을 경우, 작은 이름의 갯수제한과 제거 버튼 생성*/}
        { inputField ? (
          <Typography sx={{fontSize: '0.9rem', color: 'rgba(0, 0, 0, 0.4)'}}>컨텐츠 영상을 등록하세요.</Typography>
        ):(
          <Grid container justifyContent={'space-between'} alignItems="center">
            <Typography sx={{fontSize: '0.9rem', color: 'rgba(0, 0, 0, 0.85)'}}>
            {index + 1}. {videoFile[index]?.name?.length > 8 ? `${videoFile[index].name.substring(0, 8)}...` : videoFile[index]?.name || ''}
            </Typography>
            <RemoveCircleOutlineIcon sx={{ fontSize:'1.25rem'}} onClick={(event) => {
              event.stopPropagation();
              removeVideoFileFunc();
              }} />
          </Grid>
        )}
      </UnderlinedButton>
    </>
  )
}

const UploadVideo = ({index}) => {

  const { videoInfo, videoInfoTitleInput, videoFile, addVideoFile } = useChapterOneStore();

  // true 파일없음 최초 || false 파일있음 이후
  const [layout, setLayout] = useState(true);

  const [inputField, setInputField] = useState(true);

  const handleVideoTitleInput = (e) => {
    const text = e.target.value;
    console.log(text +"무어아?"+ index);
    videoInfoTitleInput(index, text);
  }

  useEffect(()=>{
    // 파일이 비어있는 상태라면 파일 등록 레이아웃을 보여주어라
    console.log(videoFile) 
    if(videoFile.length === videoInfo.length -1) {
      setLayout(true);
      console.log("처음에 파일이 없으면 트루로 설정 제발 이거부터 좀 나와라")
    } else if(videoFile.length !== 0){
      setLayout(false);
      setInputField(false);
      console.log("어디온거야 아나;;")
    } else {
      setLayout(false);
      console.log("처음에 파일이 있으면 펄스로 설정")
    }
    
  },[])


  // && videoFile.length === 0 // videoInfo[0].videoTitle === ''

  return (
    <>
    {/* 최초 파일 첨부 버튼만 보이고 || 파일이 등록되어 있을 경우 레이아웃 변경 */}
    {/* A -> A : 첨부파일 등록 버튼 "컨텐츠 영상을 등록하세요"
        A -> B : 첨부파일 등록 버튼 "영상 제목을 입력하세요" ?? 
        B -> A : 레이아웃 변경 버튼 "컨텐츠 영상을 등록하세요" ?? 
        B -> B : 레이아웃 변경 "영상 제목을 입력하세요"
    */}
    {/* 참일때는 영상등록 거짓을때는 영상제목등록이 되어야 한다 */}
    {/* 처음에는 파일 길이가 0개이고 파일 정보의 길이도 0인데
    이때 파일 을 추가하면  */}
    { layout ? (
      <VideoFileState index={index} layout={setLayout} setInputField={setInputField} inputField={inputField}/>
      ) : (
      <Grid container >
        <Grid item xs={3} sx={{ alignContent: 'flex-end'}}>
          <VideoFileState index={index} layout={setLayout} setInputField={setInputField} inputField={inputField}/>
        </Grid>
        <Grid item xs={9} >
          <CustomTextField 
          onChange={handleVideoTitleInput} 
          value={videoInfo.length > index ? videoInfo[index].videoTitle : ''} 
          fullWidth id="standard-basic" variant="standard" 
            placeholder='영상 제목을 입력하세요.'/>
        </Grid>
      </Grid>
      )
    }
    </>
  );
};

export default UploadVideo;
