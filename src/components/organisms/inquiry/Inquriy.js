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
  Typography,
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

const Inquriy = ({ onInquiryClick }) => {
  const [sortBy, setSortBy] = useState("latest");
  const [Option, setOption] = useState("");

  const handleChangeSort = (newValue) => {
    setSortBy(newValue);
  };

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  const handleRowClick = (id) => {
    // 선택된 inquiry ID를 부모 컴포넌트로 전달합니다.
    onInquiryClick(id);
  };

  const Inquiries = [
    {
      inquiryTitle: "강의 관련 질문 있습니다.",
      userName: "User1",
      inquiryContent: "모르게쑤요...",
      date: "2022-01-01",
      tag: null,
      isPrivate: false,
      isSolved: true,
      commentCount: 1,
      likeCount: 1,
      viewCount: 1,
    },
    {
      inquiryTitle: "강의 관련 질문 있습니다.",
      userName: "User2",
      inquiryContent: "어려워요.",
      date: "2022-01-02",
      tag: null,
      isPrivate: false,
      isSolved: true,
      commentCount: 5,
      likeCount: 30,
      viewCount: 5,
    },
    {
      inquiryTitle: "강의 관련 질문 있습니다.",
      userName: "User3",
      inquiryContent: "홀리.",
      date: "2022-01-03",
      tag: null,
      isPrivate: false,
      isSolved: false,
      commentCount: 15,
      likeCount: 1300,
      viewCount: 2,
    },
    {
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

  const selectSearch = ["전체", "조회순", "좋아요순", "댓글많은순"];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <CoHoverButton variant="outlined">글 쓰기</CoHoverButton>
      </Box>
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
          <Box sx={{ minWidth: "7.5rem", mb: "0rem" }}>
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
              width: "20rem",
              "& .MuiInputBase-input": {
                height: "1rem",
                padding: "10px",
                "&::placeholder": {
                  textAlign: "center",
                },
              },
            }}
            placeholder="검색어를 입력해주세요."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ cursor: "pointer" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      <Table
        sx={{
          borderTop: "1px solid black",
        }}
      >
        <TableBody>
          {Inquiries.map((inquiry, index) => (
            <TableRow key={index}>
              <TableCell sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                      }}
                    />
                  </Box>
                </Box>

                <CoTypography
                  size="Content"
                  sx={{ mb: "1rem", color: "#7d7d7d" }}
                >
                  {inquiry.inquiryContent}
                </CoTypography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CoTypography size="Tag">
                      {inquiry.userName} | {inquiry.date}
                    </CoTypography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flex: 1,
                      ml: "1rem",
                    }}
                  >
                    <CoTypography
                      size="Tag"
                      color="textSecondary"
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        minWidth: "4rem",
                      }}
                    >
                      <ThumbUp
                        sx={{
                          mr: "0.25rem",
                        }}
                      />
                      {inquiry.likeCount}
                    </CoTypography>

                    <CoTypography
                      size="Tag"
                      color="textSecondary"
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        minWidth: "4rem",
                      }}
                    >
                      <Visibility
                        sx={{
                          mr: "0.25rem",
                        }}
                      />
                      {inquiry.viewCount}
                    </CoTypography>

                    <CoTypography
                      size="Tag"
                      color="textSecondary"
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        minWidth: "4rem",
                      }}
                    >
                      <ChatBubbleOutline
                        sx={{
                          mr: "0.25rem",
                        }}
                      />
                      {inquiry.commentCount}
                    </CoTypography>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={10}
        color="primary"
        sx={{ mt: "3.5rem", display: "flex", justifyContent: "center" }}
      />
    </>
  );
};
export default Inquriy;
