import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const ThumbnailUpload = () => {
  const [dragOver, setDragOver] = useState(false);

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
      // 파일 처리 로직
      const file = event.dataTransfer.files[0];
      console.log(file);
      // 파일을 처리하는 함수에 file을 인자로 전달한다
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      // 파일 처리 로직
      const file = event.target.files[0];
      console.log(file);
      // 파일을 처리하는 함수에 file을 인자로 전달한다
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '150px',
        backgroundColor: dragOver ? 'action.hover' : '',
        cursor: 'pointer',
        borderStyle: 'dashed',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input').click()}
    >
      <Input accept="image/*" id="file-input" type="file" onChange={handleFileChange} />
      <Typography>이미지를 이곳에 드롭하세요</Typography>
    </Paper>
  );
};

export default ThumbnailUpload;