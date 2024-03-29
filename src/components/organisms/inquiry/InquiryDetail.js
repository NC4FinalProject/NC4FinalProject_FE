import { ThumbUp, Visibility } from "@mui/icons-material";
import { Button, ButtonGroup, Chip, Grid } from "@mui/material";
import React from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CoTypography from "../../atoms/common/CoTypography";
import CoHoverButton from "../../atoms/common/CoHoverButton";
import InsertCKEditor from "../../atoms/common/InsertCKEditor";
import { useState } from "react";
import Reportdialog from "../../organisms/review/Reportdialog";
import InquriyComment from "./InquriyComment";

const InquiryDetails = [
  {
    id: 1,
    userName: "홍길동",
    title: "질문이 있습니다.",
    content:
      "모르겠숴요겠겠숴요모르겠숴요모르숴요모르겠모르겠숴요모르겠숴요르숴요모르겠모르겠숴요모르겠숴요르숴요모르겠모르겠숴요모르겠숴요르숴요모르겠모르겠숴요모르겠숴요르숴요모르겠모르겠숴요모르겠숴요르숴요모르겠모르겠숴요모르겠숴요르숴요모르겠모르겠숴요모르겠숴요르숴요모르겠모르겠숴요모르겠숴요르숴요모르겠모르겠숴요모르겠숴요르숴요모르겠모르겠숴요모르겠숴요",
    lectureName: "모르니까 자바다",
    viewCount: 3,
    regiDate: "2021-10-10",
    likeCount: 5,
    isSolved: true,
    tag1: "java",
    tag2: "javascript",
    tag3: "react",
    comments: [
      {
        profileImage: process.env.PUBLIC_URL + "/images/teacher.jpg",
        commenterName: "김댓글",
        commentDate: "2021-10-11",
        commentContent:
          "메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱메롱.",
        commentLikeCount: 3,
      },
    ],
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

          <Grid container direction="column" borderBottom={"1px solid #ced4da"}>
            <Grid
              item
              container
              justifyContent="space-between"
              sx={{ paddingBottom: "1.25rem" }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flexGrow: 1,
                }}
              >
                <ButtonGroup
                  variant="text"
                  sx={{ paddingTop: "1rem ", paddingRight: "1rem" }}
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
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "1rem",
                }}
              >
                <CoTypography size="Title" style={{ color: "#868e96" }}>
                  {inquiryDetail.content}
                </CoTypography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
              padding="1rem 1.5rem 2rem 1rem"
            >
              <Grid item>
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
              <Grid item sx={{ display: "flex", alignItems: "center" }}>
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
            </Grid>
            <Reportdialog
              open={openReportDialog}
              handleClickClose={handleCloseReportDialog}
            />
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
          {inquiryDetail.comments.map((comment, index) => (
            <InquriyComment
              key={id}
              name={comment.commenterName}
              regDate={comment.commentDate}
              content={comment.commentContent}
              likeCount={comment.commentLikeCount}
              profileImage={comment.profileImage}
            />
          ))}

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
