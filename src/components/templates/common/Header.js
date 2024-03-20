import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../../../scss/Header.scss';
import { Button, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navi = useNavigate();  
  const isLogin = sessionStorage.getItem('ACCESS_TOKEN') ? true : false;

  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);


  const handleLogout = () => {
        const response = axios.get(
        `http://localhost:9090/member/logout`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
            }
        }
    ).then(response => {
         if (response.data.item && response.data.statusCode === 200) {
              sessionStorage.removeItem("ACCESS_TOKEN");
              window.alert('로그아웃 성공.');
              navi("/login");
              } else {
                window.alert('로그아웃 실패.');  
              };
    });
  }

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box display="flex"  sx={{marginTop: '1rem'}}>
      <img src='/images/team_logo.png' alt='team_logo' height='30rem' width='150rem' style={{paddingTop:'0.125rem'}}/>
      <Button style={{color: 'black'}} onClick={handleClick1} sx={{paddingTop: '3px', marginLeft: '1rem', maxHeight:'2.3rem'}}>
          강의
      </Button>
      <Menu
        id="simple-menu1"
        anchorEl={anchorEl1}
        keepMounted
        open={Boolean(anchorEl1)}
        onClose={handleClose1}
      >
        <MenuItem onClick={handleClose1}>웹 개발</MenuItem>
        <MenuItem onClick={handleClose1}>프론트엔드</MenuItem>
        <MenuItem onClick={handleClose1}>백엔드</MenuItem>
        <MenuItem onClick={handleClose1}>풀스택</MenuItem>
        <MenuItem onClick={handleClose1}>모바일 앱 개발</MenuItem>
        <MenuItem onClick={handleClose1}>알고리즘 · 자료구조</MenuItem>
        <MenuItem onClick={handleClose1}>데이터베이스</MenuItem>
        <MenuItem onClick={handleClose1}>데브옵스 · 인프라</MenuItem>
        <MenuItem onClick={handleClose1}>소프트웨어 테스트</MenuItem>
        <MenuItem onClick={handleClose1}>개발 도구</MenuItem>
      </Menu>
      <Button style={{color: 'black'}} onClick={handleClick2} sx={{paddingTop: '3px', marginLeft: '1rem', maxHeight:'2.3rem'}}>
          커뮤니티
      </Button>
      <Menu
        id="simple-menu2"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
      >
        <MenuItem onClick={handleClose2}><Link to="/notice">공지사항</Link></MenuItem>
        <MenuItem onClick={handleClose2}>1 대 1 문의</MenuItem>
        <MenuItem onClick={handleClose2}>메롱</MenuItem>
      </Menu>
      <TextField sx={{marginLeft: '2.5rem',
         width:'40rem', 
        '& .MuiInputBase-input': {
         height: '1rem', 
        padding: '10px',
        '&::placeholder': {
        textAlign: 'center',
              },
            },
          }} 
          placeholder='검색어를 입력해주세요.'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {isLogin ? (
          <>
            <Button onClick={handleLogout} style={{color: 'black'}} sx={{marginLeft: '2rem', maxHeight:'2.3rem'}}>로그아웃</Button>
            <Button style={{color: 'black'}} sx={{marginLeft: '2rem', maxHeight:'2.3rem'}}>마이페이지</Button>
          </>
        ) : (
          <>
             <Button onClick={() => navi('/login')} style={{color: 'black'}} sx={{marginLeft: '2rem', maxHeight:'2.3rem'}} >
              로그인
             </Button>
              <Button onClick={() => navi('/join')} style={{color: 'black'}} sx={{marginLeft: '2rem', maxHeight:'2.3rem'}}>
              회원가입
             </Button>
          </>
        )}
    </Box>
  );
};

export default Header;