import React, { useEffect } from 'react';
import useStore from '../../stores/NoticeStore';
import { useParams, useNavigate  } from 'react-router-dom';
import { Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import CoTypography from '../../components/atoms/common/CoTypography';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import HtmlParser from 'react-html-parser';
import { useState } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MemberStore from '../../stores/MemberStore';
import Notice from '../../scss/Notice.scss'


const NoticeDetail = () => {
  const { noticeId } = useParams();
  const { 
    notices, 
    notice,
    getNotice,
    setFiles,
    handleNoticeModifySubmit,
    userNickname,
    fileDTOList,
    setFileDTOList,
    openDialog,
    setOpenDialog,
    title,
    setTitle,
    content,
    setContent } = useStore();
  const [nextNotice, setNextNotice] = useState(null);
  const [nextNoticeData, setNextNoticeData] = useState(null);
  const [backNotice, setBackNotice] = useState(null);
  const [backNoticeData, setBackNoticeData] = useState(null);
  const [putNoticeId, setPutNoticeId] = useState(null);
  const [liked, setliked] = useState(null);
  const [likeCnt, setlikeCnt] = useState(null);
  const {memberInfo} = MemberStore();
  const navi = useNavigate();
  const tempFileDTOList = [];

  useEffect(() => {
    if (notice && noticeId !== null) {
      setPutNoticeId(noticeId, 10);
      const fetchData = async () => {
        await getNotice(noticeId);
      };
      fetchData();
    }
  }, [noticeId]);

  useEffect(() => {
    if(notices.content && notice) {
      if(notices.content[0].id === notice.id) {
        setBackNotice(null);
        setBackNoticeData(null);
        setNextNotice(notices.content[1].id);
        setNextNoticeData(notices.content[1]);
      } else if(notices.content[notices.content.length - 1].id === notice.id) {
        setBackNotice(notices.content[notices.content.length - 2].id);
        setBackNoticeData(notices.content[notices.content.length - 2]);
        setNextNotice(null);
        setNextNoticeData(null);
      } else {
        for(let i = 0; i < notices.content.length; i++) {
          if(notices.content[i].id === notice.id) {
            console.log(notices.content[i - 1].id);
            setBackNotice(notices.content[i - 1].id);
            setBackNoticeData(notices.content[i - 1]);
            setNextNotice(notices.content[i + 1].id);
            setNextNoticeData(notices.content[i + 1]);
          }
        }
      }
    }
  }, [notices, notice]);

const handleDelete = async () => {
   try {

    const response = await axios.delete(`http://${process.env.REACT_APP_BACK_URL}/notice/delete/${noticeId}`);
    console.log(response);
        alert('게시글이 삭제되었습니다.');
        navi("/noticelist");
         } catch (error) {
        console.error('게시글 삭제 중 오류 발생:', error);
        alert('게시글 삭제 중 오류가 발생했습니다.');
      }
    };
  useEffect(() => {
    const getlikedata = async () => {
    try {
      const response = await axios.get(`http://${process.env.REACT_APP_BACK_URL}/notice/likeget/${noticeId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
        }
      });
      console.log(response.data);
      setlikeCnt(response.data.likeCnt);
      setliked(response.data.check);
    }catch (error) {
      console.log('Error fetching like:', error);
    }
  };
  getlikedata();
  }, [noticeId]);

    const getLikeNotice = async () => {
      try {
        const response = await axios.post(`http://${process.env.REACT_APP_BACK_URL}/notice/like/${noticeId}`,null, {
          headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          }
         });
        console.log(response.data);
        setlikeCnt(response.data.likeCnt);
        setliked(response.data.check);
      } catch (error) {
        console.error('Error fetching like:', error);
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
      await axios.put(`http://${process.env.REACT_APP_BACK_URL}/notice/remove`);
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

  const handleEditButtonClick = () => {
    setTitle(notice.noticeTitle); 
    setContent(notice.noticeContent); 
    handleDialogOpen();
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
          setFiles(file);
          return await handleUpload(file);
        }
      };
    };
  }


  return (
    <div>
      {(notice && (
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
        {notice.noticeTitle}
      </CoTypography>

      <Box sx={{ flex: 1}} />
      {memberInfo.role === 'ADMIN' && (
      <Button
      size="Content"
        variant="contained"
        color="primary"
        style={{ color: 'white', marginLeft: '1rem',marginTop: '1rem'  }}
        onClick={handleEditButtonClick}
      >
        수정
      </Button>
      )}
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
          data={content.replaceAll("&lt;", "<").replaceAll("&gt;", ">")}
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
    {memberInfo.role === 'ADMIN' && (
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
      )}
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
       {notice.profileImageUrl == null ? (
        <Avatar src="/broken-mage.jpg" style={{width: '2rem', height: '2rem',marginLeft: '0'}}/> 
           ) : (
              <img src={`https://kr.object.ncloudstorage.com/envdev/` + notice.profileImageUrl} alt='thumbnail' style={{width: '3rem', height: '3rem', borderRadius: '70%'}}/>
            )}
            <CoTypography size='Content' sx={{marginLeft:'0.725rem'}}>작성자: {notice.noticeWriter}</CoTypography>
     </Box>
          <CoTypography  className='Notice'>{HtmlParser(HtmlParser(notice.noticeContent))}</CoTypography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <CoTypography size="Tag">작성일: {formatDate(notice.noticeDate)}</CoTypography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CoTypography size="Tag">이 글이 도움이 되었나요? ({likeCnt})</CoTypography>
            <IconButton  onClick={() => getLikeNotice()} color="inherit" sx={{padding: '0'}}>
              {liked == 1 ?  <FavoriteIcon sx={{ color: '#558BCF', '& > *': { fill: '#none' },paddingLeft: '0.125rem'}} /> : <FavoriteBorderIcon sx={{paddingLeft: '0.125rem'}} />}
            </IconButton>
          </Box>
        </Box>
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
