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
import { format } from "date-fns";

const ReviewList = () => {
  const [reviewPostOpen, setReviewPostOpen] = useState(false);
  const [reviewModifyOpen, setReviewModifyOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [sortBy, setSortBy] = useState("latest");
  const [reviewsToShow, setReviewsToShow] = useState(5);
  const [isExpanded, setIsExpanded] = useState({});

  const { contentsId } = useParams();

  const deleteReview = useReviewStore((state) => state.deleteReview);
  const reviews = useReviewStore((state) => state.reviews);
  const loginMemberId = useReviewStore((state) => state.loginMemberId);
  const loginMemberRole = useReviewStore((state) => state.loginMemberRole);
  const { setReviews } = useReviewStore();
  const paymentList = useReviewStore((state) => state.paymentList);
  const loginMemberNickname = useReviewStore(
    (state) => state.loginMemberNickname
  );

  console.log("loginMemberRole:", loginMemberRole);

  const getReviews = useReviewStore((state) => state.getReviews);

  useEffect(() => {
    const fetchReviews = async () => {
      await getReviews(contentsId);
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    const sortedReviews = [...reviews];
    if (sortBy === "latest") {
      sortedReviews.sort((a, b) => {
        const dateA = a.reviewUdtDate
          ? new Date(a.reviewUdtDate)
          : new Date(a.reviewCrtDate);
        const dateB = b.reviewUdtDate
          ? new Date(b.reviewUdtDate)
          : new Date(b.reviewCrtDate);
        return dateB - dateA;
      });
      console.log("sortedReviews:", sortedReviews);
    } else if (sortBy === "highestRated") {
      sortedReviews.sort((a, b) => b.reviewRating - a.reviewRating);
    } else if (sortBy === "lowestRated") {
      sortedReviews.sort((a, b) => a.reviewRating - b.reviewRating);
    }

    setReviews(sortedReviews);
  }, [sortBy]);

  console.log("paymentList:", paymentList);

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
    setSelectedReview({
      ...review,
      crtDate: review.reviewCrtDate,
      udtDate: review.reviewUdtDate,
    });
    setReviewModifyOpen(true);
  };

  const handleModifyClose = () => {
    setReviewModifyOpen(false);
  };

  const handleDeleteReview = async (reviewId) => {
    const reviewList = await deleteReview(reviewId, contentsId);
    console.log("reviewId:", reviewId);
    console.log("contentsId:", contentsId);
    setReviews(reviewList);
    alert("삭제되었습니다.");
  };

  const hasPaymentList = Array.isArray(paymentList);

  let hasPaid = false;
  if (hasPaymentList) {
    for (let payment of paymentList) {
      const contentsList = payment.contentsList || [];
      const matchingContent = contentsList.find(
        (content) => content.contentsId === Number(contentsId)
      );
      if (matchingContent) {
        hasPaid = true;
        break;
      }
    }
  }

  const hasWritten =
    reviews &&
    reviews.some(
      (review) =>
        review.memberDTO && review.memberDTO.memberId === loginMemberId
    );

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
            onClick={() => setSortBy("latest")}
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
            onClick={() => setSortBy("highestRated")}
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
            onClick={() => setSortBy("lowestRated")}
            color={sortBy === "lowestRated" ? "primary" : "inherit"}
          >
            <CoTypography size="Content">별점낮은순</CoTypography>
          </Button>
        </ButtonGroup>

        <Box sx={{ display: "flex", alignItems: "center", mb: "1rem" }}>
          <CoTypography sx={{ marginRight: "0.75rem" }}>
            {/* toFixed(1) 소수점 1째자리까지 표현 */}
            평점 {averageRating === 0 ? "0" : averageRating.toFixed(1)} / 5.0
          </CoTypography>

          {loginMemberId && hasPaid && !hasWritten ? (
            <React.Fragment>
              <Codialog
                open={reviewPostOpen}
                handleClickClose={handlePostClose}
                userNickname={loginMemberNickname}
                contentsId={contentsId}
              />
              <CoHoverButton onClick={handlePostOpen} variant="outlined">
                후기등록
              </CoHoverButton>
            </React.Fragment>
          ) : null}
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
                <React.Fragment key={review.reviewId}>
                  <TableRow sx={{ display: "flex", flexDirection: "row" }}>
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
                        {(loginMemberId &&
                          review.memberDTO &&
                          loginMemberId === review.memberDTO.memberId) ||
                        loginMemberRole === "ADMIN" ? (
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
                            <Button
                              onClick={() => {
                                if (window.confirm("삭제하시겠습니까?")) {
                                  handleDeleteReview(review.reviewId);
                                }
                              }}
                            >
                              <CoTypography size="TableContent">
                                삭제
                              </CoTypography>
                            </Button>
                          </ButtonGroup>
                        ) : null}
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
                            width: "100%",
                            mb: "1rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: isExpanded[review.reviewId]
                              ? "normal"
                              : "nowrap",
                          }}
                        >
                          {review.reviewContent}
                        </CoTypography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                          onClick={() => {
                            setIsExpanded((prevState) => ({
                              ...prevState,
                              [review.reviewId]: !prevState[review.reviewId],
                            }));
                          }}
                        >
                          <CoTypography size="Tag">
                            {review.reviewUdtDate
                              ? format(
                                  new Date(review.reviewUdtDate),
                                  "yyyy-MM-dd"
                                )
                              : format(
                                  new Date(review.reviewCrtDate),
                                  "yyyy-MM-dd"
                                )}
                          </CoTypography>
                          <CoTypography
                            size="Tag"
                            sx={{
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            {isExpanded[review.reviewId] ? "접기" : "더보기"}
                          </CoTypography>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          <ModifyDialog
            open={reviewModifyOpen}
            handleClickClose={handleModifyClose}
            review={selectedReview}
            userNickname={loginMemberNickname}
            contentsId={contentsId}
            crtDate={selectedReview ? selectedReview.reviewCrtDate : null}
            udtDate={selectedReview ? selectedReview.reviewUdtDate : null}
          />
        </TableBody>
      </Table>
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
