import React, { useState } from 'react'
import { Box, Button, Divider, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

// icon & images
import SideItemReply from "./SideItemReply";
import SideItemVideoList from './SideItemVideoList';
import { ReplyList } from '../../../../api/contentsReplyApi';
import { VideoList } from '../../../../api/contentsVideoListApi';


const SideTypeMulti = ({bodyCkeck}) => {

  const [selectedItem, setSelectedItem] = useState('1');

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
  };

  return (
    <>
    {
      bodyCkeck === 'reply' ? (
      <Box sx={{ paddingY: { xs: 1, sm: 1 } }}>
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
      ) : (
      <Box sx={{ paddingY: { xs: 1, sm: 1 },}}>
        {VideoList.map((VideoList, index) => (
          <SideItemVideoList
            count={index}
            key={VideoList.id}
            title={VideoList.title}
            videoTime={VideoList.videoTime}
            thumbnail={VideoList.thumbnail}
            isSelected={selectedItem === VideoList.id}
            onItemSelect={() => handleItemClick(VideoList.id)}
          />
        ))}
      </Box>
      )
    }
    </>
  )
}

export default SideTypeMulti