import { ThumbUp, Visibility } from "@mui/icons-material";
import { Button, ButtonGroup, Chip, Grid } from "@mui/material";
import React from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CoTypography from "../../atoms/common/CoTypography";
import CoHoverButton from "../../atoms/common/CoHoverButton";
import InsertCKEditor from "../../atoms/common/InsertCKEditor";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useState } from "react";
import Reportdialog from "../../organisms/review/Reportdialog";

const InquiryDetails = [
  {
    id: 1,
    userName: "홍길동",
    title: "질문이 있습니다.",
    content: "모르겠숴요  ",
    lectureName: "모르니까 자바다",
    viewCount: 3,
    regiDate: "2021-10-10",
    likeCount: 5,
    isSolved: true,
    tag1: "java",
    tag2: "javascript",
    tag3: "react",
  },
];

const InquiryDetail = () => {
  const [showEditor, setShowEditor] = useState(false);

  const [openReportDialog, setOpenReportDialog] = useState(false);

  const handleEditorClick = () => {
    setShowEditor(true);
  };

  const handleOpenReportDialog = () => {
    setOpenReportDialog(true);
  };

  const handleCloseReportDialog = () => {
    setOpenReportDialog(false);
  };

  return (
    <>
      {InquiryDetails.map((inquiryDetail, id) => (
        <Grid
          key={id}
          value={inquiryDetail}
          container
          sx={{
            display: "flex",
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            borderLeft: "1px solid #ced4da",
            borderRight: "1px solid #ced4da",
            flexDirection: "column",
            padding: "2rem 1.25rem 1.25rem 1.25rem",
          }}
        >
          <Grid
            borderBottom={"1px solid #ced4da"}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "top",
              paddingBottom: "2rem",
            }}
          >
            <Grid>
              <Grid sx={{ paddingBottom: "1rem" }}>
                <CoTypography size="WriteTitle">
                  {inquiryDetail.title}
                </CoTypography>
              </Grid>
              <Grid container ml="0.5rem" alignItems={"center"}>
                <CoTypography size="TableContent">
                  {inquiryDetail.userName} | {inquiryDetail.regiDate} |
                  {inquiryDetail.lectureName} |
                </CoTypography>
                <Visibility
                  sx={{
                    color: "#868e96",
                    marginLeft: "0.25rem",
                    marginRight: "0.25rem",
                  }}
                />
                <CoTypography size="TableContent">
                  {inquiryDetail.viewCount}
                </CoTypography>
              </Grid>
            </Grid>

            <Grid
              sx={{
                mr: "0.25rem",
                mt: "0.25rem",
              }}
            >
              <Grid container alignItems={"center"}>
                <Chip
                  size="medium"
                  label={inquiryDetail.isSolved ? "해결완료" : "미해결"}
                  sx={{
                    backgroundColor: inquiryDetail.isSolved
                      ? "primary.main"
                      : "primary",
                    color: inquiryDetail.isSolved ? "white" : "primary",
                    mr: "1rem",
                  }}
                />
                <CoTypography size="TableContent" color="textSecondary">
                  <Grid container direction="row" alignItems="center">
                    <ThumbUp
                      sx={{
                        mr: "0.25rem",
                      }}
                    />
                    <Grid>{inquiryDetail.viewCount}</Grid>
                  </Grid>
                </CoTypography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            borderBottom={"1px solid #ced4da"}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              paddingTop: "2rem",
              paddingBottom: "2rem",
            }}
          >
            <Grid>
              <Grid sx={{ paddingBottom: "3rem", ml: "0.5rem" }}>
                <CoTypography size="Title" style={{ color: "#868e96" }}>
                  {inquiryDetail.content}
                </CoTypography>
              </Grid>

              <Grid container mt="0.25rem" ml="0.5rem" alignItems={"center"}>
                {[
                  inquiryDetail.tag1,
                  inquiryDetail.tag2,
                  inquiryDetail.tag3,
                ].map(
                  (tag, index) =>
                    tag && (
                      <Chip
                        key={index}
                        size="small"
                        label={tag}
                        sx={{
                          backgroundColor: "primary.main",
                          color: "white",
                          mr: "0.25rem",
                        }}
                      />
                    )
                )}
              </Grid>
            </Grid>

            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                mr: "0.25rem",
              }}
            >
              <Grid sx={{ paddingBottom: "3rem", mr: "0.25rem" }}>
                <ButtonGroup
                  variant="text"
                  sx={{ mt: "-0.5rem", mr: "-0.5rem" }}
                >
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

              <Grid
                sx={{ display: "flex", alignItems: "center", mr: "0.25rem" }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mr: "0.5rem",
                    cursor: "pointer",
                  }}
                  onClick={handleOpenReportDialog}
                >
                  <NotificationsOutlinedIcon
                    sx={{ mr: "0.25rem", color: "#e65100" }}
                  />
                  <CoTypography size="TableContent" color="textSecondary">
                    신고하기
                  </CoTypography>
                </Grid>
                <Grid sx={{ display: "flex", alignItems: "center" }}>
                  <ShareOutlinedIcon sx={{ mr: "0.25rem" }} />
                  <CoTypography size="TableContent" color="textSecondary">
                    공유하기
                  </CoTypography>
                </Grid>
              </Grid>
              <Reportdialog
                open={openReportDialog}
                handleClickClose={handleCloseReportDialog}
              />
            </Grid>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              paddingTop: "2rem",
              paddingBottom: "2rem",
            }}
          >
            <Grid>
              <Grid sx={{ ml: "0.5rem" }}>
                <CoTypography size="NoticeTitle" style={{ color: "#868e96" }}>
                  답변 1
                </CoTypography>
              </Grid>
            </Grid>

            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                mr: "0.25rem",
              }}
            >
              <Grid sx={{ mr: "0.25rem" }}>
                <ButtonGroup
                  variant="text"
                  sx={{ mt: "-0.5rem", mr: "-0.5rem" }}
                >
                  <Button style={{ border: "none" }}>
                    <CoTypography size="TableContent">최신순</CoTypography>
                  </Button>
                  <CoTypography
                    size="TableContent"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    |
                  </CoTypography>
                  <Button style={{ border: "none" }}>
                    <CoTypography size="TableContent">좋아요순</CoTypography>
                  </Button>
                  <CoTypography
                    size="TableContent"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    |
                  </CoTypography>
                  <Button>
                    <CoTypography size="TableContent">댓글순</CoTypography>
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid container flexDirection="column" alignItems="center">
            {showEditor ? (
              <InsertCKEditor /> // 버튼 자리에 CK에디터 컴포넌트 렌더링
            ) : (
              <CoHoverButton
                fullWidth
                variant="outlined"
                style={{
                  width: "100%",
                  height: "3rem",
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingLeft: "1.5rem",
                }}
                onClick={handleEditorClick}
              >
                <CoTypography>클릭하여 답변을 작성해보아요</CoTypography>
              </CoHoverButton>
            )}
          </Grid>
          <Grid
            border={"1px solid black"}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "top",
              borderRadius: "4px",
              marginTop: "2rem",
              marginBottom: "1.5rem",
              padding: "1.25rem",
            }}
          >
            <Grid>
              <Grid sx={{ paddingBottom: "3rem", ml: "0.5rem" }}>
                <CoTypography size="Title" style={{ color: "#868e96" }}>
                  {inquiryDetail.content}
                </CoTypography>
              </Grid>

              <Grid container ml="0.25rem" alignItems={"center"}>
                <Button color="primary" variant="contained">
                  <KeyboardArrowDownIcon sx={{ ml: "-0.5rem" }} />
                  답글 {2}개
                </Button>
              </Grid>
            </Grid>

            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                mr: "0.25rem",
              }}
            >
              <Grid sx={{ paddingBottom: "3rem", mr: "0.25rem" }}>
                <ButtonGroup
                  variant="text"
                  sx={{ mt: "-0.5rem", mr: "-0.5rem" }}
                >
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

              <Grid
                sx={{ display: "flex", alignItems: "center", mr: "0.25rem" }}
              >
                <Grid
                  sx={{ display: "flex", alignItems: "center", mr: "0.5rem" }}
                >
                  <NotificationsOutlinedIcon
                    sx={{ mr: "0.25rem", color: "#e65100" }}
                  />
                  <CoTypography size="TableContent" color="textSecondary">
                    신고하기
                  </CoTypography>
                </Grid>
                <Grid sx={{ display: "flex", alignItems: "center" }}>
                  <FavoriteBorderOutlinedIcon sx={{ mr: "0.25rem" }} />
                  <CoTypography size="TableContent" color="textSecondary">
                    {3}
                  </CoTypography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            alignItems="center"
            mb="0.5rem"
          >
            <Button
              variant="contained"
              style={{ color: "white" }}
              color="green"
            >
              목록
            </Button>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default InquiryDetail;
