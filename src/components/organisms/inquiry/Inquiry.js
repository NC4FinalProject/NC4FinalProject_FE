import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Chip,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  InputAdornment,
  TextField,
  Pagination,
  Grid,
} from "@mui/material";
import CoTypography from "../../atoms/common/CoTypography";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import {
  LockOutlined,
  ThumbUp,
  Visibility,
  ChatBubbleOutline,
} from "@mui/icons-material";
import CoHoverButton from "../../atoms/common/CoHoverButton";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import MemberStore from "../../../stores/MemberStore";
import useStore from "../../../stores/InquiryStore";
import { useContentsStore } from "../../../stores/ContentsStore";

const StyledFormControl = styled(FormControl)`
  & .MuiInputBase-root {
    height: 2.25rem;
  }
`;

const StyledInputLabel = styled(InputLabel)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
`;

const Inquiry = ({ onInquiryClick, inquiryPostClick }) => {
  const {
    inquiries,
    paymentList,
    searchCondition,
    searchKeyword,
    likeCnt,
    liked,
    setLikeCheck,
    setLikeCnt,
    setInquiryFiles,
    setInquiryFileDTOList,
    setInquiries,
    setSearchCondition,
    setSearchKeyword,
    fetchInquiries,
    handleInquirySubmit,
    inquiryFiles,
    inquiryFileDTOList,
    setInquiryTitle,
    setInquiryContent,
  } = useStore();

  const [sortBy, setSortBy] = useState("latest");
  const [Option, setOption] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const { contentsId } = useParams();
  const setContentsId = useStore((state) => state.setContentsId);
  const { contentsTitle } = useContentsStore();

  useEffect(() => {
    const fetchData = async () => {
      setContentsId(parseInt(contentsId));
      await fetchInquiries(contentsId);
    };
    fetchData();
  }, []);

  console.log(contentsId);
  console.log(inquiries);
  const handleChangeSort = (newValue) => {
    setSortBy(newValue);
  };

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  const handleRowClick = (inquiryId) => {
    const selected = Inquiries.find(
      (inquiry) => inquiry.inquriyId === inquiryId
    );
    setSelectedInquiry(selected);
    onInquiryClick(selected);
  };

  const handlePostClick = () => {
    inquiryPostClick();
  };

  const handleSearchConditionChange = (event) => {
    setSearchCondition(event.target.value);
  };

  const handleSearchKeywordChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const Inquiries = [
    {
      inquriyId: 1,
      inquiryTitle: "강의 관련 질문 있습니다.",
      userNickName: "User1",
      inquiryContent:
        "몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루몰루",
      date: "2022-01-01",
      tag: null,
      contentsName: "이것이 자바다",
      isPrivate: false,
      isSolved: true,
      commentCount: 1,
      likeCount: 1,
      viewCount: 1,
      inquiryComments: [
        {
          commenterName: "User2",
          commentDate: "2022-01-02",
          commentContent: "어려워요.",
          commentLikeCount: 30,
          profileImage: "user2.jpg",
        },
        {
          commenterName: "User3",
          commentDate: "2022-01-03",
          commentContent:
            "정말 어려운 문제입니다. 정말 어려운 문제입니다. 정말 어려운 문제입니다.정말 어려운 문제입니다.정말 어려운 문제입니다. 정말 어려운 문제입니다.정말 어려운 문제입니다. 정말 어려운 문제입니다. 정말 어려운 문제입니다. 정말 어려운 문제입니다. 정말 어려운 문제입니다.정말 어려운 문제입니다. 정말 어려운 문제입니다.정말 어려운 문제입니다.정말 어려운 문제입니다. 정말 어려운 문제입니다. 정말 어려운 문제입니다. 정말 어려운 문제입니다.정말 어려운 문제입니다.정말 어려운 문제입니다. 정말 어려운 문제입니다. 정말 어려운 문제입니다. 정말 어려운 문제입니다.정말 어려운 문제입니다. 정말 어려운 문제입니다.정말 어려운 문제입니다. ",
          commentLikeCount: 20,
          profileImage: "user3.jpg",
        },
      ],
    },
    {
      inquriyId: 2,
      inquiryTitle: "강의 관련 질문 있습니다.",
      userName: "User2",
      inquiryContent:
        "어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.어려워요.",
      date: "2022-01-02",
      tag: null,
      isPrivate: false,
      isSolved: true,
      commentCount: 5,
      likeCount: 30,
      viewCount: 5,
    },
    {
      inquriyId: 3,
      inquiryTitle: "강의 관련 질문 있습니다.",
      userName: "User3",
      inquiryContent: "홀리.",
      date: "2022-01-03",
      tag: null,
      isPrivate: false,
      isSolved: false,
      commentCount: 150000,
      likeCount: 1300,
      viewCount: 2,
    },
    {
      inquriyId: 4,
      inquiryTitle: "강의 관련 질문 있습니다.",
      userName: "User4",
      inquiryContent: "응애.",
      date: "2022-01-04",
      tag: null,
      isPrivate: false,
      isSolved: false,
      commentCount: 5,
      likeCount: 300,
      viewCount: 5,
    },
    {
      inquriyId: 5,
      inquiryTitle: "강의 관련 질문 있습니다.",
      userName: "User5",
      inquiryContent: "리액트 졸잼.",
      date: "2022-01-05",
      tag: null,
      isPrivate: true,
      isSolved: false,
      commentCount: 6,
      likeCount: 5,
      viewCount: 3,
    },
  ];

  const selectSearch = ["전체", "작성자", "내용", "주제"];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ButtonGroup variant="text" sx={{ mb: "1rem" }}>
          <Button
            style={{ border: "none" }}
            onClick={() => handleChangeSort("latest")}
            color={sortBy === "latest" ? "primary" : "inherit"}
          >
            <CoTypography size="Content">전체보기</CoTypography>
          </Button>
          <CoTypography
            size="TableContent"
            sx={{ display: "flex", alignItems: "center" }}
          >
            |
          </CoTypography>
          <Button
            onClick={() => handleChangeSort("highestRated")}
            color={sortBy === "highestRated" ? "primary" : "inherit"}
          >
            <CoTypography size="Content">내가 쓴 글 보기</CoTypography>
          </Button>
        </ButtonGroup>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            mb: "1rem",
            justifyContent: "flex-end",
          }}
        >
          <CoHoverButton
            variant="outlined"
            style={{ height: "2.25rem" }}
            onClick={() => handlePostClick()}
          >
            글 쓰기
          </CoHoverButton>
        </Box>
      </Box>

      {/* 상위 태그에 싹다 플렉스 width : 100% 줘야 된다 */}
      <Table
        sx={{
          borderTop: "1px solid black",
          flexDirection: "column",
          display: "flex",
          width: "100%",
        }}
      >
        <TableBody
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {Inquiries.map((inquiry) => (
            <TableRow
              key={inquiry.inquriyId}
              style={{ display: "flex", width: "100%" }}
              onClick={() => handleRowClick(inquiry.inquriyId)}
              inquiries={Inquiries}
            >
              <TableCell
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <CoTypography size="Title" sx={{ mb: "1rem" }}>
                      {inquiry.inquiryTitle}
                    </CoTypography>
                    {inquiry.isPrivate && (
                      <LockOutlined
                        sx={{
                          marginLeft: "1rem",
                        }}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Chip
                      size="medium"
                      label={inquiry.isSolved ? "해결완료" : "미해결"}
                      sx={{
                        backgroundColor: inquiry.isSolved
                          ? "primary.main"
                          : "primary",
                        color: inquiry.isSolved ? "white" : "primary",
                        mt: "-1rem",
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <CoTypography
                    size="Content"
                    sx={{
                      width: "100%",
                      mb: "1rem",
                      color: "#7d7d7d",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {inquiry.inquiryContent}
                  </CoTypography>
                </Box>

                <Grid
                  container
                  item
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid
                    item
                    xs={5.5}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <CoTypography size="Tag">
                      {inquiry.userName} | {inquiry.date}
                    </CoTypography>
                  </Grid>

                  <Grid
                    item
                    xs={6.5}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Grid container item sx={{ justifyContent: "flex-end" }}>
                      <Grid item>
                        <CoTypography
                          size="Tag"
                          color="textSecondary"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mr: "0.5rem",
                          }}
                        >
                          <ThumbUp
                            sx={{
                              mr: "0.25rem",
                              fontSize: "1rem",
                            }}
                          />
                          {inquiry.likeCount}
                        </CoTypography>
                      </Grid>
                      <Grid item>
                        <CoTypography
                          size="Tag"
                          color="textSecondary"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mr: "0.5rem",
                          }}
                        >
                          <Visibility
                            sx={{
                              mr: "0.25rem",
                              fontSize: "1rem",
                            }}
                          />
                          {inquiry.viewCount}
                        </CoTypography>
                      </Grid>
                      <Grid item>
                        <CoTypography
                          size="Tag"
                          color="textSecondary"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <ChatBubbleOutline
                            sx={{
                              mr: "0.25rem",
                              fontSize: "1rem",
                            }}
                          />
                          {inquiry.commentCount}
                        </CoTypography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          mt: "2rem",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Box sx={{ width: "8rem", mb: "0rem" }}>
          <StyledFormControl fullWidth size="small">
            <StyledInputLabel id="search-label">search</StyledInputLabel>
            <Select
              labelId="search-label"
              id="search"
              value={Option}
              label="search"
              onChange={handleChange}
            >
              {selectSearch.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Box>
        <TextField
          sx={{
            width: "16rem",
            "& .MuiInputBase-input": {
              height: "1rem",
              padding: "10px",
              "&::placeholder": {
                textAlign: "center",
              },
            },
          }}
          placeholder="검색어를 입력해주세요. "
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ cursor: "pointer" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Pagination
        count={10}
        color="primary"
        sx={{ mt: "2rem", display: "flex", justifyContent: "center" }}
      />
    </>
  );
};
export default Inquiry;
