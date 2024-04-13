import React, { useState, useEffect } from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import CoTypography from '../../atoms/common/CoTypography';

const Point = () => {

  const [pointDTOList, setPointDTOList] = useState([]);
  const [pointSumList, setPointSumList] = useState([0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([1]);

  const initialize = async e => {
    try { 
      const response = await axios.get(`http://${process.env.REACT_APP_BACK_URL}/mypage`,
              {
                  headers: {
                      Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                  }
              });

              const points = response.data.item.pointDTOList;
              setPointDTOList(points);
              setTotalPages(Math.floor(points.length/10) + 1);

              const sumList = [];
              let sum = 0;
              for (let i = points.length-1; i >= 0; i--) {
                sum += points[i].value;
                sumList.push(sum);
              }
              sumList.reverse();
              setPointSumList(sumList);
            } catch (error) {
            }
        }
  
  const handlePageChange = (event, page) => {
    setCurrentPage(page); // 페이지 변경 시 currentPage 업데이트
    console.log(currentPage);
  };

  useEffect( () => {
    initialize();
}, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CoTypography size="AdminUser">포인트 내역</CoTypography>
        <CoTypography size="AdminUser"></CoTypography>
      </Box>
      <Paper sx={{ width: '100%', height: 'auto', marginTop:'1rem' }}>
          <Table>
            <TableHead>
              <TableRow  sx={{ textAlignLast: 'center' }}>
                <TableCell>
                  <CoTypography size="AdminUser">변경일</CoTypography></TableCell>
                <TableCell><CoTypography size="AdminUser">변경 사유</CoTypography></TableCell>
                <TableCell><CoTypography size="AdminUser">변경 포인트</CoTypography></TableCell>
                <TableCell><CoTypography size="AdminUser">누계</CoTypography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {pointDTOList.map((pointDTO, index) => (
              <TableRow key={index}>
                { index >= (currentPage-1)*10 && index < currentPage*10 ? (
                  <>                
                <TableCell sx={{ textAlignLast: 'center' }}><CoTypography size="AdminUser">{pointDTO.createdAt}</CoTypography></TableCell>
                <TableCell><CoTypography size="AdminUser">{pointDTO.reason}</CoTypography></TableCell>
                <TableCell sx={{ textAlignLast: 'center' }}><CoTypography size="AdminUser">{pointDTO.value}</CoTypography></TableCell>
                <TableCell sx={{ textAlignLast: 'center' }}><CoTypography size="AdminUser">{pointSumList[index]}</CoTypography></TableCell>
                </>
                ) : (
                <></>
                ) }
                
              </TableRow>
            ))}
            </TableBody>
          </Table>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <Pagination color='primary' count={totalPages} page={currentPage} onChange={handlePageChange} />
        </Box>
      </Paper>
   </>
  )
}

export default Point