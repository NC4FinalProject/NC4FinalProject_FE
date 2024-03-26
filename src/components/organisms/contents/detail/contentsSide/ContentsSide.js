import React from 'react'
import ReplyApp from './ReplyApp'
import { Box, Button, Divider, Grid, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import CoTypography from '../../../../atoms/common/CoTypography'

// 단일 강의 reply
// 다중 강의 list reply
// 화상 강의 chat

const ContentSide = () => {
  return (
    <>
    {/* header */}
    <Grid container sx={{ px: 2, py: 0.3, paddingTop: 1, display: 'flex', justifyContent: 'space-between'}}>
      <Grid item={4}>
        <CoTypography size="Content" sx={{':hover': {color: 'primary.main', cursor: 'pointer'}}}>Reply</CoTypography> 
      </Grid>
      <Grid item={4}>
        <CoTypography size="Content" sx={{':hover': {color: 'primary.main', cursor: 'pointer'}}}>Chat</CoTypography>   
      </Grid>    
      <Grid item={4}>
        <CoTypography size="Content" sx={{':hover': {color: 'primary.main', cursor: 'pointer'}}}>List</CoTypography>
      </Grid>
    </Grid>

    <Divider />

    {/* body */}
    <Grid style={{height: '87%'}} sx={{overflowY: 'auto'}}>
    {/* <Grid> */}
      {/* <ChatApp></ChatApp> */}
      {/* <ListApp></ListApp> */}
      <ReplyApp></ReplyApp>
    </Grid>
    <TextField fullWidth id="standard-basic" variant="standard" />
    </>
  )
}

export default ContentSide