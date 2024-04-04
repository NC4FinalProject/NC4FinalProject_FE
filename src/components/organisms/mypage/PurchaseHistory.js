import React from 'react'
import { Box, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import CoTypography from '../../atoms/common/CoTypography';

const PurchaseHistory = () => {
  return (
    <Paper sx={{ width: '100%', height: 'auto', marginTop:'1rem' }}>
      <Box sx={{display:'flex' , justifyContent:'space-around', height:'2.75rem', alignItems:'center', borderBottom:'solid 1px #7d7d7d7d'}}>
          <CoTypography size="AdminUser">구매일</CoTypography>
          <CoTypography size="AdminUser">강의명</CoTypography>
          <CoTypography size="AdminUser">강사</CoTypography>
          <CoTypography size="AdminUser">금액</CoTypography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <Pagination color='primary' />
      </Box>
    </Paper>
  )
}

export default PurchaseHistory