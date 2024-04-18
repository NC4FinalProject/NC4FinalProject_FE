import React, { useEffect, useState } from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import CoTypography from '../../atoms/common/CoTypography';
import axios from 'axios';

const PurchaseHistory = () => {
  const [purchaseList, setPurchaseList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  const getPurchaseList = async (page) => {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_BACK_URL}/mypage/purchaselist`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
          },
          params: {
            page: page,
          }
        }
      );
      setPurchaseList(response.data.pageItems);
      setTotalPages(response.data.pageItems.totalPages);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getPurchaseList(page);
  }, [page]);

  const changePage = (e, v) => {
    setPage(parseInt(v) - 1);
  }

  return (
    <Paper sx={{ width: '100%', height: 'auto', marginTop:'1rem' }}>
      <Table>
        <TableHead>
          <TableRow  sx={{ textAlignLast: 'center' }}>
            <TableCell><CoTypography size="AdminUser">구매일</CoTypography></TableCell>
            <TableCell><CoTypography size="AdminUser">강의명</CoTypography></TableCell>
            <TableCell><CoTypography size="AdminUser">강사</CoTypography></TableCell>
            <TableCell><CoTypography size="AdminUser">금액</CoTypography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {purchaseList.content && purchaseList.content.map((purchase, index) => (
          <TableRow key={index}>              
            <TableCell sx={{ textAlignLast: 'center' }}><CoTypography size="AdminUser">{purchase.paymentDate.substring(0, 10)}</CoTypography></TableCell>
            <TableCell><CoTypography size="AdminUser">{purchase.contentsTitle}</CoTypography></TableCell>
            <TableCell sx={{ textAlignLast: 'center' }}><CoTypography size="AdminUser">{purchase.teacherName}</CoTypography></TableCell>
            <TableCell sx={{ textAlignLast: 'center' }}><CoTypography size="AdminUser">{purchase.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "원"}</CoTypography></TableCell>
         </TableRow>
        ))}
        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <Pagination count={totalPages} page={page + 1} onChange={changePage} color='primary' />
      </Box>
    </Paper>
  )
}

export default PurchaseHistory