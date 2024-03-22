import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import CoTypography from "../../atoms/common/CoTypography";
import ContentsStarRating from "../contents/list/ContentsStarRating";
import CoHoverButton from "../../atoms/common/CoHoverButton";
import Codialog from "../common/Codialog";
import ModifyDialog from "../review/Modifydialog";

const ReviewList = () => {
  const [reviewPostOpen, setReviewPostOpen] = useState(false);
  const [reviewModifyOpen, setReviewModifyOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handlePostOpen = () => {
    setReviewPostOpen(true);
  };

  const handlePostClose = () => {
    setReviewPostOpen(false);
  };

  const handleModifyOpen = (review) => {
    setSelectedReview(review);
    setReviewModifyOpen(true);
  };

  const handleModifyClose = () => {
    setReviewModifyOpen(false);
  };

  const [sortBy, setSortBy] = useState("latest");

  const handleChangeSort = (newValue) => {
    setSortBy(newValue);
  };

  const reviews = [
    {
      userName: "User1",
      reviewContent: "명강의 추천드립니다.",
      date: "2022-01-01",
      rating: 3,
    },
    {
      userName: "User2",
      reviewContent: "정말 도움이 되었습니다.",
      date: "2022-01-02",
      rating: 4,
    },
    {
      userName: "User3",
      reviewContent: "명강의 추천드립니다.",
      date: "2022-01-03",
      rating: 1,
    },
    {
      userName: "User4",
      reviewContent: "정말 도움이 되었습니다.",
      date: "2022-01-04",
      rating: 2,
    },
    {
      userName: "User5",
      reviewContent: "정말 도움이 되었습니다.",
      date: "2022-01-05",
      rating: 2.5,
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ButtonGroup variant="text">
          <Button
            onClick={() => handleChangeSort("latest")}
            color={sortBy === "latest" ? "primary" : "inherit"}
          >
            최신순
          </Button>
          <Button
            onClick={() => handleChangeSort("highestRated")}
            color={sortBy === "highestRated" ? "primary" : "inherit"}
          >
            별점높은순
          </Button>
          <Button
            onClick={() => handleChangeSort("lowestRated")}
            color={sortBy === "lowestRated" ? "primary" : "inherit"}
          >
            별점낮은순
          </Button>
        </ButtonGroup>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CoTypography sx={{ marginRight: "0.75rem" }}>
            평점 3.3 / 5
          </CoTypography>
          <CoHoverButton onClick={handlePostOpen}>후기등록</CoHoverButton>
          <Codialog open={reviewPostOpen} handleClickClose={handlePostClose} />
        </Box>
      </Box>
      <Table
        sx={{
          borderTop: "1px solid black",
        }}
      >
        <TableBody>
          {reviews.map((review, index) => (
            <TableRow key={index}>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <ContentsStarRating
                    size="small"
                    readOnly={true}
                    rating={review.rating}
                  />
                  <CoTypography size="TableContent">
                    {review.userName}
                  </CoTypography>
                  <CoTypography size="TableContent">
                    {review.reviewContent}
                  </CoTypography>
                  <CoTypography size="Tag">{review.date}</CoTypography>
                </Box>
              </TableCell>
              <TableCell align="right" sx={{ verticalAlign: "top" }}>
                <ButtonGroup variant="text">
                  <Button
                    style={{ border: "none" }}
                    onClick={() => handleModifyOpen(review)}
                  >
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModifyDialog
        open={reviewModifyOpen}
        handleClickClose={handleModifyClose}
        review={selectedReview}
      />
      <CoHoverButton
        variant="outlined"
        size="large"
        style={{ marginTop: "1rem", width: "100%" }}
      >
        수강평 더보기
      </CoHoverButton>
    </>
  );
};

export default ReviewList;
