import React, { useEffect } from 'react';
import useStore from '../../stores/NoticeStore';
import { useParams, useNavigate  } from 'react-router-dom';
import { Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import CoTypography from '../../components/atoms/common/CoTypography';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import HtmlParser from 'react-html-parser';
import Notice from '../../scss/Notice.scss';
import { useState } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const NoticeDetail = () => {
  const { noticeId } = useParams();
  const { notices, getNotice,files,setFiles,handleNoticeModifySubmit,userNickname,fileDTOList,setFileDTOList,openDialog,setOpenDialog,title,setTitle,content,setContent } = useStore();
  const [nextNotice, setNextNotice] = useState(null);
  const [nextNoticeData, setNextNoticeData] = useState(null);
  const [backNotice, setBackNotice] = useState(null);
  const [backNoticeData, setBackNoticeData] = useState(null);
  const [putNoticeId, setPutNoticeId] = useState(null);
  const navi = useNavigate();
  const tempFileDTOList = [];

  useEffect(() => {
    if (notices && noticeId !== null) {
      const nextNoticeNumber = parseInt(noticeId, 10) + 1;
      const backNoticeNumber = parseInt(noticeId, 10) - 1;
      setNextNotice(nextNoticeNumber);
      setBackNotice(backNoticeNumber);
      setPutNoticeId(noticeId, 10);
      const fetchData = async () => {
        await getNotice(noticeId);
      };
      fetchData();
    }
  }, [noticeId]);


  useEffect(() => {
  const getNextNotice = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/notice/notice/${nextNotice}`);
      
      setNextNoticeData(response.data.item);
    } catch (error) {
      console.log('다음글이 없습니다.');
    }
  };
  
  if (noticeId !== null) {
    getNextNotice();
  }
  }, [noticeId, nextNotice]); 

  useEffect(() => {
    const getBackNotice = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/notice/notice/${backNotice}`);
        
        setBackNoticeData(response.data.item);
      } catch (error) {
        console.log('이전글이 없습니다.');
      }
    };
    
    if (noticeId !== null) {
      getBackNotice();
    }
    }, [noticeId, nextNotice]); 


const handleDelete = async () => {
   try {
    console.log(noticeId);

    const response = await axios.delete(`http://localhost:9090/notice/delete/${noticeId}`);
    console.log(response);
        alert('게시글이 삭제되었습니다.');
        navi("/noticelist");
         } catch (error) {
        console.error('게시글 삭제 중 오류 발생:', error);
        alert('게시글 삭제 중 오류가 발생했습니다.');
      }
    };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = async () => {
    try {
      await axios.put('http://localhost:9090/notice/remove');
      console.log("이미지가 삭제되었습니다.");
      setOpenDialog(false);
    } catch (error) {
      console.error("이미지 삭제에 실패했습니다.");
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleSubmit = () => {
    handleDialogClose();
  };

  const handleEditButtonClick = () => {
    setTitle(notices.noticeTitle); 
    setContent(notices.noticeContent); 
    handleDialogOpen();
  };

  const handleUpload = async (file) => {
    try {
        const formData = new FormData();
        formData.append('upload', file);
        const response = await axios.post('http://localhost:9090/notice/upload', formData, {
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
          setFiles(file);
          return await handleUpload(file);
        }
      };
    };
  }

  return (
    <div>
      {(notices && (
        <div> 
    <Grid
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <CoTypography size="MainTitle" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
        {notices.noticeTitle}
      </CoTypography>

      <Box sx={{ flex: 1}} />
      <Button
      size="Content"
        variant="contained"
        color="primary"
        style={{ color: 'white', marginLeft: '1rem',marginTop: '1rem'  }}
        onClick={handleEditButtonClick}
      >
        수정
      </Button>
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="lg">
      <DialogTitle>공지사항 수정하기</DialogTitle>
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
        <Button onClick={() => handleNoticeModifySubmit(putNoticeId)} color="primary">
          수정하기
        </Button>
      </DialogActions>
    </Dialog>
      <Button
      size="Content"
         variant="contained"
        color="warning"
        style={{ color: 'white', marginLeft: '1rem',marginTop: '1rem'  }}
        onClick={() => {
          if (window.confirm('게시글을 삭제하시겠습니까?')) {
            handleDelete();
          }
        }}
      >
        삭제
      </Button>
      <Link to="/noticelist" style={{ textDecoration: 'none' }}>
      <Button
        variant="outlined"
        color="primary"
        style={{ color: 'primary', marginLeft: '1rem',marginTop: '1rem'  }}
      >
        뒤로가기
      </Button>
      </Link>
    </Grid>
    <Box item xs={10} sx={{display:'flex', alignItems:'center', marginTop: '1rem'}}>
       {notices.profileImageUrl === null ? (
        <Avatar src="/broken-mage.jpg" style={{width: '2rem', height: '2rem',marginLeft: '0'}}/> 
           ) : (
              <img src={`https://kr.object.ncloudstorage.com/bitcamp-bucket-36/` + notices.profileImageUrl} alt='thumbnail' style={{width: '3rem', height: '3rem', borderRadius: '70%'}}/> 
            )}
            <CoTypography size='Content' sx={{marginLeft:'0.725rem'}}>작성자: {notices.noticeWriter}</CoTypography>
     </Box>
          <CoTypography  className='Notice'>{HtmlParser(notices.noticeContent)}</CoTypography>
          <CoTypography size='Tag'>작성일: {formatDate(notices.noticeDate)}</CoTypography>
          <CoTypography size='Content' sx={{ borderBottom: '1px solid #7d7d7d', borderTop: '1px solid #7d7d7d',paddingBottom:'0.225rem',paddingTop:'0.225rem' }}>
          {nextNoticeData ? (<>다음글 : <Link to={`/notice/${nextNotice}`} style={{ color: 'inherit' }}>{nextNoticeData.noticeTitle}</Link></>) : ("다음글이 없습니다.")}
          </CoTypography>
          <CoTypography size='Content' sx={{ borderBottom: '1px solid #7d7d7d',paddingBottom:'0.225rem',paddingTop:'0.225rem' }}>
          {backNoticeData ? (<>이전글 : <Link to={`/notice/${backNotice}`} style={{  color: 'inherit' }}>{backNoticeData.noticeTitle}</Link></>) : ("이전글이 없습니다.")}
          </CoTypography>
        </div>
      ))}
    </div>
  );
};

export default NoticeDetail;
