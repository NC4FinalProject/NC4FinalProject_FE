import { Box, Button, Divider } from '@mui/material'
import React from 'react'
import { GrFormNext } from 'react-icons/gr'
import { Link } from 'react-router-dom'

export const ListApp = () => {
  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, px: 1 }}>
      <Button to="/" component={Link} size="small" color="inherit" >
        List
      </Button>
      <Button to="/" component={Link} size="small" color="inherit">
        Reply
      </Button>
    </Box>
    <Divider />
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
      <p>어오?</p>
    </>
  )
}

export default ListApp;