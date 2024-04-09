import React from 'react'
import { Box, Pagination, Button } from '@mui/material'
import ContentsList from '../contents/list/ContentsList'
import { useNavigate } from 'react-router-dom';

const MyContents = () => {

    const navi = useNavigate();

    const handleInsert = () => {
        navi('/insert');
    }
  return (
    <div>
        <Button onClick={handleInsert}>컨텐츠 등록</Button>
        <ContentsList />
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3}}>
          <Pagination count={10} color="primary"/>
        </Box>
    </div>
  )
}

export default MyContents