import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CoTypography from '../../../atoms/common/CoTypography';
import { Button } from '@mui/material';
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

const UploadImage = () => {

  const { thumbnail, uploadThumbnail } = useChapterOneStore();

  const fileInputRef = useRef(null);

  const HiddenInput = styled('input')({
    display: 'none',
  });

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const thumbnailInput = event.target.files[0];

      uploadThumbnail(thumbnailInput)

    }
  };

  useEffect(()=>{
    if(thumbnail !== null){
      console.log("파일에 뭔가 들어옴" + thumbnail)
    }
  })

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
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        {thumbnail.length === 0 ? (
          <Typography  sx={{fontSize: '0.9rem', color: 'rgba(0, 0, 0, 0.4)'}}>컨텐츠 사진을 등록하세요.</Typography>
        ):(
          <Typography  sx={{fontSize: '0.9rem', color: 'rgba(0, 0, 0, 0.85)'}}>{thumbnail.name}</Typography>
        )}
        
      </UnderlinedButton>
    </>
  );
};

export default UploadImage;