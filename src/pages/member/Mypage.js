import React, { useState } from 'react'
import PropTypes from "prop-types";
import { Container, Box } from '@mui/material';
import Typography from "@mui/material/Typography";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MemberInfo from '../../components/organisms/mypage/MemberInfo';

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

            <Box sx={{ p: 3 }}>
                <Typography component={"div"}>
                    <div hidden={value !== 0} ><MemberInfo/></div>
                    <div hidden={value !== 1} ><>수강목록</></div>
                    <div hidden={value !== 2} ><>즐겨찾기</></div>
                    <div hidden={value !== 3} ><>구매목록</></div>
                    <div hidden={value !== 4} ><>포인트</></div>
                    <div hidden={value !== 5} ><>수료증</></div>
                    <div hidden={value !== 6} ><>장바구니</></div>
                    <div hidden={value !== 7} ><>알림설정</></div>
                </Typography>
            </Box>
        </Box>
    </Container>
   )
 }


export default Mypage