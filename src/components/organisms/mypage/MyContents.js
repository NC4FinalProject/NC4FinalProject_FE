import React, { useEffect, useState } from 'react'
import { Box, Rating, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
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
          `http://${process.env.REACT_APP_BACK_URL}/contents/teachercontentslist`,
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

    const goDetail = (contentsId) => {
      navi(`/detail/${contentsId}`);
    }

    const handleDelete = async (contentsId) => {
      try {
        const response = await axios.delete(
          `http://${process.env.REACT_APP_BACK_URL}/contents/delete/${contentsId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
            }
          }
        );

        setTeacherContentsList(response.data.pageItems);
        setTotalPages(response.data.pageItems.totalPages);
      } catch(e) {
        console.log(e);
      }
    }

    const changePage = (e, v) => {
      setPage(parseInt(v) - 1);
    }

    
  return (
    <div>
        <Button onClick={handleInsert}>컨텐츠 등록</Button>
        <Paper sx={{ width: '100%', height: 'auto', marginTop:'1rem' }}>
        <Table>
          <TableHead>
            <TableRow  sx={{ textAlignLast: 'center' }}>
              <TableCell><CoTypography size="AdminUser">강의번호</CoTypography></TableCell>
              <TableCell><CoTypography size="AdminUser">강의명</CoTypography></TableCell>
              <TableCell><CoTypography size="AdminUser">카테고리</CoTypography></TableCell>
              <TableCell><CoTypography size="AdminUser">금액</CoTypography></TableCell>
              <TableCell><CoTypography size="AdminUser">평점(리뷰개수)</CoTypography></TableCell>
              <TableCell><CoTypography size="AdminUser">구매</CoTypography></TableCell>
              <TableCell><CoTypography size="AdminUser">등록일</CoTypography></TableCell>
              <TableCell><CoTypography size="AdminUser">삭제</CoTypography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {teacherContentsList.content && teacherContentsList.content.map((contents, index) => (
            <TableRow key={index}>              
              <TableCell sx={{ textAlignLast: 'center' }}><CoTypography size="AdminUser">{contents.contentsId}</CoTypography></TableCell>
              <TableCell style={{cursor: "pointer"}}><Button onClick={() => goDetail(contents.contentsId)}>{contents.contentsTitle}</Button></TableCell>
              <TableCell sx={{ textAlignLast: 'center' }}><CoTypography size="AdminUser">{contents.category}</CoTypography></TableCell>
              <TableCell sx={{ textAlignLast: 'center' }}><CoTypography size="AdminUser">{contents.price === 0 ? '무료' : contents.price === -1 ? "국가" : contents.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "원"}</CoTypography></TableCell>
              <TableCell>
                <Box sx={{display: "flex"}}>
                  <Rating 
                    name="read-only" 
                    value={contents.reviewRating} 
                    readOnly style={{ fontSize:'1rem' }} />
                  <CoTypography size="Tag">({contents.reviewCount})</CoTypography>
                </Box>
              </TableCell>
              <TableCell sx={{ textAlignLast: 'center' }}><CoTypography size="AdminUser">{contents.paymentCount}</CoTypography></TableCell>
              <TableCell sx={{ textAlignLast: 'center' }}><CoTypography size="AdminUser">{contents.regDate.substring(0, 10)}</CoTypography></TableCell>
              <TableCell sx={{ textAlignLast: 'center' }}><Button onClick={() => handleDelete(contents.contentsId)}>삭제</Button></TableCell>
          </TableRow>
          ))}
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <Pagination count={totalPages} page={page + 1} onChange={changePage} color='primary' />
        </Box>
      </Paper>
    </div>
  )
}

export default MyContents