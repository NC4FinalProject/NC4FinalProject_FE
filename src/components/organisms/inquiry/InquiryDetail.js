import {  Visibility } from "@mui/icons-material";
import { Button, ButtonGroup, Chip, Grid, Box } from "@mui/material";
import React, { useEffect } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CoTypography from "../../atoms/common/CoTypography";
import CoHoverButton from "../../atoms/common/CoHoverButton";
import { useState } from "react";
import InquiryReportDialog from "./InquiryReportDialog";
import InquiryComment from "./InquiryComment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HtmlParser from 'react-html-parser';
import MemberStore from "../../../stores/MemberStore";
import useStore from "../../../stores/InquiryStore";
import axios from "axios";
import Notice from "../../../scss/Notice.scss";

const InquiryDetail = ({ handleModifyClick, onListClick, scrollToTop }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [isFavorited, setFavorited] = useState(false);
  const {memberInfo} = MemberStore();
  const {
    deleteInquiry,
    setInquiries,
    searchCondition,
    searchKeyword,
    setPage,
    inquiry,
    setInquiry,
    comments,
    setComments,
    postComment,
    getComment,
  } = useStore();
  const [commentContent, setCommentContent] = useState("");
  const [commentOrder, setCommentOrder] = useState("");

  const handleEditorClick = () => {
    setShowEditor(true);
  };

  const handleOpenReportDialog = () => {
    setOpenReportDialog(true);
  };

  const handleCloseReportDialog = () => {
    setOpenReportDialog(false);
  };

  const handleListClick = () => {
    onListClick();
    scrollToTop();
  };

  const handleCancelClick = () => {
    if (window.confirm("작성중인 글은 저장되지 않습니다. 취소하시겠습니까? ")) {
      alert("취소되었습니다.");
      setShowEditor(false);
    }
  };

  const handleDelete = () => {
    deleteInquiry(inquiry.inquiryId, inquiry.contentsId);
    onListClick();
  }

  const handleSolve = async () => {
    if(window.confirm("질문이 모두 해결되셨나요?")) {
      try {
        const response = await axios.put(
          `http://${process.env.REACT_APP_BACK_URL}/inquiry/updateSolve/${inquiry.inquiryId}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
            },
            params: {
              searchCondition: searchCondition,
              searchKeyword: searchKeyword,
              contentsId: inquiry.contentsId
            }
          }
        );

        alert("질문이 해결완료 상태로 변경되었습니다.");

        setInquiry(response.data.item);

      } catch(e) {
        console.log(e);
      }
    }
  }

  const handleContentChange = (e, editor) => {
    const data = editor.getData();
    setCommentContent(data);
  }

  const handlePostComment = () => {
    postComment(commentContent, inquiry.inquiryId);
    setShowEditor(false);
  }

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_BACK_URL}/inquiry/like/${inquiry.inquiryId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
          }
        }
      ) 
      setInquiry(response.data.item);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if(commentOrder) {
      getComment(inquiry.inquiryId, commentOrder);
    }
  }, [commentOrder]);

  return (
    <>
      {inquiry && (
        <Grid
          key={inquiry.inquiryId}
          value={inquiry}
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
                  {inquiry.inquiryTitle}
                </CoTypography>
              </Grid>
              <Grid container ml="0.5rem" alignItems={"center"}>
                <CoTypography size="TableContent">
                  {inquiry.memberDTO.userNickname} | {inquiry.inquiryUdtDT.substring(0, 10)} | {inquiry.contentsTitle} |
                </CoTypography>
                <Visibility
                  sx={{ 
                    color: "#868e96",
                    marginLeft: "0.25rem",
                    marginRight: "0.25rem",
                  }}
                />
                <CoTypography size="TableContent">
                  {inquiry.inquiryView}
                </CoTypography>
              </Grid>
            </Grid>

            <Grid
              sx={{
                mr: "0.25rem",
                mt: "0.25rem",
              }}
            >
              <Grid container justifyContent={"center"} sx={{ paddingBottom: "1rem" }} alignItems={"center"}>
                <Chip
                  size="medium"
                  label={inquiry.solved ? "해결완료" : "미해결"}
                  sx={{
                    backgroundColor: inquiry.solved
                      ? "primary.main"
                      : "primary",
                    color: inquiry.solved ? "white" : "primary",
                  }}
                />
              </Grid>
              <Grid container justifyContent={"center"} alignItems={"center"}>
                  {
                    inquiry.memberDTO.userNickname === memberInfo.userNickname 
                    && !inquiry.solved
                    && (
                      <Chip
                        size="medium"
                        label={"질문이 모두 해결됐으면 클릭"}
                        sx={{
                          backgroundColor: "primary.main",
                          color: "white",
                          cursor: "pointer"
                        }}
                        onClick={handleSolve}
                      />
                    )
                  }
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
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flexGrow: 1,
                }}
              >
                {
                memberInfo.userNickname === inquiry.memberDTO.userNickname &&
                (
                  <ButtonGroup
                    variant="text"
                    sx={{ paddingTop: "1rem ", paddingRight: "1rem" }}
                  >
                    <Button onClick={handleModifyClick} style={{ border: "none" }}>
                      <CoTypography size="TableContent">수정</CoTypography>
                    </Button>
                    <CoTypography
                      size="TableContent"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      |
                    </CoTypography>
                    <Button onClick={handleDelete}>
                      <CoTypography size="TableContent">삭제</CoTypography>
                    </Button>
                  </ButtonGroup>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "1rem",
                }}
              >
                <CoTypography
                  size="Title"
                  style={{ color: "#868e96" }}
                  sx={{ width: "100%" }}
                >
                  {HtmlParser(HtmlParser(inquiry.inquiryContent))}
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
                {inquiry.tagDTOList.map(
                  (tag, index) =>
                    tag && (
                      <Chip
                        key={index}
                        size="small"
                        label={tag.tagContent}
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
                {inquiry.like ? (
                  <FavoriteIcon
                    sx={{cursor: "pointer", mr: "0.25rem", color: '#558BCF', '& > *': { fill: '#none' } }}
                    onClick={handleLikeClick}
                  />
                ) : (
                  <FavoriteBorderOutlinedIcon
                    sx={{cursor: "pointer", mr: "0.25rem", color: "#444444" }}
                    onClick={handleLikeClick}
                  />
                )}
              <CoTypography size="TableContent" color="textSecondary">
                {inquiry.likeCount}
              </CoTypography>
            </Grid>
                {/* <Grid sx={{ display: "flex", alignItems: "center" }}>
                  <ShareOutlinedIcon sx={{ mr: "0.25rem" }} />
                  <CoTypography size="TableContent" color="textSecondary">
                    공유하기
                  </CoTypography>
                </Grid> */}
              </Grid>
            </Grid>
            <InquiryReportDialog
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
                  답변 {inquiry.commentCount}
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
                  <Button style={{ border: "none" }} onClick={() => setCommentOrder("최신순")}>
                    <CoTypography size="TableContent">최신순</CoTypography>
                  </Button>
                  <CoTypography
                    size="TableContent"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    |
                  </CoTypography>
                  <Button style={{ border: "none" }} onClick={() => setCommentOrder("좋아요순")}>
                    <CoTypography size="TableContent">좋아요순</CoTypography>
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid container flexDirection="column" alignItems="center">
            {showEditor ? (
              <Grid container flexDirection="column">
                <Grid sx={{ width: "100%" }}>
                  <CKEditor
                    editor={ClassicEditor}
                    data={commentContent}
                    onChange={handleContentChange}   
                    config={{
                      toolbar: {
                        items: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "link",
                          "bulletedList",
                          "numberedList",
                          "|",
                          "indent",
                          "outdent",
                          "|",
                          "blockQuote",
                          "insertTable",
                          "undo",
                          "redo",
                        ],
                      },
                      language: "en",
                      image: {
                        toolbar: [
                          "imageTextAlternative",
                          "imageStyle:full",
                          "imageStyle:side",
                        ],
                      },
                      table: {
                        contentToolbar: [
                          "tableColumn",
                          "tableRow",
                          "mergeTableCells",
                        ],
                      },         
                    }}
                  />
                </Grid>
                <Grid
                  container
                  justifyContent="flex-end"
                  sx={{ mt: "1rem", width: "100%" }}
                >
                  <Button
                    variant="outlined"
                    style={{
                      marginRight: "0.625rem",
                      color: "black",
                      borderColor: "#ced4da",
                    }}
                    onClick={() => handleCancelClick()}
                  >
                    취소
                  </Button>
                  <Button onClick={handlePostComment} color="primary" variant="contained">
                    등록
                  </Button>
                </Grid>
              </Grid>
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
          {comments && comments.map((comment, id) => (
              <InquiryComment
                key={id}
                name={comment.memberDTO.userNickname}
                regDate={comment.inquiryCommentCrtDT}
                content={comment.inquiryCommentContent}
                inquiryId={comment.inquiryId}
                commentId={comment.inquiryCommentId}
                likeCount={comment.inquiryCommentLikeCount}
                profileImage={comment.memberDTO.profileFile}
                commentLike={comment.commentLike}
              />
            ))}

          <Grid
            container
            justifyContent="flex-end"
            alignItems="center"
            mb="0.5rem"
            mt="1.5rem"
          >
            <Button
              variant="contained"
              style={{ color: "white" }}
              color="green"
              onClick={handleListClick}
            >
              목록
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default InquiryDetail;
