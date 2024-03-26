import React, { useCallback, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CoTypography from '../../../atoms/common/CoTypography';
import { Button, InputAdornment, TextField } from '@mui/material';

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

const UploadVideo = () => {
  const [dragOver, setDragOver] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const fileInputRef = useRef(null);

  const HiddenInput = styled('input')({
    display: 'none'
  });

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      console.log(file); // 드랍된 비디오 파일 객체를 콘솔에 로깅
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file); // 선택된 비디오 파일 객체를 콘솔에 로깅
      setVideoFile(file); 
    }
  };


  return (
    <>
      <HiddenInput
        accept="video/*" // 비디오 파일만 선택하도록 변경
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        multiple // 여러 파일을 선택할 수 있게 하는 것은 선택 사항이에요.
      />

      <UnderlinedButton
        // variant="outlined"
        fullWidth
        
        sx={{
          // backgroundColor: dragOver ? 'action.hover' : undefined,
          cursor: 'pointer',
          // paddingBottom: '0.12rem',
          paddingBottom: '4px',
          paddingTop: '4px',
          color: 'black', // Default text color
          ':hover': {
            borderColor: 'primary.main', // Border color on hover
            color: 'primary.main', // Text color on hover
            backgroundColor: 'transparent', // Optional: Transparent background on hover
          },
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        <CoTypography size="Content">Video Upload</CoTypography>
      </UnderlinedButton>

      {/* <TextField
        
        fullWidth
        id="standard-basic"
        variant="standard"
        InputProps={{
          readOnly: true, // 이 부분이 필드를 읽기 전용으로 만듦
          startAdornment: (
            <InputAdornment>
              <Button
                sx={{
                  cursor: 'pointer',
                  borderStyle: 'dashed',
                  padding: 0,
                  color: 'black',
                  ':hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    backgroundColor: 'transparent',
                  },
                }}
              ><CoTypography size="Content">Video Upload</CoTypography>
              </Button>
            </InputAdornment>
          ),
        }}
      /> */}
    </>
  );
};

export default UploadVideo;

// {videoFile && (
//   <p>Uploaded video: {videoFile.name}</p> // 업로드된 비디오 파일명 표시
// )}