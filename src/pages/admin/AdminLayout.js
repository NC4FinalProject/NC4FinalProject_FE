import React, { useContext, useState } from "react";
import { Box, Drawer, Grid, List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GroupIcon from '@mui/icons-material/Group';
import CreateIcon from '@mui/icons-material/Create';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
  const [submenuOpen, setSubmenuOpen] = useState({}); 
  const [selectedSubmenu1, setSelectedSubmenu1] = useState(null);
  const [selectedSubmenu2, setSelectedSubmenu2] = useState(null);
  const [selectedSubmenu3, setSelectedSubmenu3] = useState(null);
  const [hover, setHover] = useState(false);
  const { userNotice, notices, users } = AdminStore();
  const { isMenuOpen, toggleMenu } = useContext(MenuContext);

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

  const toggleSubmenu = (menuName) => {
    setSubmenuOpen({
      ...submenuOpen,
      [menuName]: !submenuOpen[menuName],
    });
    setSelectedSubmenu1(null); 
    setSelectedSubmenu2(null); 
    setSelectedSubmenu3(null); 
  };

  const toggleGraphMode = () => {
    setGraphMode(prevMode => (prevMode === 'daily' ? 'monthly' : 'daily'));
  };
  useEffect(() => {
  const updateDataByMode = () => {
    if (graphMode === 'daily') {
      setData([
        { date: '24/03/01', create: 0, delete: 2, clientTotal: 0 },
        { date: '24/03/02', create: 3, delete: 5, clientTotal: 3 },
        { date: '24/03/03', create: 2, delete: 1, clientTotal: 5 },
        { date: '24/03/04', create: 5, delete: 3, clientTotal: 10 },
        { date: '24/03/05', create: 4, delete: 7, clientTotal: 14 },
        { date: '24/03/06', create: 3, delete: 1, clientTotal: 17 },
        { date: '24/03/07', create: 4, delete: 2, clientTotal: 21 },
        { date: '24/03/08', create: 3, delete: 2, clientTotal: 24 },
        { date: '24/03/09', create: 2, delete: 3, clientTotal: 26 },
        { date: '24/03/10', create: 3, delete: 8, clientTotal: 29 },
        { date : '24/03/11', create: 2, delete: 1, clientTotal: 31},
        { date : '24/03/12', create: 3, delete: 2, clientTotal: 34},
        { date : '24/03/13', create: 2, delete: 4, clientTotal: 36},
        { date : '24/03/14', create: 3, delete: 5, clientTotal: 39},
        { date : '24/03/15', create: 2, delete: 7, clientTotal: 41},
        { date : '24/03/16', create: 3, delete: 1, clientTotal: 44},
      ]);
    } else {
      setData([
        { date: '24/03', create: 23, delete: 5, clientTotal: 67 },
        { date: '24/04', create: 15, delete: 1, clientTotal: 102 },
        { date: '24/05', create: 18, delete: 3, clientTotal: 115 },
        { date: '24/06', create: 20, delete: 1, clientTotal: 126 },
        { date: '24/07', create: 13, delete: 5, clientTotal: 129 },
        { date: '24/08', create: 19, delete: 2, clientTotal: 136 },
        { date: '24/09', create: 24, delete: 1, clientTotal: 149 },
        { date: '24/10', create: 18, delete: 3, clientTotal: 154 },
        { date: '24/11', create: 20, delete: 2, clientTotal: 162 },
        { date: '24/12', create: 24, delete: 1, clientTotal: 173}
      ]);
    }
  };
  updateDataByMode();
}, [graphMode]);

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
        <Typography onClick={toggleGraphMode} sx={{ cursor: 'pointer',fontSize:'0.825rem', paddingRight:'0.825rem', paddingTop:'0.125rem'}} style={{color:'#558BCF'}}>
          {graphMode === 'daily' ? '일 별' : '월 별'}
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
      {notices.map((notice, index) => (
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
              
              {users.map((user, index) => (
             <Box key={index} sx={{ width: '100%', display:'flex', alignItems:'center' }}>
              {user.profileFile === null ? (
                <Avatar src="/broken-mage.jpg" style={{width: '2.25rem', height: '2.25rem', marginTop:'0.825rem', marginLeft:'1rem'}}/> 
                  ) : (
                      <img src={`https://kr.object.ncloudstorage.com/bitcamp-bucket-36/` + user.profileFile} alt='thumbnail' style={{width: '2.25rem', height: '2.25rem', marginTop:'0.825rem', marginLeft:'1rem', borderRadius:'70%'}}/> 
                    )}
                <CoTypography size="AdminNotice">{user.userNickname}&nbsp;({user.role === "ADMIN" ? "관리자" : user.role === "ROLE_USER" ? "유저" : user.role === "ROLE_TEACHER" ? "강사" : ""})&nbsp;|&nbsp;날짜</CoTypography>
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
  
      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            width: '15rem',
            boxSizing: 'border-box',
            alignItems:'center',
          },
        }}
        variant="persistent"
        anchor="left"
        open={isMenuOpen}
      >
        <img
          src="/images/team_logo.png"
          alt="team_logo"
          height="30rem"
          width="150rem"
          style={{ paddingTop: "2rem", cursor: "pointer" }}
        />
        <List>
          <ListItem
            button
            onClick={toggleMenu}
            sx={{
              display: '-webkit-inline-box',
              '&:hover': {
                color: '#558BCF',
                '& .MuiSvgIcon-root': {
                  fill: '#558BCF',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: '2.5rem'}}>
              <MenuIcon sx={{ color: isMenuOpen ? 'inherit' : '#558BCF' }} />
            </ListItemIcon>
            <ListItemText primary="메뉴" />
          </ListItem>
          <ListItem
            button
            onClick={() => toggleSubmenu("메뉴 1")}
            sx={{ textAlign: '-webkit-center', color: submenuOpen["메뉴 1"] ? '#558BCF' : '' }}
          >
            <GroupIcon sx={{ marginRight: '0.725rem', color: submenuOpen["메뉴 1"] ? '#558BCF' : '' }} />
            <ListItemText primary="사용자 관리" />
            <KeyboardArrowDownIcon sx={{ color: submenuOpen["메뉴 1"] ? '#558BCF' : '' }} />
          </ListItem>
          {submenuOpen["메뉴 1"] && (
            <List>
              {['하위 메뉴 1', '하위 메뉴 2', '하위 메뉴 3'].map((submenu, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => setSelectedSubmenu1(submenu === selectedSubmenu1 ? null : submenu)} 
                  sx={{ color: selectedSubmenu1 === submenu ? '#558BCF' : '' }}
                >
                  <ListItemText primary={submenu} />
                </ListItem>
              ))}
            </List>
          )}
          <ListItem
            button
            onClick={() => toggleSubmenu("메뉴 2")}
            sx={{ textAlign: '-webkit-center', color: submenuOpen["메뉴 2"] ? '#558BCF' : '' }}
          >
            <CreateIcon sx={{ marginRight: '0.725rem', color: submenuOpen["메뉴 2"] ? '#558BCF' : '' }} />
            <ListItemText primary="게시글 관리" />
            <KeyboardArrowDownIcon sx={{ color: submenuOpen["메뉴 2"] ? '#558BCF' : '' }} />
          </ListItem>
          {submenuOpen["메뉴 2"] && (
            <List>
              {['하위 메뉴 1', '하위 메뉴 2', '하위 메뉴 3'].map((submenu, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => setSelectedSubmenu2(submenu === selectedSubmenu2 ? null : submenu)} 
                  sx={{ color: selectedSubmenu2 === submenu ? '#558BCF' : '' }}
                >
                  <ListItemText primary={submenu} />
                </ListItem>
              ))}
            </List>
          )}
          <ListItem
            button
            onClick={() => toggleSubmenu("메뉴 3")}
            sx={{ textAlign: '-webkit-center', color: submenuOpen["메뉴 3"] ? '#558BCF' : '' }}
          >
            <ListItemText primary="메뉴 3" />
          </ListItem>
          {submenuOpen["메뉴 3"] && (
            <List>
              {['하위 메뉴 1', '하위 메뉴 2', '하위 메뉴 3'].map((submenu, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => setSelectedSubmenu3(submenu === selectedSubmenu3 ? null : submenu)} 
                  sx={{ color: selectedSubmenu3 === submenu ? '#558BCF' : '' }}
                >
                  <ListItemText primary={submenu} />
                </ListItem>
              ))}
            </List>
          )}
        </List>
      </Drawer>
      {/* 컨텐츠 */}
      <div className="admin-content">
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
