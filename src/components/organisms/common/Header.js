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
import CoHoverButton from '../../atoms/common/CoHoverButton';

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

  return (
    <Box display="flex"  sx={{marginTop: '1rem'}}>
      <img src='/images/team_logo.png' alt='team_logo' height='30rem' width='150rem' style={{paddingTop:'0.125rem'}} onClick={() => navi('/')}/>
      <CoHoverButton style={{marginLeft: '1rem'}} onClick={() => navi('/listpage')}>강의</CoHoverButton>
      <CoHoverButton style={{marginLeft: '1rem'}}>커뮤니티</CoHoverButton>
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
            <CoHoverButton onClick={handleLogout} style={{marginLeft: '2rem', maxHeight:'2.3rem'}}>로그아웃</CoHoverButton>
            <CoHoverButton onClick={() => navi('/mypage')} style={{marginLeft: '2rem', maxHeight:'2.3rem'}}>마이페이지</CoHoverButton>
          </>
        ) : (
          <>
             <CoHoverButton onClick={() => navi('/login')} style={{marginLeft: '2rem', maxHeight:'2.3rem'}}>
              로그인
             </CoHoverButton>
              <CoHoverButton onClick={() => navi('/join')} style={{marginLeft: '2rem', maxHeight:'2.3rem'}}>
              회원가입
             </CoHoverButton>
          </>
        )}
    </Box>
  );
};

export default Header;