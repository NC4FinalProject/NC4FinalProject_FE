import React, { useState } from 'react';
import { Paper, Typography, Box, LinearProgress, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  borderStyle: 'dashed',
  borderColor: theme.palette.divider,
  borderWidth: '2px',
  backgroundColor: theme.palette.background.default,
  gap: theme.spacing(2),
  cursor: 'pointer',
  marginBottom: theme.spacing(2),
}));

const StyledInput = styled('input')({
  display: 'none',
});

const FileStatusList = styled(List)({
  width: '100%',
});

// const FileListItem = styled(ListItem)(({ theme, $loading, $error }) => ({
//   padding: theme.spacing(1),
//   color: $error ? theme.palette.error.main : theme.palette.text.primary,
// }));
const FileListItem = styled(ListItem, { shouldForwardProp: (prop) => !['$loading', '$error'].includes(prop) })(({ theme, $loading, $error }) => ({
  padding: theme.spacing(1),
  color: $error ? theme.palette.error.main : theme.palette.text.primary,
  boxShadow: $error ? theme.shadows[6] : theme.shadows[3], // $error 상태에 따라 다른 그림자를 적용
  transition: theme.transitions.create('box-shadow'), // 그림자 변화에 애니메이션을 적용
  '&:hover': {
    boxShadow: theme.shadows[6], // 호버할 때 더 큰 그림자를 적용
  },
}));

const VideoUpload = () => {
  const [files, setFiles] = useState([
    { name: "1강 리액트 프로젝트 세팅.mp4", size: "100kb", status: "loading" },
    { name: "2강 리액트 기초 강의.mp4", size: "100kb", status: "complete" },
    { name: "Upload failed.mp4", size: "2MB", status: "error" }
  ]);

  const handleFileChange = (event) => {
    // 파일 업로드 로직을 여기에 작성하세요.
    console.log(event.target.files);
  };

  const handleDelete = (index) => {
    // 선택된 인덱스의 파일을 삭제
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  return (
    <Box>
      <StyledPaper variant="outlined" square>
        <StyledInput
          accept="image/svg+xml, image/png, image/jpeg, image/gif"
          id="upload-file"
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <label htmlFor="upload-file">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <CloudUploadIcon color="disabled" style={{ fontSize: 60 }} />
            <Typography variant="subtitle1">
              Click to upload or drag and drop
            </Typography>
            <Typography variant="caption" color="textSecondary">
              SVG, PNG, JPG or GIF (max. 3MB)
            </Typography>
          </Box>
        </label>
      </StyledPaper>

      <FileStatusList>
        {files.map((file, index) => (
          <FileListItem
            key={index}
            $loading={file.status === 'loading'}
            $error={file.status === 'error'}
            secondaryAction={
              <>
                {file.status === 'loading' && (
                  <LinearProgress variant="determinate" value={50} style={{ width: '100%' }} />
                )}
                <IconButton edge="end" onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >


            <ListItemIcon>
              {file.status === 'complete' && (
                <StarBorderIcon />
              )}
              {file.status === 'error' && (
                <ErrorOutlineIcon color="error" />
              )}
            </ListItemIcon>


            <ListItemText
              primary={file.name}
              secondary={`${file.size} • ${file.status.charAt(0).toUpperCase() + file.status.slice(1)}`}
            />

            {file.status === 'loading' && (
              <LinearProgress variant="determinate" value={50} style={{ width: '100%' }} />
            )}

          </FileListItem>

        ))}

      </FileStatusList>
    </Box>
  );
};

export default VideoUpload;
