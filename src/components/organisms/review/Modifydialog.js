import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CoTypography from "../../atoms/common/CoTypography";
import ContentsStarRating from "../contents/list/ContentsStarRating";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import useReviewStore from "../../../stores/ReviewStore";

const Modifydalog = ({
  open,
  handleClickClose,
  review,
  userNickname,
  contentsId,
  crtDate,
  udtDate,
}) => {
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const modifyReview = useReviewStore((state) => state.modifyReview);
  const { setReviews } = useReviewStore();
  const paymentList = useReviewStore((state) => state.paymentList);

  useEffect(() => {
    if (review) {
      setReviewContent(review.reviewContent);
      setReviewRating(review.reviewRating);
    }
  }, [review]);

  const handleReviewChange = (newValue) => {
    setReviewContent(newValue);
  };

  const handleRatingChange = (newValue) => {
    setReviewRating(newValue);
    console.log(newValue);
  };

  const handleCancel = () => {
    setReviewContent("");
    setReviewRating(0);
    handleClickClose();
  };

  const handleSubmit = async () => {
    let matchingPayment;
    let matchingContent;

    for (let payment of paymentList) {
      const contentsList = payment.contentsList || [];
      matchingContent = contentsList.find(
        (content) => content.contentsId === Number(contentsId)
      );
      if (matchingContent) {
        matchingPayment = payment;
        break;
      }
    }

    if (!matchingPayment || !matchingContent) {
      alert("결제 정보 또는 콘텐츠를 찾을 수 없습니다.");
      return;
    }

    const reviewList = await modifyReview(
      review.reviewId,
      reviewContent,
      reviewRating,
      matchingPayment.paymentId,
      matchingContent.contentsId
    );

    alert("후기가 수정되었습니다.");
    setReviews(reviewList);
    handleClickClose();
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          handleClickClose(event);
        }
      }}
      disableEscapeKeyDown
    >
      <DialogTitle style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
        <CoTypography size="DialogTitle">후기 수정</CoTypography>
      </DialogTitle>
      <DialogContent
        style={{
          width: "28.125rem",
          height: "26rem",
          padding: "1rem",
          margin: "0 auto",
        }}
      >
        <Box
          style={{
            width: "95%",
            maxWidth: "26rem",
            background: "#EFEFEF",
            padding: "0.625rem",
            margin: "0 auto",
            borderRadius: "0.25rem",
          }}
        >
          <CoTypography size="Content" style={{ marginBottom: "35px" }}>
            1. 관련 없는 글은 규정에 따라 삭제될 수 있습니다.
            <br />
            2. 욕설, 비방, 광고성 글은 삭제 및 제재될 수 있습니다.
          </CoTypography>
        </Box>
        <Table
          sx={{
            borderCollapse: "collapse",
            borderStyle: "hidden",
            margin: "2rem auto 0",
            width: "100%",
            maxWidth: "27rem",
            borderRadius: "0.25rem",
            boxShadow: "inset 0 0 0 1px #E0E0E0",
            textAlign: "center",
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell>
                <CoTypography size="Content">
                  작성자 : {userNickname} <br />
                  작성일 :{" "}
                  {udtDate
                    ? format(new Date(udtDate), "yyyy-MM-dd")
                    : crtDate
                    ? format(new Date(crtDate), "yyyy-MM-dd")
                    : "Unknown"}
                </CoTypography>
              </TableCell>
              <TableCell>
                <ContentsStarRating
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "1rem",
                  }}
                  rating={reviewRating}
                  onChange={handleRatingChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <TextField
                  multiline
                  rows={6}
                  value={reviewContent}
                  onChange={(e) => handleReviewChange(e.target.value)}
                  fullWidth
                  variant="standard"
                  placeholder="후기를 작성해주세요."
                  required
                  sx={{
                    width: "100%",
                  }}
                  InputProps={{ disableUnderline: true }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            justifyContent: "center",
            width: "100%",
            display: "flex",
            transform: "translateY(-60%)",
          }}
        >
          <Button
            onClick={handleCancel}
            variant="outlined"
            style={{
              marginRight: "1.25rem",
              color: "black",
              borderColor: "#ced4da",
            }}
          >
            취소하기
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            수정하기
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default Modifydalog;
