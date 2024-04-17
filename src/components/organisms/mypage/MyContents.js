import React, { useEffect, useState } from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CoTypography from '../../atoms/common/CoTypography';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';

const MyContents = () => {
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [teacherContentsList, setTeacherContentsList] = useState([]);

    const navi = useNavigate();

    const handleInsert = () => {
        navi('/insert');
    }

    const getTeacherContentsList = async (page) => {
      try {
        const response = await axios.get(
          `http://localhost:9090/contents/teachercontentslist`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
            },
            params: {
              page: page
            }
          }
        );

        console.log(response);
        setTeacherContentsList(response.data.pageItems);
        setTotalPages(response.data.pageItems.totalPages);
      } catch(e) {
        console.log(e);
      }
    }

    useEffect(() => {
      getTeacherContentsList(page);
    }, [page]);
  return (
    <div>
        <Button onClick={handleInsert}>컨텐츠 등록</Button>
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
          {/* {purchaseList.content && purchaseList.content.map((purchase, index) => (
            <TableRow key={index}>              
              <TableCell sx={{ textAlignLast: 'center' }}><CoTypography size="AdminUser">{purchase.paymentDate.substring(0, 10)}</CoTypography></TableCell>
              <TableCell><CoTypography size="AdminUser">{purchase.contentsTitle}</CoTypography></TableCell>
              <TableCell sx={{ textAlignLast: 'center' }}><CoTypography size="AdminUser">{purchase.teacherName}</CoTypography></TableCell>
              <TableCell sx={{ textAlignLast: 'center' }}><CoTypography size="AdminUser">{purchase.price + "원"}</CoTypography></TableCell>
          </TableRow>
          ))} */}
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <Pagination count={10} color='primary' />
        </Box>
      </Paper>
    </div>
  )
}

export default MyContents