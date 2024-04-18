import React, { useEffect, useState } from 'react'
import { Paper, Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, Pagination } from '@mui/material';
import CoTypography from '../../atoms/common/CoTypography';
import AdminStore from '../../../stores/AdminStore';
import QnaDialog from './Qna';
import MemberInfo from './MemberInfo';

const QnaList = () => {
    const {getUserQnaResult, page, qnauser, setPage} = AdminStore();
    const {memberInfo} = MemberInfo();
    const [openQna, setOpenQna] = useState(false);
    const [qnaData, setqnaData] = useState('');

    useEffect(() => {
        getUserQnaResult();
    }, [page])
  
      const OpenDialog = (qna) => {
        console.log(qna.answered);
        setOpenQna(true);
        setqnaData(qna);
      };
      const handlePageChange = (event, value) => {
          setPage(value - 1);
      };

  return (
    console.log(qnauser),
    <Paper sx={{ width: '100%', height: 'auto', marginTop:'1rem' }}>
     <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left"><CoTypography variant="AdminUser">번호</CoTypography></TableCell>
            <TableCell><CoTypography variant="AdminUser">문의 유형</CoTypography></TableCell>
            <TableCell><CoTypography variant="AdminUser">문의 내용</CoTypography></TableCell>
            <TableCell><CoTypography variant="AdminUser">문의 날짜</CoTypography></TableCell>
            <TableCell align="right"><CoTypography variant="AdminUser">처리 상태</CoTypography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {qnauser && qnauser.map((qna, index) => (
    <TableRow key={index} onClick={() => OpenDialog(qna)} sx={{ cursor: 'pointer' }}>
        <TableCell align="left" sx={{ fontSize: '0.925rem' }}>{qnauser.length - index}</TableCell>
        <TableCell sx={{ fontSize: '0.925rem' }}>{qna.category}</TableCell>
        <TableCell style={{ maxWidth: '35rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{qna.content}</TableCell>
        <TableCell sx={{ fontSize: '0.925rem' }}>{qna.createdAt}</TableCell>
        <TableCell align="right" sx={{ color: qna.answered ? '#558BCF' : 'inherit', fontFamily: "Pretendard SemiBold" }}>{qna.answered ? '답변 완료' : '처리중'}</TableCell>
    </TableRow>
))}

        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <Pagination color='primary' count={qnauser.totalPages} page={page + 1} onChange={handlePageChange} />
        </Box>
      <QnaDialog
       open={openQna} handleClickClose={() => setOpenQna(false)} Title="1 대 1 문의" 
       author={memberInfo && memberInfo.userNickname}
       detailReason={qnaData.content}
       category={qnaData.category}
       isAnswered={true}
       />
    </Paper>
  )
}

export default QnaList;