import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import useStore from '../../stores/NoticeStore';
import { useParams } from 'react-router-dom';
import { Box, Grid, Button } from '@mui/material';
import CoTypography from '../../components/atoms/common/CoTypography';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import HtmlParser from 'react-html-parser';
import Notice from '../../scss/Notice.scss';

const NoticeDetail = () => {
  const { noticeId } = useParams();
  const { notices, getNotice,profileImage } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      await getNotice(noticeId);
    };
    fetchData();
  }, [getNotice, noticeId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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
      >
        수정
      </Button>
      <Button
      size="Content"
         variant="contained"
        color="warning"
        style={{ color: 'white', marginLeft: '1rem',marginTop: '1rem'  }}
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
    <Box item xs={10}>
       {notices.profileImageUrl === null ? (
        <Avatar src="/broken-mage.jpg" style={{width: '30px', height: '30px',marginLeft: '0'}}/> 
           ) : (
              <img src={`https://kr.object.ncloudstorage.com/bitcamp-bucket-36/` + notices.profileImageUrl} alt='thumbnail' style={{width: '3rem', height: '3rem', borderRadius: '70%'}}/> 
            )}
     </Box>
          <Typography variant="body1" className='Notice'>{HtmlParser(notices.noticeContent)}</Typography>
          <Typography variant="body2">작성자: {notices.noticeWriter}</Typography>
          <Typography variant="body2">작성일: {formatDate(notices.noticeDate)}</Typography>
        </div>
      ))}
    </div>
  );
};

export default NoticeDetail;
