import React, { useState } from "react";
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

const Codialog = ({ open, handleClickClose }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  const handleReviewChange = (newValue) => {
    setReview(newValue.target.value);
  };

  const handleRatingChange = (newValue) => {
    setRating(newValue);
    console.log(newValue);
  };

  const handleCancel = () => {
    console.log(review);
    console.log(rating);
    setReview("");
    setRating(5);
    handleClickClose();
  };

  const handleSubmit = () => {
    console.log(review);
    console.log(rating);
    setReview("");
    setRating(5);
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
        <CoTypography size="DialogTitle">후기 등록</CoTypography>
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
                  작성자 : USER <br />
                  작성일 : 2021-10-10
                </CoTypography>
              </TableCell>
              <TableCell>
                <ContentsStarRating
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "1rem",
                  }}
                  rating={rating}
                  onChange={handleRatingChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <TextField
                  multiline
                  rows={6}
                  value={review}
                  onChange={handleReviewChange}
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
            style={{ marginRight: "1.25rem" }}
          >
            취소하기
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            등록하기
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default Codialog;
