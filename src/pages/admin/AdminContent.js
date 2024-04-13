import React, { useEffect } from 'react'
import { Box, Paper, FormControl, InputLabel, Select, MenuItem, TextField, InputAdornment, IconButton, Table, TableHead, TableRow, TableCell, Hidden,TableBody, Button } from '@mui/material'
import CoTypography from '../../components/atoms/common/CoTypography';
import SearchIcon from '@mui/icons-material/Search';
import Check from '@mui/icons-material/Check';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import AdminStore from '../../stores/AdminStore';
import { MenuContext } from './MenuContext';
import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';

const AdminContent = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('all');
    const {  setSearchCondition,setSearchKeyword,setPage,page ,searchKeyword,searchCondition, contents,getContentsList} = AdminStore();
    const navi = useNavigate();
    const menuItems = [
        { key: 'all', value: '전체' },
        { key: '개발 · 프로그래밍', value: '개발 · 프로그래밍'},
        { key: '게임 개발', value: '게임 개발' },
        { key: '데이터 사이언스', value: '데이터 사이언스'},
        { key: '인공지능', value: '인공지능'},
        { key: '보안 · 네트워크', value: '보안 · 네트워크'},
        { key: '비즈니스 · 마케팅', value: '비즈니스 · 마케팅'},
        { key: '하드웨어', value: '하드웨어'},
        { key: '웹 디자인', value: '웹 디자인'},
      ];

      const handleContent = (contentId) => {
        navi(`/detail/${contentId}`);
        };

      useEffect(() => {
        getContentsList();
        }, [page, searchCondition, searchKeyword]);

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

    const formtDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

const { toggleMenu } = useContext(MenuContext);

  return (
    console.log(contents),
    <>
    <Box sx={{display:'flex', alignItems:'center', marginTop:'1.625rem',marginBottom:'1rem'}}>
      <IconButton onClick={toggleMenu}>
            <MenuIcon />
        </IconButton>
        <CoTypography size="MainTitle">게시물 관리</CoTypography>
    </Box>
    <Box sx={{display:'flex'}}>
    <Paper sx={{ width: '30%' }}>
    <FormControl fullWidth>
      <InputLabel id="menu-select-label">카테고리</InputLabel>
      <Select
        labelId="menu-select-label"
        value={selectedMenuItem}
        onChange={handleSearchConditionChange}
        inputProps={{
          name: 'searchCondition',
        }}
        sx={{
          '& .MuiSelect-select': {
            color: selectedMenuItem === '전체' || '공지사항' || '강의'  ? '#558BCF' : 'inherit',
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
        placeholder="게시물 제목"
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
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{display:'flex', alignItems:'center', paddingRight:'0'}}>
            <CoTypography variant="AdminUser" sx={{paddingLeft:'0'}}>카테고리</CoTypography>
          </TableCell>
          <TableCell><CoTypography variant="AdminUser">제목</CoTypography></TableCell>
          <Hidden smDown>
          <TableCell><CoTypography variant="AdminUser">작성자</CoTypography></TableCell>
          <TableCell><CoTypography variant="AdminUser">작성일</CoTypography></TableCell>
            <TableCell><CoTypography variant="AdminUser">가격</CoTypography></TableCell>
          </Hidden>
        </TableRow>
      </TableHead>
      {contents.content && contents.content.map((content) => (
        <TableBody key={content.contentsId}>
            <TableRow onClick={() => handleContent(content.contentsId)} sx={{cursor:'pointer'}}>
            <TableCell sx={{display:'flex', alignItems:'center', paddingRight:'0'}}>
                <CoTypography variant="AdminUser" sx={{paddingLeft:'0'}}>{content.category}</CoTypography>
            </TableCell>
            <TableCell><CoTypography variant="AdminUser">{content.contentsTitle}</CoTypography></TableCell>
            <Hidden smDown>
            <TableCell><CoTypography variant="AdminUser">{content.memberId}</CoTypography></TableCell>
            <TableCell><CoTypography variant="AdminUser">{formtDate(content.regDate)}</CoTypography></TableCell>
                <TableCell><CoTypography variant="AdminUser">{content.price}원</CoTypography></TableCell>
            </Hidden>
            </TableRow>
        </TableBody>
        ))}
    </Table>
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <Pagination color='primary' count={contents.totalPages} page={page + 1} onChange={handlePageChange} />
      </Box>
    </Paper>
 </>
  )
}

export default AdminContent
