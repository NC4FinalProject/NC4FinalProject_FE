import React, { useContext, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from '@mui/material/IconButton';
import CoTypography from "../../components/atoms/common/CoTypography";
import AdminChart from "../admin/AdminChart";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AdminStore from '../../stores/AdminStore';
import Avatar from '@mui/material/Avatar';
import { MenuContext } from '../admin/MenuContext';
import MemberStore from "../../stores/MemberStore";


const AdminLayout = ({ children }) => {
  const [hover, setHover] = useState(false);
  const { userNotice, Notices, Users, NewUser, DailytotalUserCount, MonthlytotalUserCount,MonthlyCounts } = AdminStore();
  const { toggleMenu } = useContext(MenuContext);
  const { userRole } = MemberStore();
  const [disable, setDisable] = useState([]);
  const [graphMode, setGraphMode] = useState('daily'); 

  useEffect(() => {
   userNotice();
  }, [userNotice]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const grapghformatDate = (dateString) => {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const toggleGraphMode = () => {
    setGraphMode(prevMode => (prevMode === 'daily' ? 'monthly' : 'daily'));
  };
  useEffect(() => {
  const updateDataByMode = () => {
    let cumulativeCount = 0;
    if (graphMode === 'daily') {
      const dailyData = DailytotalUserCount.map(total => {
        const newUser = NewUser.find(user => grapghformatDate(user.registration_date) === grapghformatDate(total.registration_date));
        return {
          date: grapghformatDate(total.registration_date),
          create: newUser ? newUser.user_count : 0, 
          delete: 0, 
          clientTotal: total.user_count,
        };
      });
      setData(dailyData);
    } else {
      const monthlyData = MonthlyCounts.map(total => {
        const totalUser = MonthlytotalUserCount.find(user => grapghformatDate(user.registration_date) === grapghformatDate(total.registration_date));
        cumulativeCount += totalUser ? totalUser.user_count : 0;
        return {
          date: grapghformatDate(total.registration_date),
          create: totalUser ? totalUser.user_count : 0,
          delete: 2, 
          clientTotal: cumulativeCount,
        };
      });
        setData(monthlyData);
      }
  };
  updateDataByMode();
}, [graphMode, DailytotalUserCount]);

  const [data, setData] = useState([]);


  return (
    <>
      <Box sx={{display:'flex'}}>
        <Paper sx={{height:'4.25rem', display:'flex', width:'100%'}}>
        <IconButton onClick={toggleMenu}>
            <MenuIcon />
        </IconButton>
        <Box sx={{flexGrow:1, alignContent:'center'}}>
        <CoTypography size="Title" sx={{borderBottom:'1px solid #7d7d7d7d'}}>
          오늘의 정보
        </CoTypography>
        <Box sx={{display:'flex', paddingTop:'0.3rem'}}>
        <CoTypography size="Admin" >신규 가입 : </CoTypography>
        <CoTypography size="Admin"  sx={{ paddingLeft:'1rem'}}>강사 가입 승인 대기 : </CoTypography>
        <CoTypography size="Admin"  sx={{ paddingLeft:'1rem'}}>답변 대기 문의 : </CoTypography>
        <CoTypography size="Admin"  sx={{ paddingLeft:'1rem'}}>신고 내역 : </CoTypography>
        </Box>
        </Box>
      </Paper>
    </Box>
    <Box sx={{ paddingTop: '1.25rem' }}>
    <Paper sx={{ height: '15rem', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '1rem', paddingTop: '0.5rem' }}>
        <Typography onClick={toggleGraphMode} sx={{ cursor: 'pointer',fontSize:'1rem', paddingRight:'2rem', paddingTop:'0.125rem'}} style={{color:'#558BCF'}}>
          {graphMode === 'daily' ? '📅일 별' : '📅월 별'}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AdminChart data={data} disable={disable} setDisable={setDisable} />
      </Box>
      </Paper>
    </Box>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box paddingTop="1.25rem">
        <Paper sx={{ height: '16.5rem', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ width: '100%', height: '3rem', borderBottom: '1px solid #7d7d7d7d', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <CoTypography size="Title" sx={{ paddingLeft: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>공지사항 현황</CoTypography>
         <Link
                to="/noticelist"
                style={{ textDecoration: 'none', color: hover ? '#558BCF' : 'inherit' }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
         >
          <Typography sx={{ paddingTop: '0.5rem', paddingRight: '0.5rem', fontSize: '0.8125rem' }}>더보기+</Typography>
        </Link>
      </Box>
      {Notices.map((notice, index) => (
        <Box key={index} sx={{ width: '100%' }}>
          <Link to={`/notice/${notice.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>   
            <CoTypography size="AdminNotice">{notice.noticeTitle}</CoTypography>
          </Link>
          <CoTypography size="AdminTag">작성자 | {notice.Writer}&nbsp;&nbsp; 작성일 : {formatDate(notice.noticeDate)}&nbsp;&nbsp;조회수 : {notice.view}</CoTypography>
        </Box>
      ))}
    </Paper>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box paddingTop="1.25rem">
          <Paper sx={{ height: '16.5rem', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '100%', height: '3rem', borderBottom: '1px solid #7d7d7d7d', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
              <CoTypography size="Title" sx={{ paddingLeft: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>게시판 현황</CoTypography>
              <Link
                to="/noticelist"
                style={{ textDecoration: 'none', color: hover ? '#558BCF' : 'inherit' }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <Typography sx={{ paddingTop: '0.5rem', paddingRight: '0.5rem', fontSize: '0.8125rem' }}>더보기+</Typography>
              </Link>
            </Box>
            <Box sx={{ width: '100%' }}>
              <CoTypography size="AdminNotice">최근 게시판 :ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</CoTypography>
              <CoTypography size="AdminTag">작성자 | 손우성&nbsp;&nbsp; 작성일 : 2024-03-11&nbsp;&nbsp;조회수 : 0</CoTypography>
            </Box>
            <Box sx={{ width: '100%' }}>
              <CoTypography size="AdminNotice">최근 게시판 :ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</CoTypography>
              <CoTypography size="AdminTag">작성자 | 손우성&nbsp;&nbsp; 작성일 : 2024-03-11&nbsp;&nbsp;조회수 : 0</CoTypography>
            </Box>
            <Box sx={{ width: '100%' }}>
              <CoTypography size="AdminNotice">최근 게시판 :ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</CoTypography>
              <CoTypography size="AdminTag">작성자 | 손우성&nbsp;&nbsp; 작성일 : 2024-03-11&nbsp;&nbsp;조회수 : 0</CoTypography>
            </Box>
            <Box sx={{ width: '100%' }}>
              <CoTypography size="AdminNotice">최근 게시판 :ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</CoTypography>
              <CoTypography size="AdminTag">작성자 | 손우성&nbsp;&nbsp; 작성일 : 2024-03-11&nbsp;&nbsp;조회수 : 0</CoTypography>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
      <Grid container spacing={2} sx={{marginBottom:'5rem'}}>
        <Grid item xs={12} sm={6} md={3}>
          <Box paddingTop="1.25rem">
            <Paper sx={{ height: '16.5rem', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ width: '100%', height: '3rem', borderBottom: '1px solid #7d7d7d7d', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                <CoTypography size="Title" sx={{ paddingLeft: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>문의 현황</CoTypography>
                <Link
                  to="/noticelist"
                  style={{ textDecoration: 'none', color: hover ? '#558BCF' : 'inherit' }}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <Typography sx={{ paddingTop: '0.5rem', paddingRight: '0.5rem', fontSize: '0.8125rem' }}>더보기+</Typography>
                </Link>
              </Box>
              <Box sx={{ width: '100%' }}>
                <CoTypography size="AdminNotice">아니 결제했는데 안되잖아요.</CoTypography>
                <CoTypography size="AdminTag">작성자 | 손우성&nbsp;&nbsp; 작성일 : 2024-03-11</CoTypography>
              </Box>
              <Box sx={{ width: '100%' }}>
                <CoTypography size="AdminNotice">아니 결제했는데 안되잖아요.</CoTypography>
                <CoTypography size="AdminTag">작성자 | 손우성&nbsp;&nbsp; 작성일 : 2024-03-11</CoTypography>
              </Box>
              <Box sx={{ width: '100%' }}>
                <CoTypography size="AdminNotice">아니 결제했는데 안되잖아요.</CoTypography>
                <CoTypography size="AdminTag">작성자 | 손우성&nbsp;&nbsp; 작성일 : 2024-03-11</CoTypography>
              </Box>
              <Box sx={{ width: '100%' }}>
                <CoTypography size="AdminNotice">아니 결제했는데 안되잖아요.</CoTypography>
                <CoTypography size="AdminTag">작성자 | 손우성&nbsp;&nbsp; 작성일 : 2024-03-11</CoTypography>
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box paddingTop="1.25rem">
            <Paper sx={{ height: '16.5rem', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ width: '100%', height: '3rem', borderBottom: '1px solid #7d7d7d7d', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                <CoTypography size="Title" sx={{ paddingLeft: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>신고 현황</CoTypography>
                <Link
                  to="/noticelist"
                  style={{ textDecoration: 'none', color: hover ? '#558BCF' : 'inherit' }}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <Typography sx={{ paddingTop: '0.5rem', paddingRight: '0.5rem', fontSize: '0.8125rem' }}>더보기+</Typography>
                </Link>
              </Box>
              <Box sx={{ width: '100%' }}>
                <CoTypography size="AdminNotice">이 분 욕설을 사용했어요. 정지 부탁요.</CoTypography>
                <CoTypography size="AdminTag">신고자 | 손우성&nbsp;&nbsp; 작성일 : 2024-03-11</CoTypography>
              </Box>
              <Box sx={{ width: '100%' }}>
                <CoTypography size="AdminNotice">이 분 욕설을 사용했어요. 정지 부탁요.</CoTypography>
                <CoTypography size="AdminTag">신고자 | 손우성&nbsp;&nbsp; 작성일 : 2024-03-11</CoTypography>
              </Box>
              <Box sx={{ width: '100%' }}>
                <CoTypography size="AdminNotice">이 분 욕설을 사용했어요. 정지 부탁요.</CoTypography>
                <CoTypography size="AdminTag">신고자 | 손우성&nbsp;&nbsp; 작성일 : 2024-03-11</CoTypography>
              </Box>
              <Box sx={{ width: '100%' }}>
                <CoTypography size="AdminNotice">이 분 욕설을 사용했어요. 정지 부탁요.</CoTypography>
                <CoTypography size="AdminTag">신고자 | 손우성&nbsp;&nbsp; 작성일 : 2024-03-11</CoTypography>
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box paddingTop="1.25rem">
            <Paper sx={{ height: '16.5rem', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ width: '100%', height: '3rem', borderBottom: '1px solid #7d7d7d7d', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                <CoTypography size="Title" sx={{ paddingLeft: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>최근 가입자 현황</CoTypography>
                <Link
                  to="/noticelist"
                  style={{ textDecoration: 'none', color: hover ? '#558BCF' : 'inherit' }}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <Typography sx={{ paddingTop: '0.5rem', paddingRight: '0.5rem', fontSize: '0.8125rem' }}>더보기+</Typography>
                </Link>
              </Box>
              
              {Users.map((user, index) => (
             <Box key={index} sx={{ width: '100%', display:'flex', alignItems:'center' }}>
              {user.profileFile === null ? (
                <Avatar src="/broken-mage.jpg" style={{width: '2.25rem', height: '2.25rem', marginTop:'0.825rem', marginLeft:'1rem'}}/> 
                  ) : (
                      <img src={`https://kr.object.ncloudstorage.com/bitcamp-bucket-36/` + user.profileFile} alt='thumbnail' style={{width: '2.25rem', height: '2.25rem', marginTop:'0.825rem', marginLeft:'1rem', borderRadius:'70%'}}/> 
                    )}
                <Box sx={{ width: '100%' }}>
                  <CoTypography size="AdminNotice">{user.userNickname}&nbsp;</CoTypography>
                  <CoTypography size="AdminTag">({user.role === "ADMIN" ? "관리자" : user.role === "ROLE_USER" ? "유저" : user.role === "ROLE_TEACHER" ? "강사" : ""})&nbsp;|&nbsp;{formatDate(user.createdAt)}</CoTypography>
                </Box>
              </Box>))}
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box paddingTop="1.25rem">
            <Paper sx={{ height: '16.5rem', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ width: '100%', height: '3rem', borderBottom: '1px solid #7d7d7d7d', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                <CoTypography size="Title" sx={{ paddingLeft: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>강사 등록 신청 현황</CoTypography>
                <Link
                  to="/noticelist"
                  style={{ textDecoration: 'none', color: hover ? '#558BCF' : 'inherit' }}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <Typography sx={{ paddingTop: '0.5rem', paddingRight: '0.5rem', fontSize: '0.8125rem' }}>더보기+</Typography>
                </Link>
              </Box>
              <Box sx={{ width: '100%' }}>
                <CoTypography size="AdminNotice">최근 공지사항 :ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</CoTypography>
                <CoTypography size="AdminTag">작성자 | 손우성&nbsp;&nbsp; 작성일 : 2024-03-11&nbsp;&nbsp;조회수 : 0</CoTypography>
              </Box>
            </Paper>
          </Box>
        </Grid>
    </Grid>
      <div className="admin-content">
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
