import React from 'react'
import { Box, Pagination } from '@mui/material'
import ContentsList from '../contents/list/ContentsList'

const MyLecture = () => {
  return (
    <div>
        <ContentsList />
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3}}>
          <Pagination count={10} color="primary"/>
        </Box>
    </div>
  )
}

export default MyLecture