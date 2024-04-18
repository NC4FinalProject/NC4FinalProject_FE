import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

// icon & images
import SideItemReply from "./SideItemReply";
import SideItemVideoList from './SideItemVideoList';

import { useContentsStore, useVideoReplyStore } from '../../../../../stores/ContentsStore';


const SideTypeMulti = ({bodyCkeck, videoCheck}) => {
  // const [selectedItem, setSelectedItem] = useState(1);
  const { getVideo, stateNum, stateNumChange } = useContentsStore();
  const { videoReplyList } = useVideoReplyStore();

  const handleItemClick = (videoId) => {
    stateNumChange(videoId);
    videoCheck(videoId);
  };

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
            videoPath={v.videoPath}
          />
        ))}
      </Box>
      ) : (
      <Box sx={{ paddingY: { xs: 1, sm: 1 },}}>
        {videoReplyList.map((vrl, index) => (
          <SideItemReply
            key={index}
            videoReplyContent={vrl.videoReplyContent}
            userNickname={vrl.userNickname}
            userprofile={vrl.profileFile}
          />
        ))}
      </Box>
      )
    }
    </>
  )
}

export default SideTypeMulti