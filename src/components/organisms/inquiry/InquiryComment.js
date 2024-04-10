import { Avatar, ButtonGroup, Grid } from "@mui/material";
import React, { useState } from "react";
import CoTypography from "../../atoms/common/CoTypography";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import InquiryReportdialog from "./InquiryReportdialog";
const InquriyComment = ({
  name,
  regDate,
  content,
  likeCount,
  profileImage,
}) => {
  const [openCommentReportDialog, setOpenCommentReportDialog] = useState(false);

  const handleOpenCommentReportDialog = () => {
    setOpenCommentReportDialog(true);
  };

  const handleCloseCommentReportDialog = () => {
    setOpenCommentReportDialog(false);
  };

  return (
    <>
      <Grid
        border={"1px solid black"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "top",
          borderRadius: "4px",
          marginTop: "2rem",
          padding: "1.25rem",
        }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{}}
          >
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                paddingBottom: "1.25rem",
              }}
            >
              <Avatar
                alt="profileImage"
                src={profileImage}
                sx={{ width: 20.2, height: 20.2, marginRight: "0.5rem" }}
              />
              <CoTypography size="TableContent" style={{ color: "#868e96" }}>
                | {name} | {regDate}
              </CoTypography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                mr: "0.25rem",
                paddingBottom: "1.25rem",
              }}
            >
              <ButtonGroup variant="text" sx={{ mr: "-0.5rem" }}>
                <Button style={{ border: "none" }}>
                  <CoTypography size="TableContent">수정</CoTypography>
                </Button>
                <CoTypography
                  size="TableContent"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  |
                </CoTypography>
                <Button>
                  <CoTypography size="TableContent">삭제</CoTypography>
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
          <Grid item xs={12} pb="1.25rem">
            <CoTypography size="TableContent" style={{ color: "#868e96" }}>
              {content}
            </CoTypography>
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            sx={{ cursor: "pointer" }}
            onClick={handleOpenCommentReportDialog}
          >
            <Grid sx={{ display: "flex", alignItems: "center", mr: "0.5rem" }}>
              <NotificationsOutlinedIcon
                sx={{ mr: "0.25rem", color: "#e65100" }}
              />
              <CoTypography size="TableContent" color="textSecondary">
                신고하기
              </CoTypography>
            </Grid>
            <Grid sx={{ display: "flex", alignItems: "center" }}>
              <FavoriteBorderOutlinedIcon
                sx={{ mr: "0.25rem", color: "#444444" }}
              />
              <CoTypography size="TableContent" color="textSecondary">
                {likeCount}
              </CoTypography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <InquiryReportdialog
        open={openCommentReportDialog}
        handleClickClose={handleCloseCommentReportDialog}
      />
    </>
  );
};

export default InquriyComment;
