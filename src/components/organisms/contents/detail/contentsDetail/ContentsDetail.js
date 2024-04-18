import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReviewList from "../../../review/ReviewList";
import Inquiry from "../../../inquiry/Inquiry";
import { useState } from "react";
import InquiryDetail from "../../../inquiry/InquiryDetail";
import InquiryPost from "../../../inquiry/InquiryPost";
import InquiryModify from "../../../inquiry/InquiryModify";
import { useEffect } from "react";
import useReviewStore from "../../../../../stores/ReviewStore";
import { useParams, useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import { useRef } from "react";
import { useContentsStore } from "../../../../../stores/ContentsStore";
import Section from "./Section";
import HtmlParser from "react-html-parser";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ContentsDetail() {
  const [value, setValue] = useState(0);

  const [view, setView] = useState("list");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const { contentsId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const reviews = useReviewStore((state) => state.reviews);
  const getReviews = useReviewStore((state) => state.getReviews);
  const contentDetailRef = useRef(null);
  const [previousPageUrl, setPreviousPageUrl] = useState("");

  const { getSection, getContents } = useContentsStore();

  const scrollToTop = useCallback(() => {
    if (contentDetailRef.current) {
      contentDetailRef.current.scrollIntoView();
    }
  }, []);

  useEffect(() => {
    if (contentDetailRef.current) {
      contentDetailRef.current.scrollIntoView();
    }
  }, [contentDetailRef]);

  useEffect(() => {
    console.log(tab);
    if(tab && tab === "inquiry") {
      handleChange(null, getSection.length > 1 ? 3 : 2);
      a11yProps(getSection.length > 1 ? 3 : 2); 
    }
  }, [tab]);

  useEffect(() => {
    const fetchReviews = async () => {
      await getReviews(contentsId);
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  // 새로고침 시 안내문구
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     event.returnValue = false;
  //   };

  //   if (view === "list" || view === "write") {
  //     window.onbeforeunload = handleBeforeUnload;
  //   }

  //   return () => {
  //     window.onbeforeunload = null;
  //   };
  // }, []);

  useEffect(() => {
    const handleBackButtonClick = () => {
      if (view === "detail" || view === "write") {
        window.history.pushState(null, "", previousPageUrl);
        setView("list");
      } else {
        window.history.back();
      }
    };

    window.onpopstate = handleBackButtonClick;
    window.history.pushState(null, ",");

    return () => {
      window.onpopstate = null;
    };
  }, [view, previousPageUrl]);

  const handlePostClick = useCallback(() => {
    setPreviousPageUrl(window.location.href);
    setView("write");
  }, []);

  const handleModifyClick = useCallback(() => {
    setPreviousPageUrl(window.location.href);
    setView("modify");
  }, []);


  const handleInquiryClick = useCallback((inquiry) => {
    console.log(inquiry);
    setSelectedInquiry(inquiry);
    setView("detail");
  }, []);

  const handleListClick = useCallback(() => {
    setView("list");
  }, []);

  const handleCancelClick = useCallback(() => {
    setView("list");
  }, []);

  const handleModifyCancelClick = useCallback(() => {
    setView("detail");
  }, []);

  // props로 변수값(state 함수아님) 보내주기, 부모 컴포넌트에서 스테이트 만들어서 보내주기
  // const [reviewCount, setReviewCount] = useState(10); << 이런식으로 부모컴포넌트에 작성하기
  // useEffect안에 exios로 강의 id가져와서 스테이트에 넣어주고 보내주면됨
  const handleChange = useCallback(
    (event, newValue) => {
      if (
        view === "write" &&
        !window.confirm("작성 중인 글은 저장되지 않습니다. 계속하시겠습니까?")
      ) {
        return;
      }
      setValue(newValue);
      setView("list");
    },
    [view]
  );

  const courseTabIndex = getSection.length > 1 ? 1 : null; // "코스" 탭의 인덱스. 코스가 없으면 null
  const reviewTabIndex = getSection.length > 1 ? 2 : 1; // "코스" 탭이 있으면 후기는 인덱스 2, 없으면 1
  const inquiryTabIndex = getSection.length > 1 ? 3 : 2; // "코스" 탭이 있으면 질의응답은 인덱스 3, 없으면 2

  return (
    <Box sx={{ width: "100%" }} ref={contentDetailRef}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="소개" {...a11yProps(0)} />

          {getSection.length > 1 && (
            <Tab label="코스" {...a11yProps(courseTabIndex)} />
          )}

          <Tab
            label={`후기 (${reviews ? reviews.length : 0})`}
            {...a11yProps(reviewTabIndex)}
          />

          <Tab label="질의응답" {...a11yProps(inquiryTabIndex)} />
        </Tabs>
      </Box>

      {/* 소개 */}
      <CustomTabPanel value={value} index={0}>
        {HtmlParser(HtmlParser(getContents.introduce))}
      </CustomTabPanel>

      {/* 코스 */}
      {getSection.length > 1 && (
        <CustomTabPanel value={value} index={courseTabIndex}>
          <Section />
        </CustomTabPanel>
      )}

      {/* 후기 */}
      <CustomTabPanel value={value} index={reviewTabIndex}>
        <ReviewList></ReviewList>
      </CustomTabPanel>

      {/* 게시판 */}
      <CustomTabPanel value={value} index={inquiryTabIndex}>
        {view === "list" && (
          <Inquiry
            onInquiryClick={handleInquiryClick}
            inquiryPostClick={handlePostClick}
          />
        )}
        {view === "detail" && (
          <InquiryDetail
            handleModifyClick={handleModifyClick}
            onListClick={handleListClick}
            scrollToTop={scrollToTop}
          />
        )}
        {view === "write" && (
          <InquiryPost
            onCancelClick={handleCancelClick}
            scrollToTop={scrollToTop}
            contentsId={parseInt(contentsId)}
          />
        )}

        {view === "modify" && (
          <InquiryModify
            onCancelClick={handleModifyCancelClick}
            onListClick={handleListClick}
          />
        )}
      </CustomTabPanel>
    </Box>
  );
}

// export default ContentsDetail;
