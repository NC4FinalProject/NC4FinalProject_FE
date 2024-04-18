import React, { useEffect } from 'react'
import { Box, Pagination } from '@mui/material'
import BookmarkContentsList from '../contents/list/BookmarkContentsList'
import { useBookmarkContentsListStore } from "../../../stores/ContentsStore";

const Bookmark = () => {
  const { totalPages, getBookmarkContentsListOutput, page, setPage } = useBookmarkContentsListStore();

  useEffect(() => {
    getBookmarkContentsListOutput();
  }, [page]);

  const changePage = (e, v) => {
    setPage(parseInt(v) - 1);
  }

  return (
    <div>
        <BookmarkContentsList />
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3}}>
          <Pagination count={totalPages} page={page + 1} onChange={changePage} color="primary"/>
        </Box>
    </div>
  )
}

export default Bookmark