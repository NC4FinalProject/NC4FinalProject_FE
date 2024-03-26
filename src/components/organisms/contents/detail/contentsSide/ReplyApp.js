import React from 'react'
import { Box, Button, Divider, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

// icon & images
import ReplyItem from "./ReplyItem";
import coverImg_1 from "../../../../../images/ReplyList/cover_1.jpg";
import coverImg_2 from "../../../../../images/ReplyList/cover_2.jpg";
import coverImg_3 from "../../../../../images/ReplyList/cover_3.jpg";
import coverImg_4 from "../../../../../images/ReplyList/cover_4.jpg";
import coverImg_5 from "../../../../../images/ReplyList/cover_5.jpg";
import CoTypography from '../../../../atoms/common/CoTypography';

// Reply List
const loremText = `역시 강의는 고기천 강사님!ㅋㅋㅋㅋㅋㅋ역시 강의는 고기천 강사님!`;

const ReplyList = [
  {
    title: "시원",
    subtitle: loremText,
    photo: coverImg_1,
    postingTime: "about 12 hours",
  },
  {
    title: "재호",
    subtitle: loremText,
    photo: coverImg_2,
    postingTime: "about 2 hours",
  },
  {
    title: "우성",
    subtitle: loremText,
    photo: coverImg_4,
    postingTime: "about 12 hours",
  },
  {
    title: "무호",
    subtitle: loremText,
    photo: coverImg_5,
    postingTime: "about 10 hours",
  },
  {
    title: "무호",
    subtitle: loremText,
    photo: coverImg_5,
    postingTime: "about 10 hours",
  },

  {
    title: "무호",
    subtitle: loremText,
    photo: coverImg_5,
    postingTime: "about 10 hours",
  },
  {
    title: "무호",
    subtitle: loremText,
    photo: coverImg_5,
    postingTime: "about 10 hours",
  },





];

const ReplyApp = () => {
  return (
    <>
      <Box sx={{ padding: { xs: 1, sm: 1 }, }}>
        {ReplyList.map((reply) => (
          <ReplyItem
            key={reply.title}
            title={reply.title}
            subtitle={reply.subtitle}
            photo={reply.photo}
            postingTime={reply.postingTime}
          />
        ))}
      </Box>
    {/* <Grid style={{height: '100%'}} sx={{overflowY: 'auto'}}>
      <Box sx={{ padding: { xs: 1, sm: 1 }, }}>
        {ReplyList.map((reply) => (
          <ReplyItem
            key={reply.title}
            title={reply.title}
            subtitle={reply.subtitle}
            photo={reply.photo}
            postingTime={reply.postingTime}
          />
        ))}
      </Box>
    </Grid> */}
    
    {/* <Divider /> */}

    {/* Input Content */}
    <Box>
      
    </Box>
    </>
  )
}

export default ReplyApp