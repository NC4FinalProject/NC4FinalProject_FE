import React, { useState, useEffect } from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import CoTypography from '../../atoms/common/CoTypography';

const Point = () => {

  const [pointDTOList, setPointDTOList] = useState([]);
  const [pointSumList, setPointSumList] = useState([0]);

  const initialize = async e => {
    try { 
      const response = await axios.get(`http://localhost:9090/mypage`, 
              {
                  headers: {
                      Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                  }
              });

              const points = response.data.item.pointDTOList;
              setPointDTOList(points);

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
                <TableCell sx={{ textAlignLast: 'center' }}><CoTypography size="AdminUser">{pointDTO.createdAt}</CoTypography></TableCell>
                <TableCell><CoTypography size="AdminUser">{pointDTO.reason}</CoTypography></TableCell>
                <TableCell sx={{ textAlignLast: 'center' }}><CoTypography size="AdminUser">{pointDTO.value}</CoTypography></TableCell>
                <TableCell sx={{ textAlignLast: 'center' }}><CoTypography size="AdminUser">{pointSumList[index]}</CoTypography></TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <Pagination color='primary' />
        </Box>
      </Paper>
   </>
  )
}

export default Point