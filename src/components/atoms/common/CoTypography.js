import { Typography } from "@mui/material";
import React from "react";

const CoTypography = ({ children, size, style, sx }) => {
  const styles = {
    NavTab: { fontSize: "1.125rem" },
    Title: { fontSize: "1rem", fontFamily: "Pretendard SemiBold" },
    Content: { fontSize: "0.9375rem" },
    Tag: {
      fontSize: "0.8125rem",
      fontFamily: "Pretendard Regular",
      color: "#7d7d7d",
    },
    AdminTag: {
      fontSize: "0.725rem",
      fontFamily: "Pretendard Regular",
      color: "#7d7d7d",
      paddingLeft:'1rem'
    },
    WriteTitle: { fontSize: "1.75rem" },
    Admin: { fontSize: "0.725rem" },
    AdminNotice: { fontSize: "0.9375rem", paddingLeft:'1rem', paddingTop:'0.725rem',  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'},
    MainTitle: { fontSize: "1.5rem", fontFamily: "Pretendard SemiBold" },
    NoticeTitle: { fontSize: "1.25rem", fontFamily: "Pretendard SemiBold" },
    HoverText: { fontSize: "1rem", fontFamily: "Pretendard SemiBold" },
    AdminUser: { fontSize: "1rem" },
    TableContent: {
      fontSize: "0.9375rem",
      fontFamily: "Pretendard Regular",
      color: "#868e96",
    },
  };

  return (
    <Typography style={{ ...styles[size], ...style }} sx={sx}>
      {children}
    </Typography>
  );
};

export default CoTypography;
