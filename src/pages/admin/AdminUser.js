import React from 'react'
import { useContext, useState, useEffect } from 'react';
import { MenuContext } from './MenuContext';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CoTypography from '../../components/atoms/common/CoTypography';
import { Box, Select, MenuItem, FormControl, InputLabel, Paper , TextField, Table, DialogActions,TableBody, TableCell, TableHead, TableRow, Hidden, Dialog,DialogTitle,DialogContent,Button} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Check from '@mui/icons-material/Check';
import Pagination from '@mui/material/Pagination';
import AdminStore from '../../stores/AdminStore';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminUser = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('all');
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const { userInfo, MemberInfo,setSearchCondition,setSearchKeyword,setPage,page ,searchKeyword,searchCondition} = AdminStore();

  const [memo, setMemo] = useState('');
  const [open, setOpen] = useState(false);
  
  const handleOpen = (id, memo) => {
    setSelectedMemberId(id);
    setMemo(memo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveMemo = async () => {
    try {
      const memoData = {
        memo: memo, 
        id: selectedMemberId
      };
      await axios.post(`http://${process.env.REACT_APP_BACK_URL}/admin/user/memo`,
        memoData, 
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
          },
        }
      );
    setOpen(false);
  } catch (error) {
    console.log('에러:', error);
  }
};
  const menuItems = [
    { key: 'all', value: '전체' },
    { key: 'ADMIN', value: '관리자' },
    { key: 'TEACHER', value: '강사' },
    { key: 'USER', value: '수강생' },
    { key: 'RESIGNED', value: '탈퇴' },
    { key: 'BLACKLIST', value: '블랙' },
    { key: 'PRETEACHER', value: '강사 신청' },
  ];
  const navi = useNavigate();

  const handleUser = (userId) => {
    navi(`/admin/user/${userId}`);
  };


  useEffect(() => {
    const fetchData = async () => { 
      await userInfo();
    };
    fetchData();
  }, [searchKeyword, page, searchCondition, userInfo]);


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

  const formtDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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
              color: selectedMenuItem === '전체' || '관리자' || '강사' || '수강생' || '블랙' || '강사 신청' || '탈퇴' ? '#558BCF' : 'inherit',
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
      <Table>
        <TableHead >
          <TableRow>
            <TableCell sx={{display:'flex', alignItems:'center', paddingRight:'0'}}>
              <CoTypography variant="AdminUser" sx={{paddingLeft:'0'}}>블랙 여부</CoTypography>
              <Check sx={{ color: '#558BCF', paddingBottom:'0.2rem', paddingLeft: '0.2rem' }} />
            </TableCell>
            <TableCell><CoTypography variant="AdminUser">닉네임</CoTypography></TableCell>
            <Hidden smDown>
            <TableCell><CoTypography variant="AdminUser">아이디</CoTypography></TableCell>
            <TableCell><CoTypography variant="AdminUser">권한</CoTypography></TableCell>
              <TableCell><CoTypography variant="AdminUser">계정 생성일</CoTypography></TableCell>
            </Hidden>
            <TableCell><CoTypography variant="AdminUser" sx={{paddingLeft:'0'}}>메모</CoTypography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {MemberInfo.content && MemberInfo.content.map((member) => (
            <TableRow key={member.id}  sx={{cursor: 'pointer'}}>
              <TableCell onClick={() => handleUser(member.memberId)}>
              {member.role === 'BLACKLIST' ? (
                <CheckBoxIcon
                  sx={{ color: '#558BCF', paddingLeft: '1.825rem' }}
                />) : (
                  <CheckBoxOutlineBlankIcon
                  sx={{ color: '#558BCF', paddingLeft: '1.825rem' }}
                />)}
              </TableCell>
              <TableCell onClick={() => handleUser(member.memberId)}>
                <CoTypography variant="AdminUser">{member.userNickname}</CoTypography>
              </TableCell>
              <Hidden smDown>
              <TableCell onClick={() => handleUser(member.memberId)}>
                <CoTypography variant="AdminUser">{member.username}</CoTypography>
              </TableCell>
              <TableCell onClick={() => handleUser(member.memberId)}>
                <CoTypography sx={{ color: member.role === 'RESIGNED' ? 'red' : 'inherit' }}>
                                                   {member.role === 'ADMIN' ? '관리자' :
                                                    member.role === 'TEACHER' ? '강사' :
                                                    member.role === 'RESIGNED' ? '탈퇴 회원' :
                                                    member.role === 'USER' ? '수강생' :
                                                    member.role === 'BLACKLIST' ? '블랙' :
                                                    member.role === 'PRETEACHER' ? '강사 신청' : 'null'}
                </CoTypography>
              </TableCell>
                <TableCell onClick={() => handleUser(member.memberId)}>
                  <CoTypography variant="AdminUser">{formtDate(member.createdAt)}</CoTypography>
                </TableCell>
              </Hidden>
              <TableCell>
              {member.memo ? (
                <NoteAltIcon
                  sx={{ marginLeft: '0.175rem', cursor: 'pointer', color: '#558BCF' }}
                  onClick={() => handleOpen(member.id, member.memo)}
                />
              ) : (
                <NoteAltIcon
                  sx={{ marginLeft: '0.175rem', cursor: 'pointer' }}
                  onClick={() => handleOpen(member.id, member.memo)}
                />
              )}
              </TableCell>
            </TableRow>
          ))}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>메모 입력</DialogTitle>
          <DialogContent style={{ minWidth: '18.5rem', overflow: 'hidden' }}>
            <textarea
              rows={3}
              maxLength={300}
              placeholder="최대 300자까지 가능합니다."
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              style={{ width: '100%', resize: 'none', height:'15rem'}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handleSaveMemo} variant="contained" color="primary">저장</Button>
          </DialogActions>
        </Dialog>
        </TableBody>
      </Table>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <Pagination color='primary' count={MemberInfo.totalPages} page={page + 1} onChange={handlePageChange} />
      </Box>
      </Paper>
   </>
  )
}

export default AdminUser
