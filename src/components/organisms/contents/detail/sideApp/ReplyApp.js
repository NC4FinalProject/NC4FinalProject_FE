import React from 'react'
import { Box, Button, Divider } from '@mui/material'
import { Link } from 'react-router-dom'

// icon & images
import ReplyItem from "./ReplyItem";
import coverImg_1 from "../../../images/ReplyList/cover_1.jpg";
import coverImg_2 from "../../../images/ReplyList/cover_2.jpg";
import coverImg_3 from "../../../images/ReplyList/cover_3.jpg";
import coverImg_4 from "../../../images/ReplyList/cover_4.jpg";
import coverImg_5 from "../../../images/ReplyList/cover_5.jpg";

// Reply List
const loremText = `Quisquam sunt ipsa nihil ratione. Dolorum earum occaecati et sequi et eius asperiore...`;

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
    title: "의현",
    subtitle: loremText,
    photo: coverImg_3,
    postingTime: "about 7 hours",
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
];

const ReplyApp = () => {
  return (
    <>
    {/* header */}
    <Box sx={{ py: 1, px: 1, textAlign: "Left" }}>
      <Button to="/" component={Link} size="small" color="inherit">
      Reply
      </Button>
    </Box>
    <Divider />

    {/* Main Content */}

    <Box
      overflow="auto"
      sx={{
        padding: { xs: 2, sm: 3 },
      }}
    >
      {ReplyList.map((reply) => (
        <ReplyItem
          key={reply.title}
          title={reply.title}
          subtitle={reply.subtitle}
          photo={reply.photo}
          postingTime={reply.postingTime}
        />
      ))};
    </Box>
    </>
  )
}

export default ReplyApp