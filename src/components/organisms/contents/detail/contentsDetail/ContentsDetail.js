
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReviewList from "../../../review/ReviewList";
import Inquriy from "../../../inquiry/Inquriy";
import { useState } from "react";
import CurriculumCourse from "../CurriculumCourse";


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
          <Typography>{children}</Typography>
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
  const [value, setValue] = React.useState(0);

  const [view, setView] = useState("list");
  const [selectedInquiryId, setSelectedInquiryId] = useState(null);

  const handleWriteClick = () => {
    setView("write");
  };

  const handleInquiryClick = (id) => {
    setSelectedInquiryId(id);
    setView("detail");
  };

  // props로 변수값(state 함수아님) 보내주기, 부모 컴포넌트에서 스테이트 만들어서 보내주기
  // const [reviewCount, setReviewCount] = useState(10); << 이런식으로 부모컴포넌트에 작성하기
  // useEffect안에 exios로 강의 id가져와서 스테이트에 넣어주고 보내주면됨
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getReviewCount = () => {
    return 10;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="소개" {...a11yProps(0)} />
          <Tab label="코스" {...a11yProps(1)} />
          <Tab label={`후기 (${getReviewCount()})`} {...a11yProps(2)} />
          <Tab label="게시판" {...a11yProps(3)} />
        </Tabs>
      </Box>

      {/* 소개 */}
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      {/* 코스 */}
      <CustomTabPanel value={value} index={1}>
        <CurriculumCourse/>
      </CustomTabPanel>
      {/* 후기 */}
      <CustomTabPanel value={value} index={2}>
        <ReviewList></ReviewList>
      </CustomTabPanel>
      {/* 게시판 */}
      <CustomTabPanel value={value} index={3}>
        {view === "list" && (
          <Inquriy
            onInquiryClick={(id) => handleInquiryClick(id)} // 이벤트 핸들러 추가
          />
        )}
        {/* {view === "detail" && <InquiryDetail id={selectedInquiryId} />} */}
        {/* {view === "write" && <InquiryWrite />} */}
      </CustomTabPanel>
    </Box>
  );
}

// export default ContentsDetail;
