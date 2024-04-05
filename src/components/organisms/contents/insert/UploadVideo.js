import React, { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CoTypography from '../../../atoms/common/CoTypography';
import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

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

const VideoFileState = ({ onFileSelect, selectedFile }) => {

  const fileInputRef = useRef(null);

  const HiddenInput = styled('input')({
    display: 'none'
  });

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file.name);
      onFileSelect(file);
    }
  };

  const removeContentsFile = () => {
    onFileSelect(null)
  }
  

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
        {selectedFile === null ? (
          <Typography sx={{fontSize: '0.9rem', color: 'rgba(0, 0, 0, 0.4)'}}>컨텐츠 영상을 등록하세요.</Typography>
        ):(
          <Grid container justifyContent={'space-between'} alignItems="center">
            <Typography sx={{fontSize: '0.9rem', color: 'rgba(0, 0, 0, 0.85)'}}>
              {selectedFile.name.length > 9 ? `${selectedFile.name.substring(0, 9)}...` : selectedFile.name}
            </Typography>
            <IconButton sx={{ p: 0, '& .MuiSvgIcon-root': {  fontSize: '1.25rem', }}} onClick={(event) => {
              event.stopPropagation();
              removeContentsFile();
              }}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Grid>
        )}
      </UnderlinedButton>
    </>
  )
}


const UploadVideo = () => {

  const [selectedFile, setSelectedFile] = useState(null); 

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  return (
    <>
    {selectedFile === null ? (
      <VideoFileState onFileSelect={handleFileSelect} selectedFile={selectedFile}/>
      ) : (
      <Grid container>
        <Grid item xs={3} sx={{ alignContent: 'flex-end'}}>
          <VideoFileState onFileSelect={handleFileSelect} selectedFile={selectedFile}/>
        </Grid>
        <Grid item xs={9} >
          <CustomTextField fullWidth id="standard-basic" variant="standard" 
            placeholder='영상 제목을 입력하세요.'/>
        </Grid>
      </Grid>
      )
    }
    </>
  );
};

export default UploadVideo;
