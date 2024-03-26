import React, { useCallback, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CoTypography from '../../../atoms/common/CoTypography';
import { Button } from '@mui/material';

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

const Input = styled('input')({
  display: 'none',
});

const UploadImage = () => {
  const [dragOver, setDragOver] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const HiddenInput = styled('input')({
    display: 'none',
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
      setImageFile(file); 
      // 파일을 처리하는 함수에 file을 인자로 전달한다
    }
  };

  return (
    <>
      <HiddenInput
        accept="image/*"
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
      />
      <UnderlinedButton
        // variant="outlined"
        fullWidth
        sx={{
          // backgroundColor: dragOver ? 'action.hover' : undefined,
          cursor: 'pointer',
          paddingBottom: '4px',
          paddingTop: '4px',
          // padding: 0,
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
        <CoTypography size="Content">Image Upload</CoTypography>
      </UnderlinedButton>
    </>
  );
};

export default UploadImage;