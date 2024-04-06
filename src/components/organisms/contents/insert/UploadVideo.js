import React, { useCallback, useEffect, useRef, useState } from 'react';
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

const VideoFileState = ({ index }) => {

  const { videoInfo, videoFile, addVideoFile, removeVideoFile } = useChapterOneStore();

  const [files, setFiles] = useState();

  const fileInputRef = useRef(null);

  const HiddenInput = styled('input')({
    display: 'none'
  });

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      setFiles(file);
      console.log(typeof(file))
      console.log(files);
      // addVideoFile(files);
      console.log(files);
      console.log(videoFile);
      // addVideoFile(file);
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

        {/* && videoFile.length === 0  */}
        {/* 기본적으로 처음 상태에서 컨텐츠 영상을 입력 받는 폼만 있는 상태이고 여기 파일이 등록되었을 경우 두번째를 보여줌 videoInfo[0].videoTitle === '' */}
        {false ? (
          <Typography sx={{fontSize: '0.9rem', color: 'rgba(0, 0, 0, 0.4)'}}>컨텐츠 영상을 등록하세요.</Typography>
        ):(
          <Grid container justifyContent={'space-between'} alignItems="center">
            <Typography sx={{fontSize: '0.9rem', color: 'rgba(0, 0, 0, 0.85)'}}>
              {/* {index+1}. {videoFile.name.length > 8 ? `${videoFile.name.substring(0, 8)}...` : videoFile.name} */}
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

  const handleVideoTitleInput = (e) => {
    const text = e.target.value;
    console.log(text +"무어아?"+ index);
    videoInfoTitleInput(index, text);
  }

  // useEffect(()=>{
  //   if(selectedFile !== null) {
  //     setSelectedFile("");
  //   }
  // },[])

  // && videoFile.length === 0 // videoInfo[0].videoTitle === ''

  return (
    <>
    {false ? (
      <VideoFileState index={index} />
      ) : (
      <Grid container >
        <Grid item xs={3} sx={{ alignContent: 'flex-end'}}>
          <VideoFileState index={index} />
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
