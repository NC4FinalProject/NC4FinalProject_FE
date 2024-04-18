import React from 'react'
import { Box, Pagination } from '@mui/material'
import MyContentsList from '../contents/list/MyContentsList'
import { useMyContentsListStore } from "../../../stores/ContentsStore";

const MyLecture = () => {
  const { getMyContentsListOutput, page, setPage, totalPages } = useMyContentsListStore();

  const changePage = (e, v) => {
    setPage(parseInt(v) - 1);
    getMyContentsListOutput();
  }

  return (
    <div>
        <MyContentsList />
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3}}>
          <Pagination count={totalPages} page={parseInt(page) + 1} onChange={changePage} color="primary"/>
        </Box>
    </div>
  )
}

export default MyLecture