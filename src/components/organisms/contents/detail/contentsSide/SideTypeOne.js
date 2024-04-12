import React from 'react'
import { Box, Button, Divider, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

// icon & images
import SideItemReply from "./SideItemReply";
import { ReplyList } from '../../../../api/contentsReplyApi';
import { useVideoReplyStore } from '../../../../../stores/ContentsStore';


const SideTypeOne = () => {

  return (
    <>
      <Box sx={{ padding: { xs: 1, sm: 1 } }}>
        {ReplyList.map((reply) => (
          <SideItemReply
            key={reply.id}
            title={reply.title}
            subtitle={reply.subtitle}
            photo={reply.photo}
            postingTime={reply.postingTime}
          />
        ))}
      </Box>
    
    {/* <Divider /> */}

    {/* Input Content */}
    <Box>
      
    </Box>
    </>
  )
}

export default SideTypeOne
