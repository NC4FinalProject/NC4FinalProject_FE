import { Typography } from "@mui/material";
import React from "react";

const CoTypography = ({children, size, style, sx}) => {
  const styles = {
    NavTab: { fontSize: '1.125rem' },
    Title: { fontSize: '1rem', fontFamily: 'Pretendard SemiBold' },
    Content: { fontSize: '0.9375rem' },
    Tag: { fontSize: '0.8125rem', fontFamily: 'Pretendard Regular', color: '#7d7d7d'},
    WriteTitle: { fontSize: '1.75rem' },
    MainTitle: { fontSize: '1.5rem', fontFamily: 'Pretendard SemiBold' },
    HoverText: { fontSize: '1rem', fontFamily: 'Pretendard SemiBold' },
    NoticeTitle: { fontSize: '1.2rem', fontFamily: 'Pretendard SemiBold' },
  };

  return (
    <Typography style={{...styles[size], ...style}} sx={sx}>
      {children}
    </Typography>
  );
};

export default CoTypography;
