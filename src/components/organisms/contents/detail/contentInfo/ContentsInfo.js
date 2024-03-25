import { Box, Typography } from '@mui/material';
import React from 'react'

// icon
import { FaCommentDots, FaEye, FaShare } from "react-icons/fa";

const ContentsInfo = ({ comments, views, shares, color }) => {
  return (
    <Typography

      variant="caption"
      style={{ color: color || "#f8f8f8", textAlign: "right" }}
    >
      <Box component="span" sx={{ px: 0.5 }}>
        <FaCommentDots /> {comments}
      </Box>
      <Box component="span" sx={{ px: 0.5 }}>
        <FaEye /> {views}
      </Box>
      <Box component="span" sx={{ px: 0.5 }}>
        <FaShare /> {shares}
      </Box>
      <div>크아아아아앙</div>
      <div>크아아아아앙</div>
      <div>크아아아아앙</div>
    </Typography>
    
  );
};

export default ContentsInfo;
