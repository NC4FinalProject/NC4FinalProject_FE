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
import CoTypography from '../../atoms/common/CoTypography';
import { Typography } from '@mui/material';

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
      <Typography sx={{cursor: 'pointer','&:hover': {color: 'primary.main' },}} onClick={() => console.log('텍스트 클릭됨!')}>강의</Typography>
      <Button onMouseOver={(e) => {e.target.style.color='#558BCF';}} onMouseOut={(e) => {e.target.style.color='black';}} onClick={handleClick2} sx={{paddingTop: '3px', marginLeft: '1rem', maxHeight:'2.3rem', color: 'black', '&:hover': {color: 'primary'}}}>
          커뮤니티
      </Button>
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
            <Button onClick={() => navi('/mypage')} style={{color: 'black'}} sx={{marginLeft: '2rem', maxHeight:'2.3rem'}}>마이페이지</Button>
          </>
        ) : (
          <>
             <Button onClick={() => navi('/login')} style={{color: 'black'}} sx={{marginLeft: '2rem', maxHeight:'2.3rem'}} >
              로그인
             </Button>
              <Button onClick={() => navi('/join')} style={{color: 'black', fontSize:'1rem'}} sx={{marginLeft: '2rem', maxHeight:'2.3rem'}}>
              회원가입
             </Button>
          </>
        )}
    </Box>
  );
};

export default Header;