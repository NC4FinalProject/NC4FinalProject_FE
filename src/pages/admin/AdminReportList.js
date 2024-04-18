import { React, useState} from 'react'
import { Box, Paper, FormControl, InputLabel, Select, MenuItem, TextField, InputAdornment, IconButton, Table, TableHead, TableRow, TableCell, Hidden,TableBody, Button } from '@mui/material'
import CoTypography from '../../components/atoms/common/CoTypography';
import SearchIcon from '@mui/icons-material/Search';
import Check from '@mui/icons-material/Check';
import Pagination from '@mui/material/Pagination';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import AdminStore from '../../stores/AdminStore';
import { MenuContext } from './MenuContext';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Reportdialog from '../../components/organisms/review/Reportdialog';
import CoSelect from '../../components/organisms/common/CoSelect';
import MemberStore from '../../stores/MemberStore';

const AdminReportList = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('all');
    const {  searchKeyword, setSearchCondition, setSearchKeyword } = AdminStore();
    const [openReport, setOpenReport] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const { userInfo } = MemberStore();

    const menuItems = [
        { key: 'all', value: '전체' },
        { key: 'ADMIN', value: '욕설 및 혐오 발언' },
        { key: 'TEACHER', value: '스팸 및 불법 홍보' },
        { key: 'USER', value: '도배 및 중복 컨텐츠' },
        { key: 'RESIGNED', value: '기타' },

      ];

    const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
    };

    const OpenBlacklist = () => {
        setOpenReport(true);
    };

    const reportReasons = [
      "1일",
      "3일",
      "5일",
      "기타",
      "해지하기"
    ];

    const onSubmit = ( detailReason, selectedValue) => {
        console.log("detailReason: ", detailReason);
        console.log("selectedValue: ", selectedValue);
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
        <CoTypography size="MainTitle">신고 내역 목록</CoTypography>
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
            color: selectedMenuItem === '전체' || '욕설 및 혐오 발언' || '스팸 및 불법 홍보' || '도배 및 중복 컨텐츠' || '기타'  ? '#558BCF' : 'inherit',
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
        placeholder="신고자, 내용 검색"
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
            <CoTypography variant="AdminUser" sx={{paddingLeft:'0'}}>처리 여부</CoTypography>
            <Check sx={{ color: '#558BCF', paddingBottom:'0.2rem', paddingLeft: '0.2rem' }} />
          </TableCell>
          <TableCell><CoTypography variant="AdminUser">신고자</CoTypography></TableCell>
          <Hidden smDown>
          <TableCell><CoTypography variant="AdminUser">신고 대상자</CoTypography></TableCell>
          <TableCell><CoTypography variant="AdminUser">신고 내역</CoTypography></TableCell>
            <TableCell><CoTypography variant="AdminUser">신고 내용</CoTypography></TableCell>
            <TableCell><CoTypography variant="AdminUser">처리 상태</CoTypography></TableCell>
          </Hidden>
        </TableRow>
      </TableHead>
      <TableBody>
            <TableRow>
              <TableCell>
                  <CheckBoxOutlineBlankIcon
                  sx={{ color: '#558BCF', paddingLeft: '1.825rem' }}/>
              </TableCell>
              <TableCell>
                <CoTypography variant="AdminUser">손우성</CoTypography>
              </TableCell>
              <Hidden smDown>
              <TableCell>
                <CoTypography variant="AdminUser">매머드</CoTypography>
              </TableCell>
              <TableCell>
                <CoTypography>욕설 및 혐오 발언
                </CoTypography>
              </TableCell>
                <TableCell>
                  <CoTypography variant="AdminUser">지속적인 욕설 및 폭언 사용</CoTypography>
                </TableCell>
                <TableCell>
                <Button sx={{padding:'0', minWidth:'0'}} onClick={OpenBlacklist}>
                    <CoTypography size="HoverText">처리하기</CoTypography>
                </Button> 
               </TableCell>
                <Reportdialog open={openReport} handleClickClose={() => setOpenReport(false)}
                    author={userInfo}
                    Title="블랙리스트 추가 / 변경"
                    onSubmit={(detailReason) => onSubmit(detailReason, selectedValue)}                
                    selectComponent={
                    <Box sx={{ margin: "0.5rem auto 0", maxWidth: "27rem" }}>
                    <CoSelect onChange={handleSelectChange} value={selectedValue} options={reportReasons} />
                    </Box>
                    }>  
                    1. 정지 사유도 함께 적어주세요.
                </Reportdialog>
              </Hidden>
            </TableRow>
            <TableRow>
              <TableCell>
              <CheckBoxOutlineBlankIcon
                  sx={{ color: '#558BCF', paddingLeft: '1.825rem' }}/>
              </TableCell>
              <TableCell>
                <CoTypography variant="AdminUser">손우성</CoTypography>
              </TableCell>
              <Hidden smDown>
              <TableCell>
                <CoTypography variant="AdminUser">매머드</CoTypography>
              </TableCell>
              <TableCell>
                <CoTypography>욕설 및 혐오 발언
                </CoTypography>
              </TableCell>
                <TableCell>
                  <CoTypography variant="AdminUser">지속적인 욕설 및 폭언 사용. 그리고 스팸</CoTypography>
                </TableCell>
                <TableCell>
                <Button sx={{padding:'0', minWidth:'0'}} onClick={OpenBlacklist}>
                    <CoTypography size="HoverText">처리하기</CoTypography>
                </Button>                 </TableCell>
              </Hidden>
            </TableRow>
        </TableBody>
    </Table>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <Pagination color='primary' />
    </Box>
    </Paper>
 </>
  )
}

export default AdminReportList
