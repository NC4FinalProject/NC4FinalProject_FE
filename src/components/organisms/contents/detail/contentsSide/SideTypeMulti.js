import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

// icon & images
import SideItemReply from "./SideItemReply";
import SideItemVideoList from './SideItemVideoList';

import { Video } from '../../../../../api/contentsVideoApi';
import { useContentsStore } from '../../../../../stores/ContentsStore';


const SideTypeMulti = ({bodyCkeck, videoCheck}) => {

  // const [selectedItem, setSelectedItem] = useState(1);
  const {getContents, getVideo, getContentsOutput, stateNum, stateNumChange} = useContentsStore();

  const handleItemClick = (videoId) => {
    stateNumChange(videoId);
    videoCheck(videoId);
  };

  useEffect(()=>{
    
  },[getVideo.length])


  return (
    <>
    {
      bodyCkeck !== 'reply' ? (
      <Box sx={{ paddingY: { xs: 1, sm: 1 } }}>
        {getVideo.map((v, index) => (
          <SideItemVideoList
            key={v.videoId}
            count={index}
            videoTitle={v.videoTitle}
            videoTime={v.videoTime}
            thumbnailPath={v.thumbnailPath}
            isSelected={stateNum === v.videoId}
            onItemSelect={() => handleItemClick(v.videoId)}
          />
        ))}
      </Box>
      ) : (
      <Box sx={{ paddingY: { xs: 1, sm: 1 },}}>
        {Video[stateNum -1].videoReplyList.map((vrl, index) => (
          <SideItemReply
            key={index}
            content={vrl.content}
            userName={vrl.username}
            userprofile={vrl.userProfile}
          />
        ))}
      </Box>
      )
    }
    </>
  )
}

export default SideTypeMulti