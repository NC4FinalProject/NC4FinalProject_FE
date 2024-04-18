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
    page,
    setPage,
    updateInquiryView,
    fetchMyInquiries,
    setInquiry,
    setComments,
  } = useStore();

  const [sortBy, setSortBy] = useState("entire");
  const [Option, setOption] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const { contentsId } = useParams();
  const setContentsId = useStore((state) => state.setContentsId);
  const { contentsTitle } = useContentsStore();
  const {memberInfo} = MemberStore();

  useEffect(() => {
    const fetchData = async () => {
      setContentsId(parseInt(contentsId));
      await fetchInquiries(contentsId);
    };
    fetchData();
  }, []);

  const handleChangeSort = (newValue) => {
    setSortBy(newValue);
    if(newValue === 'entire') {
      const fetchData = async () => {
        setContentsId(parseInt(contentsId));
        await fetchInquiries(contentsId);
      };
      fetchData();
    } else if(newValue === 'mine') {
      const fetchMyData = async () => {
        setContentsId(parseInt(contentsId));
        await fetchMyInquiries(contentsId);
      };
      fetchMyData();
    }
  };

  const handleChange = (event) => {
    setOption(event.target.value);
    setSearchCondition(event.target.value);
  };

  const handleRowClick = (inquiryId) => {
    const selected = inquiries.content.find(
      (inquiry) => inquiry.inquiryId === inquiryId
    );
    if(!selected.private) {
      setInquiry(selected);
      setComments(selected.inquiryCommentDTOList);
      setSelectedInquiry(selected);
      onInquiryClick(selected);
      updateInquiryView(inquiryId);
    } else {
      if(selected.memberDTO.userNickname === memberInfo.userNickname ||
        memberInfo.role === "ADMIN" ||
        selected.author === memberInfo.userNickname
      ) {
        setInquiry(selected);
        setComments(selected.inquiryCommentDTOList);
        setSelectedInquiry(selected);
        onInquiryClick(selected);
        updateInquiryView(inquiryId);
      } else {
        alert("비밀글입니다.");
        return;
      }
    }
  };

  const handlePostClick = () => {
    inquiryPostClick();
  };

  const handleSearchKeywordChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const selectSearch = [
    {
      value: "all",
      name: "전제"
    }, {
      value: "title",
      name: "제목"
    }, {
      value: "content",
      name: "내용"
    }, {
      value: "writer",
      name: "작성자"
    }, {
      value: "tag",
      name: "태그"
    } 
  ];
  
  const changePage = (e, v) => {
    setPage(parseInt(v) - 1);
    const fetchData = async () => {
      setContentsId(parseInt(contentsId));
      await fetchInquiries(contentsId);
    };
    fetchData();
  };

  const handleSearch = (e) => {
    const fetchData = async () => {
      setContentsId(parseInt(contentsId));
      await fetchInquiries(contentsId);
    };
    if(e.target.name === "searchKeyword") {
      if(e.keyCode === 13) {
        fetchData();
      }
    } else {
      fetchData();
    }
  }

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
            onClick={() => handleChangeSort("entire")}
            color={sortBy === "entire" ? "primary" : "inherit"}
          >
            <CoTypography size="Content">전체보기</CoTypography>
          </Button>
          <CoTypography
            size="TableContent"
            sx={{ display: "flex", alignItems: "center" }}
          >
            |
          </CoTypography>
          {sessionStorage.getItem("ACCESS_TOKEN") && 
          (
            <Button
              onClick={() => handleChangeSort("mine")}
              color={sortBy === "mine" ? "primary" : "inherit"}
            >
              <CoTypography size="Content">내가 쓴 글 보기</CoTypography>
            </Button>
          )}
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
          {inquiries.content && inquiries.content.map((inquiry) => (
            <TableRow
              key={inquiry.inquriyId}
              style={{ display: "flex", width: "100%" }}
              onClick={() => handleRowClick(inquiry.inquiryId)}
              inquiries={inquiries}
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
                    {inquiry.private && (
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
                      label={inquiry.solved ? "해결완료" : "미해결"}
                      sx={{
                        backgroundColor: inquiry.solved
                          ? "primary.main"
                          : "primary",
                        color: inquiry.solved ? "white" : "primary",
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
                    {!inquiry.private ? inquiry.inquiryContent.substring(9, inquiry.inquiryContent.indexOf("&lt;", 8)) : "비밀글입니다."}
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
                      {inquiry.memberDTO.userNickname} | {inquiry.inquiryUdtDT.substring(0, 10)}
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
                          {inquiry.inquiryView}
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
          <StyledFormControl fullWidth size="small" onSubmit={handleSearch}>
            <StyledInputLabel id="search-label">search</StyledInputLabel>
            <Select
              labelId="search-label"
              id="search"
              value={searchCondition}
              label="search"
              onChange={handleChange}
            >
              {selectSearch.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.name}
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
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
          onKeyDown={handleSearch}
          name="searchKeyword"
          placeholder="검색어를 입력해주세요. "
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ cursor: "pointer" }} 
                onClick={handleSearch}
                name="searchIcon"/>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Pagination
        count={inquiries.totalPages}
        page={page + 1} 
        onChange={changePage}
        color="primary"
        sx={{ mt: "2rem", display: "flex", justifyContent: "center" }}
      />
    </>
  );
};
export default Inquiry;
