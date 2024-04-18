import React, { useContext, useState } from "react";
import { Box, Grid, Paper,Button } from "@mui/material";
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

const AdminLayout = ({ children }) => {
  const [hover, setHover] = useState(false);
  const { userNotice, contents, Notices, Users, NewUser,preTeachers,qnauser,qnaUserCount,
      MonthlytotalUserCount,MonthlyCounts,preTeacherCount,daliyOutUserCount,monthlyOutUserCount,todayUserCount } = AdminStore();
  const { toggleMenu } = useContext(MenuContext);
  const [disable, setDisable] = useState([]);
  const [graphMode, setGraphMode] = useState('daily'); 
  const [data, setData] = useState([]);


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
    userNotice();
  }, [userNotice]);

 useEffect(() => {
  const updateDataByMode = () => {
    let cumulativeCreate = 0;
    let cumulativeDelete = 0;
    let newData = [];
    if (graphMode === 'daily') {
      newData = NewUser.map(total => {
        const outUser = daliyOutUserCount.find(user => grapghformatDate(user.registration_date) === grapghformatDate(total.registration_date));
        const newUser = NewUser.find(user => grapghformatDate(user.registration_date) === grapghformatDate(total.registration_date));
        const createUserCount = newUser ? newUser.user_count : 0;
        const deleteUserCount = outUser ? outUser.user_count : 0;
        
        cumulativeCreate += createUserCount;
        cumulativeDelete += deleteUserCount;
    
        const clientTotal = cumulativeCreate - cumulativeDelete;
        
        return {
          date: grapghformatDate(total.registration_date),
          create: newUser ? newUser.user_count : 0, 
          delete: deleteUserCount,
          clientTotal: clientTotal,
        };
    });
    } else {
        newData = MonthlyCounts.map(total => {
          const totalUser = MonthlyCounts.find(user => grapghformatDate(user.registration_date) === grapghformatDate(total.registration_date));
          const outUser = monthlyOutUserCount.find(user => grapghformatDate(user.registration_date).slice(0, 7) === grapghformatDate(total.registration_date).slice(0, 7));  const createUserCount = totalUser ? totalUser.user_count : 0;
          const deleteUserCount = outUser ? outUser.user_count : 0;

          cumulativeCreate += createUserCount;
          cumulativeDelete += deleteUserCount;

          const clientTotal = cumulativeCreate - cumulativeDelete;

          return {
            date: grapghformatDate(total.registration_date),
            create: createUserCount, 
            delete: deleteUserCount,
            clientTotal: clientTotal,
          };
        });
            }
    if (JSON.stringify(data) !== JSON.stringify(newData)) {
      setData(newData);
    }
  };
  updateDataByMode();
}, [graphMode,NewUser,MonthlytotalUserCount,MonthlyCounts,daliyOutUserCount]);

  return (
    console.log(qnauser),
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
        <CoTypography size="Admin" sx={{display:'flex'}} >신규 가입 : <CoTypography size="Admin" sx={{color:'red',paddingLeft:'0.125rem'}}>{todayUserCount}</CoTypography> </CoTypography>
        <CoTypography size="Admin"  sx={{ paddingLeft:'1rem',  display:'flex'}}>강사 가입 승인 대기 :<CoTypography size="Admin" sx={{color:'red',paddingLeft:'0.125rem'}}>{preTeacherCount}</CoTypography></CoTypography>
        <CoTypography size="Admin"  sx={{ paddingLeft:'1rem', display:'flex'}}>답변 대기 문의 : <CoTypography size="Admin" sx={{color:'red',paddingLeft:'0.125rem'}}>{qnaUserCount}</CoTypography></CoTypography>
        <CoTypography size="Admin"  sx={{ paddingLeft:'1rem',display:'flex'}}>신고 내역 : <CoTypography size="Admin" sx={{color:'red',paddingLeft:'0.125rem'}}>4</CoTypography></CoTypography>
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
                to="/admin/contents"
                style={{ textDecoration: 'none', color: hover ? '#558BCF' : 'inherit' }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <Typography sx={{ paddingTop: '0.5rem', paddingRight: '0.5rem', fontSize: '0.8125rem' }}>더보기+</Typography>
              </Link>
            </Box>
            {contents.map((content, index) => (
            <Box sx={{ width: '100%' }}>
              <CoTypography size="AdminNotice">{content.contentsTitle}</CoTypography>
              <CoTypography size="AdminTag">작성자 | {content.memberId}&nbsp;&nbsp; 작성일 : {formatDate(content.regDate)}&nbsp;&nbsp;카테고리 : {content.category}</CoTypography>
            </Box>
            ))}
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
                  to="/admin/qna"
                  style={{ textDecoration: 'none', color: hover ? '#558BCF' : 'inherit' }}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <Typography sx={{ paddingTop: '0.5rem', paddingRight: '0.5rem', fontSize: '0.8125rem' }}>더보기+</Typography>
                </Link>
              </Box>
              {qnauser && qnauser.map((qna, index) => (
              <Box key={index} sx={{ width: '100%' }}>
                <CoTypography size="AdminNotice">{qna.content}</CoTypography>
                <CoTypography size="AdminTag">문의자 | {qna.askUser.userNickname}&nbsp;&nbsp; 문의 날짜 : {qna.createdAt}</CoTypography>
              </Box>
              ))}
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
                <CoTypography size="AdminTag">신고자 | 오일남&nbsp;&nbsp; 작성일 : 2024-03-11</CoTypography>
              </Box>
              <Box sx={{ width: '100%' }}>
                <CoTypography size="AdminNotice">자꾸 자기 블로그 홍보해요.</CoTypography>
                <CoTypography size="AdminTag">신고자 | 손오공&nbsp;&nbsp; 작성일 : 2024-04-12</CoTypography>
              </Box>
              <Box sx={{ width: '100%' }}>
                <CoTypography size="AdminNotice">강의를 구매했는데 강의 커리큘럼이랑 달라요.</CoTypography>
                <CoTypography size="AdminTag">신고자 | 무천도사&nbsp;&nbsp; 작성일 : 2024-04-15</CoTypography>
              </Box>
              <Box sx={{ width: '100%' }}>
                <CoTypography size="AdminNotice">이 사람 다른 사이트에서 사기치는 사람이에요.</CoTypography>
                <CoTypography size="AdminTag">신고자 | 개발꿈나무&nbsp;&nbsp; 작성일 : 2024-04-17</CoTypography>
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
                  to="/admin/user"
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
                      <img src={`https://kr.object.ncloudstorage.com/envdev/` + user.profileFile} alt='thumbnail' style={{width: '2.25rem', height: '2.25rem', marginTop:'0.825rem', marginLeft:'1rem', borderRadius:'70%'}}/> 
                    )}
                <Box sx={{ width: '100%' }}>
                  <CoTypography size="AdminNotice">{user.userNickname}&nbsp;</CoTypography>
                  <CoTypography size="AdminTag">({user.role === "ADMIN" ? "관리자" : 
                                                  user.role === "USER" ? "수강생" : 
                                                  user.role === "TEACHER" ? "강사" : 
                                                  user.role === "RESIGNED" ? "탈퇴 회원 " :
                                                  user.role === "BALCKLIST" ? "블랙" :
                                                  user.role === "PRETEACHER" ? "강사 신청" : "null"})&nbsp;|&nbsp;{formatDate(user.createdAt)}</CoTypography>
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
                  to="/admin/user"
                  style={{ textDecoration: 'none', color: hover ? '#558BCF' : 'inherit' }}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <Typography sx={{ paddingTop: '0.5rem', paddingRight: '0.5rem', fontSize: '0.8125rem' }}>더보기+</Typography>
                </Link>
              </Box>
              <Box sx={{ width: '100%' }}>
              {preTeachers.map((user, index) => (
                    user.role === 'PRETEACHER' && (
                <Box key={index} sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    {user.profileFile === null ? (
                      <Avatar src="/broken-mage.jpg" style={{ width: '2.25rem', height: '2.25rem', marginTop: '0.825rem', marginLeft: '1rem' }} />
                    ) : (
                      <img src={`https://kr.object.ncloudstorage.com/envdev/` + user.profileFile} alt='thumbnail' style={{ width: '2.25rem', height: '2.25rem', marginTop: '0.825rem', marginLeft: '1rem', borderRadius: '70%' }} />
                    )}
                    <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'block', alignItems: 'center' }}>
                          <CoTypography size="AdminNotice">{user.userNickname}&nbsp;</CoTypography>
                          <CoTypography size="AdminTag">
                            ({user.role === "ADMIN" ? "관리자" :
                            user.role === "USER" ? "수강생" :
                            user.role === "TEACHER" ? "강사" :
                            user.role === "RESIGNED" ? "탈퇴 회원" :
                            user.role === "BLACKLIST" ? "블랙" :
                            user.role === "PRETEACHER" ? "강사 신청" : "null"})&nbsp;|&nbsp;{formatDate(user.createdAt)}
                          </CoTypography>
                        </Box>
                        {user.role === "PRETEACHER" && (
                          <Button
                            size="small"
                            component={Link}
                            to={`/admin/user/${user.memberId}`}
                            variant="outlined"
                            color="primary"
                            sx={{marginTop:'0.625rem', marginRight:'1rem'}}
                          >
                            상세보기
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  )
                ))}
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
