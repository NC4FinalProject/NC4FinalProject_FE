import React from 'react'
import { Box, Button, Divider, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

// icon & images
import SideMultiItemReply from "./SideMultiItemReply";
import SideMultiItemVideoList from './SideMultiItemVideoList';
import { ReplyList } from '../../../../api/contentsReplyApi';
import { VideoList } from '../../../../api/contentsVideoListApi';


const SideTypeMulti = ({bodyCkeck}) => {
  return (
    <>
    {
      bodyCkeck === 'reply' ? (
      <Box sx={{ paddingY: { xs: 1, sm: 1 } }}>
        {ReplyList.map((reply) => (
          <SideMultiItemReply
            key={reply.id}
            title={reply.title}
            subtitle={reply.subtitle}
            photo={reply.photo}
            postingTime={reply.postingTime}
          />
        ))}
      </Box>
      ) : (
      <Box sx={{ paddingY: { xs: 1, sm: 1 },}}>
        {VideoList.map((VideoList, index) => (
          <SideMultiItemVideoList
            count={index}
            key={VideoList.id}
            title={VideoList.title}
            videoTime={VideoList.videoTime}
            thumbnail={VideoList.thumbnail}
          />
        ))}
      </Box>
      )
    }
    </>
  )
}

export default SideTypeMulti