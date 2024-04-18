

import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Pagination, MenuItem, Grid } from '@mui/material';
import CoTypography from '../../components/atoms/common/CoTypography';
import useStore from '../../stores/NoticeStore';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import Login from '../member/Login';
import AdminStore from '../../stores/AdminStore';
import MemberStore from '../../stores/MemberStore';

const NoticeList = () => {
  const {
    notices,
    openDialog,
    title,
    content,
    userNickname,
    searchCondition,
    searchKeyword,
    page,
    setOpenDialog,
    setTitle,
    setContent,
    setSearchCondition,
    setSearchKeyword,
    setPage,
    fetchNotices,
    fetchUserNickname,
    handleNoticeSubmit,
    files,
    setFiles,
    fileDTOList,
    setFileDTOList,
  } = useStore();

  const { memberInfo } = MemberStore();


  const tempFileDTOList = [];

  useEffect(() => {
    console.log(111111111111)
    const fetchData = async () => { 
      await fetchNotices();
      await fetchUserNickname();
    };
    fetchData();
  }, [fetchNotices, fetchUserNickname, page, searchCondition, searchKeyword]);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = async () => {
    try {
      await axios.put(`http://${process.env.REACT_APP_BACK_URL}/notice/remove`);
      console.log("이미지가 삭제되었습니다.");
      setOpenDialog(false);
    } catch (error) {
      console.error("이미지 삭제에 실패했습니다.");
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handlePageChange = (event, value) => {
    setPage(value - 1); 
  };

  const handleSearchConditionChange = (event) => {
    setSearchCondition(event.target.value);
  };

  const handleSearchKeywordChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleUpload = async (file) => {
    try {
        const formData = new FormData();
        formData.append('upload', file);
        const response = await axios.post(`http://${process.env.REACT_APP_BACK_URL}/notice/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        tempFileDTOList.push({itemFilePath: response.data.itemFilePath, itemFileName: response.data.itemFileName, itemFileOrigin: response.data.itemFileOrigin});

        console.log(fileDTOList);
        setFileDTOList(tempFileDTOList);
        return {default: response.data.url};
    } catch (error) {
      console.log(error);
      console.error('Error uploading files: ', error);
      return { error: { message: 'Files upload failed' } };
    }
  };

  function UploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return {
        upload: async () => {
          const file = await loader.file;
          console.log(file);
          setFiles(file);
          return await handleUpload(file);
        }
      };
    };
  }

  return (
    <div>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          borderBottom: '1px solid #ccc'
        }}
      >
        <CoTypography size="MainTitle" style={{ marginTop: '1rem', marginBottom: '0.5rem'}}>
          공지사항
        </CoTypography>

        <Box sx={{ flex: 1}} />

        <TextField
          size="small"
          sx={{ width: '10rem', marginTop: '1rem'  }}
          select
          label="검색 조건"
          defaultValue={searchCondition}
          inputProps={{
            name: 'searchCondition',
          }}
          onChange={handleSearchConditionChange}
          fullWidth
        >
          <MenuItem value="all">전체</MenuItem>
          <MenuItem value="title">제목</MenuItem>
          <MenuItem value="content">내용</MenuItem>
          <MenuItem value="writer">작성자</MenuItem>
        </TextField>

        <TextField
          size="small"
          sx={{ width: '20rem', marginLeft: '1rem', marginTop: '1rem'  }}
          id="searchKeyword"
          name="searchKeyword"
          label="검색어를 입력해주세요."
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
          fullWidth
          placeholder="검색어를 입력해주세요."
          InputProps={{
            endAdornment: (
              <SearchIcon />
            ),
          }}
        />
        {memberInfo.role === 'ADMIN' && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleDialogOpen}
            style={{ color: 'white', marginLeft: '1rem', marginTop: '1rem' }}
          >
            글 등록하기
          </Button>
        )}
      </Grid>
      <Box />
      
      {notices.content && notices.content.map(notice => (
        <Box key={notice.id} style={{ marginTop: '0.5rem', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem' }}>
           <CoTypography size="NoticeTitle" sx={{ marginTop: '0.225rem' }}>
             <Link to={`/notice/${notice.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
               {notice.noticeTitle}
             </Link>
          </CoTypography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CoTypography size="Tag">작성일: {formatDate(notice.noticeDate)} |</CoTypography>
            <CoTypography size="Tag" sx={{ marginLeft: '0.125rem' }}>작성자: {notice.noticeWriter}</CoTypography>
            <CoTypography size="Tag" sx={{ marginLeft: '0.625rem' }}>조회수: {notice.view}</CoTypography>
          </Box>
        </Box>
      ))}
      <Box style={{ marginTop: '80px' }} />
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <Pagination color='primary' count={notices.totalPages} page={page + 1} onChange={handlePageChange} />
      </Box>
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="lg">
      <DialogTitle>공지사항 등록하기</DialogTitle>
      <DialogContent>
        <CoTypography>작성자: {userNickname}</CoTypography>
        <TextField
          autoFocus
          margin="dense"
          label="제목"
          fullWidth
          value={title}
          onChange={handleTitleChange}
        />
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={handleContentChange}
          config={{
            extraPlugins: [UploadAdapterPlugin],
          }}
        />
        <CoTypography>등록일: {new Date().toLocaleDateString()}</CoTypography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="secondary">
          취소하기
        </Button>
        <Button onClick={() => handleNoticeSubmit(fileDTOList)} color="primary">
          등록하기
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
};

export default NoticeList;
