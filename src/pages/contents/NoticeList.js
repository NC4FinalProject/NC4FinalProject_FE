import React, { useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Pagination, MenuItem } from '@mui/material';
import CoTypography from '../../components/atoms/common/CoTypography';
import useStore from '../../stores/NoticeStore';

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
    setNotices,
    setOpenDialog,
    setTitle,
    setContent,
    setSearchCondition,
    setSearchKeyword,
    setPage,
    fetchNotices,
    fetchUserNickname,
    handleNoticeSubmit,
  } = useStore();

  useEffect(() => {
    const fetchData = async () => { 
      await fetchNotices();
      await fetchUserNickname();
    };
    fetchData();
  }, [page, searchCondition, searchKeyword]);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
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

  return (
    <div>
      <CoTypography size="MainTitle" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>공지사항</CoTypography>
      <TextField
        select
        label="검색 조건"
        value={searchCondition}
        onChange={handleSearchConditionChange}
        fullWidth
      >
        {['제목', '내용', '작성자'].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="검색어"
        value={searchKeyword}
        onChange={handleSearchKeywordChange}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleDialogOpen}>글 등록하기</Button>
      <Box />
      {notices.content && notices.content.map(notice => (
        <Box key={notice.id} style={{ marginTop: '0.5rem', borderTop: '1px solid #ccc', paddingBottom: '0.25rem' }}>
          <CoTypography size="NoticeTitle" sx={{ marginTop: '0.225rem' }}>{notice.noticeTitle}</CoTypography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CoTypography size="Tag">작성일: {formatDate(notice.noticeDate)} |</CoTypography>
            <CoTypography size="Tag" sx={{ marginLeft: '0.125rem' }}>작성자: {notice.noticeWriter}</CoTypography>
            <CoTypography size="Tag" sx={{ marginLeft: '0.625rem' }}>조회수: {notice.view}</CoTypography>
            <CoTypography size="Tag" sx={{ marginLeft: '0.625rem' }}> 좋아요: {notice.likeCnt}</CoTypography>
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
          <TextField
            margin="dense"
            label="내용"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={handleContentChange}
          />
          <CoTypography>등록일: {new Date().toLocaleDateString()}</CoTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            취소하기
            </Button>
          <Button onClick={handleNoticeSubmit} color="primary">
            등록하기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NoticeList;
