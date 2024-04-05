import React from 'react'
import { Box, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import CoTypography from '../../atoms/common/CoTypography';

const Certificate = () => {
  return (
    <Paper sx={{ width: '100%', height: 'auto', marginTop:'1rem' }}>
      <Box sx={{display:'flex' , justifyContent:'space-around', height:'2.75rem', alignItems:'center', borderBottom:'solid 1px #7d7d7d7d'}}>
        <CoTypography size="AdminUser">순번</CoTypography>
        <CoTypography size="AdminUser">강의명</CoTypography>
        <CoTypography size="AdminUser">강사명</CoTypography>
        <CoTypography size="AdminUser">완강일</CoTypography>
        <CoTypography size="AdminUser">완강</CoTypography>
        <CoTypography size="AdminUser">인쇄</CoTypography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <Pagination color='primary' />
      </Box>
    </Paper>
  )
}

export default Certificate