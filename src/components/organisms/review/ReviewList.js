import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Avatar,
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
  const [sortBy, setSortBy] = useState("latest");

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

  const handleChangeSort = (newValue) => {
    setSortBy(newValue);
  };

  const reviews = [
    {
      userName: "User1",
      reviewContent:
        "명강의 추천드립니다.aaawsdfqwetasedfqwefqwefasdfasqwe4tqawerasedfasdfasdfasdfdfasdfasdfasdfqwerq",
      date: "2022-01-01",
      rating: 3,
      profileImage: null,
    },
    {
      userName: "User2",
      reviewContent:
        "명강의 추천드립니다.aaawsdfqwetasedfqwefqwefasdfasqwe4tqawerasedfasdfasdfasdfdfasdfasdfasdfqwerq",
      date: "2022-01-02",
      rating: 4,
      profileImage: null,
    },
    {
      userName: "User3",
      reviewContent: "명강의 추천드립니다.",
      date: "2022-01-03",
      rating: 1,
      profileImage: null,
    },
    {
      userName: "User4",
      reviewContent: "정말 도움이 되었습니다.",
      date: "2022-01-04",
      rating: 2,
      profileImage: null,
    },
    {
      userName: "User5",
      reviewContent: "정말 도움이 되었습니다.",
      date: "2022-01-05",
      rating: 2.5,
      profileImage: process.env.PUBLIC_URL + "/images/teacher.jpg",
    },
  ];
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;

    // 배열의 각 요소에 대해 지정된 콜백 함수를 실행하여 하나의 결과값을 반환
    const totalRating = reviews.reduce((acc, cur) => acc + cur.rating, 0);
    return totalRating / reviews.length;
  }, [reviews]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ButtonGroup variant="text" sx={{ mb: "1rem" }}>
          <Button
            style={{ border: "none" }}
            onClick={() => handleChangeSort("latest")}
            color={sortBy === "latest" ? "primary" : "inherit"}
          >
            <CoTypography size="Content">최신순</CoTypography>
          </Button>
          <CoTypography
            size="TableContent"
            sx={{ display: "flex", alignItems: "center" }}
          >
            |
          </CoTypography>
          <Button
            style={{ border: "none" }}
            onClick={() => handleChangeSort("highestRated")}
            color={sortBy === "highestRated" ? "primary" : "inherit"}
          >
            <CoTypography size="Content">별점높은순</CoTypography>
          </Button>
          <CoTypography
            size="TableContent"
            sx={{ display: "flex", alignItems: "center" }}
          >
            |
          </CoTypography>
          <Button
            onClick={() => handleChangeSort("lowestRated")}
            color={sortBy === "lowestRated" ? "primary" : "inherit"}
          >
            <CoTypography size="Content">별점낮은순</CoTypography>
          </Button>
        </ButtonGroup>
        <Box sx={{ display: "flex", alignItems: "center", mb: "1rem" }}>
          <CoTypography sx={{ marginRight: "0.75rem" }}>
            {/* toFixed(1) 소수점 1째자리까지 표현 */}
            평점 {averageRating.toFixed(1)} / 5
          </CoTypography>
          <CoHoverButton onClick={handlePostOpen} variant="outlined">
            후기등록
          </CoHoverButton>
          <Codialog open={reviewPostOpen} handleClickClose={handlePostClose} />
        </Box>
      </Box>
      <Table
        sx={{
          display: "flex",
          borderTop: "1px solid black",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <TableBody
          sx={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {reviews.map((review, index) => (
            <TableRow
              key={index}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <TableCell
                sx={{
                  verticalAlign: "top",
                  align: "left",
                  paddingRight: "0",
                }}
              >
                <Avatar
                  alt="profileImage"
                  src={review.profileImage}
                  sx={{ width: 40.4, height: 40.4 }}
                />
              </TableCell>
              <TableCell sx={{ width: "100%", overflow: "hidden" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <ContentsStarRating
                    size="small"
                    readOnly={true}
                    rating={review.rating}
                    sx={{ ml: "-0.2rem" }}
                  />

                  <ButtonGroup
                    variant="text"
                    sx={{ mt: "-0.5rem", mr: "-0.5rem" }}
                  >
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
                </Box>
                <Box>
                  <CoTypography size="TableContent" sx={{ mb: "1rem" }}>
                    {review.userName}
                  </CoTypography>
                  <CoTypography
                    size="TableContent"
                    sx={{
                      width: "70%",
                      mb: "1rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {review.reviewContent}
                  </CoTypography>
                  <CoTypography size="Tag">{review.date}</CoTypography>
                </Box>
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
