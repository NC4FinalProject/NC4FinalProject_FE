import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

// icon & images
import SideItemReply from "./SideItemReply";
import SideItemVideoList from './SideItemVideoList';

import { Video } from '../../../../../api/contentsVideoApi';


const SideTypeMulti = ({bodyCkeck, videoCheck}) => {

  const [selectedItem, setSelectedItem] = useState('1');

  const handleItemClick = (videoId) => {
    setSelectedItem(videoId);
    videoCheck(videoId);
    console.log("자식 컴포넌트임 ㅋ선택된 영상의 넘버로 체인지올시다." + videoId)
  };

  // useEffect(()=>{
  //   setSelectedItem(1);
  //   console.log("처음 마운트이다잉?"+selectedItem)
  // },)

  return (
    <>
    {
      bodyCkeck !== 'reply' ? (
      <Box sx={{ paddingY: { xs: 1, sm: 1 } }}>
        {Video.map((v, index) => (
          <SideItemVideoList
            key={v.videoId}
            count={index}
            videoTitle={v.videoTitle}
            videoTime={v.videoTime}
            thumbnailPath={v.thumbnailPath}
            isSelected={selectedItem === v.videoId}
            onItemSelect={() => handleItemClick(v.videoId)}
          />
        ))}
      </Box>
      ) : (
      <Box sx={{ paddingY: { xs: 1, sm: 1 },}}>
        {Video[selectedItem -1].videoReplyList.map((vrl, index) => (
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