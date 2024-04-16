import React, { useState, useEffect } from 'react'
import { Container, Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MemberInfo from '../../components/organisms/mypage/MemberInfo';
import MyLecture from '../../components/organisms/mypage/MyLecture';
import Bookmark from '../../components/organisms/mypage/Bookmark';
import Certificate from '../../components/organisms/mypage/Certificate';
import PurchaseHistory from '../../components/organisms/mypage/PurchaseHistory';
import Point from '../../components/organisms/mypage/Point';
import Cart from '../../components/organisms/cart/Cart';
import MyContents from '../../components/organisms/mypage/MyContents';
import axios from 'axios';
import {useLocation} from 'react-router-dom';

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

const Mypage = () => {

    const [value, setValue] = useState(0);
    const [role, setRole] = useState(null);
    const location = useLocation();

    useEffect(() => {
      if(location.state && location.state.tab) {
        handleChange(null, location.state.tab);
      }
    }, [location]);

    const initialize = async e => {
      try { 
          const response = await axios.get(`http://localhost:9090/mypage`, 
                  {
                      headers: {
                          Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                      }
                  });
              setRole(response.data.item.role);
              console.log("response.data.item");
              console.log(response.data.item);
        
      } catch (error) {
      }
  }

  useEffect( () => {
      initialize();
  }, []);

    

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

                { role === 'TEACHER' ? ( 
                  <Tab label="내 강의" {...a11yProps(8)} />
                ) : ( <></>
                )}
                </Tabs>
            </Box>

            <Box>
                <div hidden={value !== 0} ><MemberInfo></MemberInfo></div>
                <div hidden={value !== 1} ><MyLecture></MyLecture></div>
                <div hidden={value !== 2} ><Bookmark></Bookmark></div>
                <div hidden={value !== 3} ><PurchaseHistory></PurchaseHistory></div>
                <div hidden={value !== 4} ><Point></Point></div>
                <div hidden={value !== 5} ><Certificate></Certificate></div>
                <div hidden={value !== 6} ><Cart></Cart></div>
                <div hidden={value !== 7} ><>알림설정</></div>
                { role === 'TEACHER' ? ( 
                  <div hidden={value !== 8} ><MyContents></MyContents></div>
                ) : ( <></>
                )}


            </Box>
        </Box>
    </Container>
   )
 }


export default Mypage