import React from 'react'
import { Box, Pagination } from '@mui/material'
import ContentsList from '../contents/list/ContentsList'

const Bookmark = () => {
  return (
    <div>
        <ContentsList />
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3}}>
          <Pagination count={10} color="primary"/>
        </Box>
    </div>
  )
}

export default Bookmark