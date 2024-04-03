import React from 'react'
import { useContext, useState } from 'react';
import { MenuContext } from './MenuContext';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CoTypography from '../../components/atoms/common/CoTypography';
import { Box, Select, MenuItem, FormControl, InputLabel, Paper , TextField, Hidden } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Pagination from '@mui/material/Pagination';
import { useEffect } from 'react';
import AdminStore from '../../stores/AdminStore';

const AdminUser = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('all');
  const { userInfo, MemberInfo,setSearchCondition,setSearchKeyword,setPage,page ,searchKeyword,searchCondition} = AdminStore();

  const menuItems = [
    { key: 'all', value: '전체' },
    { key: 'admin', value: '관리자' },
    { key: 'teacher', value: '강사' },
    { key: 'student', value: '수강생' },
  ];

  useEffect(() => {
    const fetchData = async () => { 
      await userInfo();
    };
    fetchData();
  }, [searchKeyword, userInfo, page, searchCondition]);

  const handlePageChange = (event, value) => {
    setPage(value - 1); 
  };

  const handleSearchConditionChange = (event) => {
    setSearchCondition(event.target.value);
    setSelectedMenuItem(event.target.value);
  };

  const handleSearchKeywordChange = (event) => {
    setSearchKeyword(event.target.value);
  };
  const { toggleMenu } = useContext(MenuContext);

  return (
    <>
      <Box sx={{display:'flex', alignItems:'center', marginTop:'1.625rem',marginBottom:'1rem'}}>
        <IconButton onClick={toggleMenu}>
              <MenuIcon />
          </IconButton>
          <CoTypography size="MainTitle">사용자 목록</CoTypography>
      </Box>
      <Box sx={{display:'flex'}}>
      <Paper sx={{ width: '30%' }}>
      <FormControl fullWidth>
        <InputLabel id="menu-select-label">사용자</InputLabel>
        <Select
          labelId="menu-select-label"
          value={selectedMenuItem}
          onChange={handleSearchConditionChange}
          inputProps={{
            name: 'searchCondition',
          }}
          sx={{
            '& .MuiSelect-select': {
              color: selectedMenuItem === '전체' || '관리자' || '강사' || '수강생' ? '#558BCF' : 'inherit',
            },
          }}
        >
          {menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem.key}
              value={menuItem.key}
              sx={{
                '&.Mui-selected': {
                  color: '#558BCF',
                },
              }}
            >
              {menuItem.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
      <Paper sx={{ width: '70%', height: '3.5rem', boxSizing: 'border-box', marginLeft:'1rem' }}>
        <TextField
          placeholder="사용자 검색"
          fullWidth
          id="searchKeyword"
          name="searchKeyword"
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
          sx={{ boxSizing: 'border-box', "& .MuiInputBase-input": { textAlign: "center" } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>
      </Box>
      <Paper sx={{ width: '100%', height: 'auto', marginTop:'1rem' }}>
        <Box sx={{display:'flex' , justifyContent:'space-between', height:'2.75rem', alignItems:'center', borderBottom:'solid 1px #7d7d7d7d'}}>
          <CoTypography size="AdminUser" sx={{marginLeft:'1rem', display:'flex', alignItems:'center'}}>차단
          <CheckBoxOutlineBlankIcon sx={{marginLeft:'0.425rem', color:'#558BCF'}}/></CoTypography>
          <CoTypography size="AdminUser">닉네임</CoTypography>
          <CoTypography size="AdminUser">이메일</CoTypography>
          <CoTypography size="AdminUser">회원 유형</CoTypography>
          <Hidden >
            <CoTypography size="AdminUser">가입일</CoTypography>
            <CoTypography size="AdminUser">포인트</CoTypography>
            <CoTypography size="AdminUser">댓글 / 문의</CoTypography>
          </Hidden>
          <CoTypography size="AdminUser" sx={{marginRight:'1rem'}}>메모</CoTypography>
        </Box>
        {MemberInfo.content && MemberInfo.content.map((member) => (
        <Box sx={{display:'flex' , justifyContent:'space-between', height:'2.75rem', alignItems:'center'}}>
          <CheckBoxIcon sx={{marginLeft:'3.125rem', color:'#558BCF'}}/>
          <CoTypography size="AdminUser">{member.userNickname}</CoTypography>
          <CoTypography size="AdminUser">{member.username}</CoTypography>
          <CoTypography size="AdminUser">{member.role}</CoTypography>
          <Hidden smDown>
            <CoTypography size="AdminUser">{member.createdAt}</CoTypography>
            <CoTypography size="AdminUser">포인트</CoTypography>
            <CoTypography size="AdminUser">댓글 / 문의</CoTypography>
          </Hidden>
          <CoTypography size="AdminUser" sx={{marginRight:'1rem'}}>메모</CoTypography>
        </Box>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <Pagination color='primary' count={MemberInfo.totalPages} page={page + 1} onChange={handlePageChange} />
      </Box>
      </Paper>
   </>
  )
}

export default AdminUser
