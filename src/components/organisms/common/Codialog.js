import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const Codialog = ({ open, handleClose }) => {
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState(2);

  // 평점을 변경하는 함수
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  // 리뷰를 변경하는 함수
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  // 리뷰를 제출하는 함수
  const handleSubmit = () => {
    console.log({ review, rating });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>후기 등록</DialogTitle>
      <DialogContent>
        <Typography variant="body2" gutterBottom>
          관련된 글은 구매후에 따라 작성될 수 있습니다.
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="후기작성"
          type="text"
          fullWidth
          variant="standard"
          value={review}
          onChange={handleReviewChange}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Typography component="legend">별점</Typography>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={handleRatingChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소하기</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          등록하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Codialog;
