import React, { useEffect, useMemo, useState } from "react";
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
import { useParams } from "react-router-dom";
import CoTypography from "../../atoms/common/CoTypography";
import ContentsStarRating from "../contents/list/ContentsStarRating";
import CoHoverButton from "../../atoms/common/CoHoverButton";
import Codialog from "../common/Codialog";
import ModifyDialog from "../review/Modifydialog";
import useReviewStore from "../../../stores/ReviewStore";

const ReviewList = () => {
  const [reviewPostOpen, setReviewPostOpen] = useState(false);
  const [reviewModifyOpen, setReviewModifyOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [sortBy, setSortBy] = useState("latest");
  const [reviewsToShow, setReviewsToShow] = useState(5);

  const { contentsId } = useParams();

  const reviews = useReviewStore((state) => state.reviews);
  const loginMemberId = useReviewStore((state) => state.loginMemberId);
  const loginMemberNickname = useReviewStore(
    (state) => state.loginMemberNickname
  );

  const getReviews = useReviewStore((state) => state.getReviews);
  useEffect(() => {
    const fetchReviews = async () => {
      await getReviews(contentsId);
    };
    fetchReviews();
  }, []);

  const handleViewMore = () => {
    setReviewsToShow(reviewsToShow + 5);
  };

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

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;

    // 배열의 각 요소에 대해 지정된 콜백 함수를 실행하여 하나의 결과값을 반환
    const totalRating = reviews.reduce((acc, cur) => acc + cur.reviewRating, 0);
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
          {reviews &&
            reviews.slice(0, reviewsToShow).map((review) => {
              return (
                <React.Fragment key={review.reviewId}>
                  <CoTypography sx={{ marginRight: "0.75rem" }}>
                    {/* toFixed(1) 소수점 1째자리까지 표현 */}
                    평점 {averageRating.toFixed(1)} / 5
                  </CoTypography>
                </React.Fragment>
              );
            })}
          {/* {(!loginMemberId ||
            (loginMemberId &&
              review.memberDTO &&
            loginMember.member.id === review.memberDTO.id)) && ( */}

          <Codialog
            open={reviewPostOpen}
            handleClickClose={handlePostClose}
            userNickname={loginMemberNickname}
            contentsId={contentsId}
          />
          <CoHoverButton onClick={handlePostOpen} variant="outlined">
            후기등록
          </CoHoverButton>
          {/* )} */}
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
          {reviews &&
            reviews.slice(0, reviewsToShow).map((review) => {
              return (
                <TableRow
                  key={review.reviewId}
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
                      src={
                        review.memberDTO && review.memberDTO.profileFile
                          ? review.memberDTO.profileFile
                          : undefined
                      }
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
                        rating={review.reviewRating}
                        sx={{ ml: "-0.2rem" }}
                      />

                      {loginMemberId &&
                        review.memberDTO &&
                        loginMemberId === review.memberDTO.id && (
                          <ButtonGroup
                            variant="text"
                            sx={{ mt: "-0.5rem", mr: "-0.5rem" }}
                          >
                            <Button
                              style={{ border: "none" }}
                              onClick={() => handleModifyOpen(review)}
                            >
                              <CoTypography size="TableContent">
                                수정
                              </CoTypography>
                            </Button>
                            <CoTypography
                              size="TableContent"
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              |
                            </CoTypography>
                            <Button>
                              <CoTypography size="TableContent">
                                삭제
                              </CoTypography>
                            </Button>
                          </ButtonGroup>
                        )}
                    </Box>
                    <Box>
                      <CoTypography size="TableContent" sx={{ mb: "1rem" }}>
                        {review.memberDTO && review.memberDTO.userNickname
                          ? review.memberDTO.userNickname
                          : "Unknown"}
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
                      <CoTypography size="Tag">
                        {review.reviewUdtDate}
                      </CoTypography>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <ModifyDialog
        open={reviewModifyOpen}
        handleClickClose={handleModifyClose}
        review={selectedReview}
        userNickname={loginMemberNickname}
        contentsId={contentsId}
      />
      <CoHoverButton
        variant="outlined"
        size="large"
        style={{ marginTop: "1rem", width: "100%" }}
        onClick={handleViewMore}
      >
        수강평 더보기
      </CoHoverButton>
    </>
  );
};

export default ReviewList;
