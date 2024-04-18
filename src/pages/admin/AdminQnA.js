import React, { useState, useContext, useEffect } from 'react';
import CoTypography from '../../components/atoms/common/CoTypography';
import { Box, Paper, Pagination, FormControl, InputLabel, Select, MenuItem, TextField, InputAdornment, IconButton, Table, TableHead, TableRow, TableCell, Hidden, TableBody, Button } from '@mui/material';
import { MenuContext } from './MenuContext';
import AdminStore from '../../stores/AdminStore';
import MemberStore from '../../stores/MemberStore';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Check from '@mui/icons-material/Check';
import QnaDialog from '../../components/organisms/mypage/Qna';

const AdminQnA = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('all');
    const { searchKeyword, setSearchCondition, setSearchKeyword, getQnaAnswer, setPage, page, qnauser, searchCondition,sendQnaAnswer } = AdminStore();
    const { memberInfo } = MemberStore();
    const [openQna, setOpenQna] = useState(false);
    const [qnaData, setqnaData] = useState('');
    const [adminAnswer, setAdminAnswer] = useState('');

    const handleReasonChange = (event) => {
      setAdminAnswer(event.target.value);
  };
    const menuItems = [
        { key: 'all', value: '전체' },
        { key: '실시간 버그/서비스오류', value: '실시간 버그/서비스오류' },
        { key: '결제 / 지출증빙', value: '결제 / 지출증빙' },
        { key: '계정', value: '계정' },
        { key: '강의', value: '강의' },
        { key: '기타', value: '기타' }
    ];

    const handleQnaSubmit = () => {
      console.log(memberInfo.userNickname);
      console.log(adminAnswer);
      sendQnaAnswer(qnaData.id, memberInfo.userNickname, adminAnswer);
      alert('답변처리가 정상적으로 완료되었습니다.')
      getQnaAnswer();
    };

    useEffect(() => {
        getQnaAnswer();
    }, [searchCondition, searchKeyword, page])

    const OpenDialog = (qna) => {
      console.log(qna.answered);
      if(qna.answered) {
        setAdminAnswer(`${qna.content}`);
      } else{
      setAdminAnswer(`${qna.content} \n[RE :]\n안녕하세요${qna.askUser.userNickname}님! ${memberInfo.userNickname}입니다.\n`);
    }
      setOpenQna(true);
      setqnaData(qna);
    };

    const onSubmit = (detailReason) => {
        console.log("detailReason: ", detailReason);
    };

    const handleSearchConditionChange = (event) => {
        setSearchCondition(event.target.value);
        setSelectedMenuItem(event.target.value);
    };

    const handleSearchKeywordChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value - 1);
    };

    const { toggleMenu } = useContext(MenuContext);

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '1.625rem', marginBottom: '1rem' }}>
                <IconButton onClick={toggleMenu}>
                    <MenuIcon />
                </IconButton>
                <CoTypography size="MainTitle">1 대 1 문의 목록</CoTypography>
            </Box>
            <Box sx={{ display: 'flex' }}>
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
                        >
                            {menuItems.map((menuItem) => (
                                <MenuItem
                                    key={menuItem.key}
                                    value={menuItem.key}
                                >
                                    {menuItem.value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Paper>
                <Paper sx={{ width: '70%', height: '3.5rem', boxSizing: 'border-box', marginLeft: '1rem' }}>
                    <TextField
                        placeholder="닉네임 검색"
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
            <Paper sx={{ width: '100%', height: 'auto', marginTop: '1rem' }}>
                <Table>
                    <TableHead >
                        <TableRow>
                        <Hidden smDown>
                            <TableCell sx={{ display: 'flex', alignItems: 'center', paddingRight: '0' }}>
                                <CoTypography variant="AdminUser" sx={{ paddingLeft: '0' }}>처리 여부</CoTypography>
                                <Check sx={{ color: '#558BCF', paddingBottom: '0.2rem', paddingLeft: '0.2rem' }} />
                            </TableCell>
                        </Hidden>
                            <TableCell><CoTypography variant="AdminUser">문의자</CoTypography></TableCell>
                                <TableCell><CoTypography variant="AdminUser">문의 카테고리</CoTypography></TableCell>
                            <Hidden smDown>
                                <TableCell><CoTypography variant="AdminUser">문의 내용</CoTypography></TableCell>
                                <TableCell><CoTypography variant="AdminUser">문의 날짜</CoTypography></TableCell>
                            </Hidden>
                                <TableCell><CoTypography variant="AdminUser">처리 상태</CoTypography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {qnauser && qnauser.map((qna, index) => (
                            <TableRow key={index}>
                                <Hidden smDown>
                                <TableCell>
                                    {qna.answered ? (
                                        <CheckBoxIcon
                                            sx={{ color: '#558BCF', paddingLeft: '1.825rem' }} />
                                    ) : (<CheckBoxOutlineBlankIcon sx={{ color: '#558BCF', paddingLeft: '1.825rem' }} />
                                        )}
                                </TableCell>
                                </Hidden>
                                <TableCell>
                                    <CoTypography variant="AdminUser">{qna.askUser.userNickname}</CoTypography>
                                </TableCell>
                                    <TableCell>
                                        <CoTypography variant="AdminUser">{qna.category}</CoTypography>
                                    </TableCell>
                                <Hidden smDown>
                                    <TableCell sx={{maxWidth:'35rem'}}>
                                        <CoTypography>{qna.content}
                                        </CoTypography>
                                    </TableCell>
                                    <TableCell>
                                        <CoTypography variant="AdminUser">{qna.createdAt}</CoTypography>
                                    </TableCell>
                                    </Hidden>
                                    <TableCell>
                                        {qna.answered ? (
                                          <Button sx={{ padding: '0', minWidth: '0', color: 'black' }} onClick={() => OpenDialog(qna)}>
                                            <CoTypography size="HoverText" sx={{ color: '#558BCF' }}>처리완료</CoTypography>
                                          </Button>
                                        ) :
                                            (<Button sx={{ padding: '0', minWidth: '0', color: 'black' }} onClick={() => OpenDialog(qna)}>
                                                <CoTypography size="HoverText">처리하기</CoTypography>
                                            </Button>
                                            )}
                                    </TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    <Pagination color='primary' count={qnauser.totalPages} page={page + 1} onChange={handlePageChange} />
                </Box>
                        <QnaDialog open={openQna} handleClickClose={() => setOpenQna(false)} Title="1 대 1 문의" 
                          author={memberInfo && memberInfo.userNickname}
                          detailReason={adminAnswer}
                          category={qnaData.category}
                          onSubmit={handleQnaSubmit}
                          handleReasonChange={handleReasonChange}
                        />
            </Paper>

        </>
    )
}

export default AdminQnA;
