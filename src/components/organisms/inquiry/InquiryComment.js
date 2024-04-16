import { Avatar, ButtonGroup, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CoTypography from "../../atoms/common/CoTypography";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import InquiryReportDialog from "./InquiryReportDialog";
import HtmlParser from "react-html-parser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import useStore from "../../../stores/InquiryStore";

const InquiryComment = ({
  name,
  regDate,
  content,
  likeCount,
  inquiryId,
  commentId,
  profileImage,
}) => {
  const [openCommentReportDialog, setOpenCommentReportDialog] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [inquiryCommentContent, setInquiryCommentContent] = useState("");

  const {modifyComment, deleteComment} = useStore();

  useEffect(() => {
    if(content) {
      setInquiryCommentContent(content.replaceAll("&lt;", "<").replaceAll("&gt;", ">"));
    }
  }, [content]);

  const handleOpenCommentReportDialog = () => {
    setOpenCommentReportDialog(true);
  };

  const handleCloseCommentReportDialog = () => {
    setOpenCommentReportDialog(false);
  };

  const handleInquiryCommentContentChange = (e, editor) => {
    const data = editor.getData();
    setInquiryCommentContent(data);
  }

  const handleCancelClick = () => {
    if (window.confirm("작성중인 글은 저장되지 않습니다. 취소하시겠습니까? ")) {
      alert("취소되었습니다.");
      setShowEditor(false);
    }
  };

  const handleModifyComment = async () => {
    await modifyComment(inquiryCommentContent, commentId);
    setShowEditor(false);
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
                <Button style={{ border: "none" }} onClick={() => setShowEditor(true)}>
                  <CoTypography size="TableContent">수정</CoTypography>
                </Button>
                <CoTypography
                  size="TableContent"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  |
                </CoTypography>
                <Button onClick={() => deleteComment(inquiryId, commentId)}>
                  <CoTypography size="TableContent">삭제</CoTypography>
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
          <Grid item xs={12} pb="1.25rem">
            {showEditor ? (
              <Grid>
                  <CKEditor
                      editor={ClassicEditor} 
                      data={inquiryCommentContent}
                      onChange={handleInquiryCommentContentChange}
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
                        onClick={handleCancelClick}
                      >
                        취소
                      </Button>
                      <Button onClick={handleModifyComment} color="primary" variant="contained">
                        수정
                      </Button>
                    </Grid>
                  </Grid>
              ) :(
                  <CoTypography size="TableContent" style={{ color: "#868e96" }}>
                    {HtmlParser(HtmlParser(content))}
                  </CoTypography>
              )}
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                mr: "0.5rem",
                cursor: "pointer",
              }}
              onClick={handleOpenCommentReportDialog}
            >
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
      <InquiryReportDialog
        open={openCommentReportDialog}
        handleClickClose={handleCloseCommentReportDialog}
      />
    </>
  );
};

export default InquiryComment;
