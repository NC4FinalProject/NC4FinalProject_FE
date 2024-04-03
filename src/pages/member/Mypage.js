import React, { useState } from 'react'
import PropTypes from "prop-types";
import { Container, Box } from '@mui/material';
import Typography from "@mui/material/Typography";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MemberInfo from '../../components/organisms/mypage/MemberInfo';

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
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const Mypage = () => {

    
    const [value, setValue] = useState(0);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '8%', maxWidth:'1300px' }}>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="계정정보" {...a11yProps(0)} />
                <Tab label="수강목록" {...a11yProps(1)} />
                <Tab label="즐겨찾기" {...a11yProps(2)} />
                <Tab label="구매내역" {...a11yProps(3)} />
                <Tab label="포인트" {...a11yProps(4)} />
                <Tab label="수료증" {...a11yProps(5)} />
                <Tab label="장바구니" {...a11yProps(6)} />
                <Tab label="알림설정" {...a11yProps(7)} />
                </Tabs>
            </Box>

            {/* 계정정보 */}

            <div
                role="tabpanel"
            >
                
                <Box sx={{ p: 3 }}>
                    <Typography component={"div"}>
                        <MemberInfo/>
                    </Typography>
                </Box>
                
            </div>
            {/* <CustomTabPanel value={value} index={0}>
                <MemberInfo/>
            </CustomTabPanel> */}

            {/* 수강목록 */}
            <CustomTabPanel value={value} index={1}>
                수강목록
            </CustomTabPanel>

            {/* 즐겨찾기 */}
            <CustomTabPanel value={value} index={2}>
                즐겨찾기
            </CustomTabPanel>

            {/* 구매목록 */}
            <CustomTabPanel value={value} index={3}>
                구매목록
            </CustomTabPanel>

            {/* 포인트 */}
            <CustomTabPanel value={value} index={4}>
                포인트
            </CustomTabPanel>

            {/* 수료증 */}
            <CustomTabPanel value={value} index={5}>
                수료증
            </CustomTabPanel>

            {/* 장바구니 */}
            <CustomTabPanel value={value} index={6}>
                장바구니
            </CustomTabPanel>

            {/* 알림설정 */}
            <CustomTabPanel value={value} index={7}>
                알림설정
            </CustomTabPanel>
        </Box>
    </Container>
   )
 }


export default Mypage