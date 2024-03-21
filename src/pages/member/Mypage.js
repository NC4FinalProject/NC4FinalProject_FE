import React, { useState, useRef, useEffect } from 'react'
import { Grid, Container, Typography, TextField, Button, Box, Avatar } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


const Mypage = () => {

    const [value, setValue] = useState(0);
    const [profileImage, setImage] = useState(null);
    const [userNickname, setUserNickname] = useState(null);
    const [isTeacher, setIsTeacher] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [showPw, setshowPw] = useState(false);

    const toggleShowPw = () => {
        setshowPw(!showPw);
      };

    const [showPwCheck, setshowPwCheck] = useState(false);

    const toggleShowPwCheck = () => {
        setshowPwCheck(!showPwCheck);
    };

    const handleClick = () => {
        thumbnailInput.current.click();
      };
    

    const thumbnailInput = useRef();

    useEffect(async e => {
        try { 
            const response = await axios.get(`http://localhost:9090/mypage`, 
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                        }
                    });
            
                setImage(response.data.item.profileFile);
                setUserNickname(response.data.item.userNickname);
                setIsTeacher(response.data.item.isTeacher);
                setLoading(false);
        } catch (error) {
            console.warn("이미지 불러오기 실패", error);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>; // 데이터를 가져오는 동안 로딩 메시지 표시
    }

    const saveFileImage = async e => {
        try {
            const formData = new FormData();
            formData.append('profile_image', e.target.files[0]);
            
            const config = {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
                    'Content-Type': 'multipart/form-data'
                },
            };
            try {
            const response = await axios.post(
            `http://localhost:9090/mypage/profile-file`, 
            formData, 
            config
            ); 
        } catch (error) {
                console.warn(error);
            }
        window.location.reload();
        } catch (error) {
            console.warn("이미지 업로드 실패");
        }
      };

      const handleOnChange = (e) => {
        setUserNickname(e.target.value);
      }

    
    const updateUserNickname = async e => {
        try {
            const formData = new FormData();
            formData.append('user_nickname', userNickname);

            const config = {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
                    'Content-Type': 'multipart/form-data'
                }
            };

            try {
                const response = await axios.post(
                    `http://localhost:9090/mypage/user-nickname`, 
                    formData, 
                    config
                ); 
            } catch (error) {
                console.warn(error);
                if (error.response.data.errorCode === 202) {
                    alert("이미 존재하는 닉네임 입니다.");
                    }
            }
            } catch (error) {
                console.warn("닉네임 변경 실패");
                }   
      };

      const wannabeTeacher = async e => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                }
            };

            try {
                const response = await axios.get(
                    `http://localhost:9090/mypage/wannabe-teacher`, 
                    config
                ); 
                alert("강사 신청 완료");
            } catch (error) {
                console.warn(error);
                if (error.response.data.errorCode === 202) {
                    alert("이미 강사 입니다.");
                    }
            }
            } catch (error) {
                console.warn("강사 신청 실패");
                }   
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
    </Box>

        <form>
            <Grid container spacing={2} sx={{width: '40%', marginLeft: '30%'}}>
                <Grid item xs={12}>
                    <Typography component="h1" style={{textAlign: 'center', marginTop: '5%', fontSize:'3rem'}}>
                        계정 정보
                    </Typography>
                </Grid>
                <Grid container xs={12} style={{justifyContent: 'center', textAlign: 'center'}}>
                    <Grid item xs={6}>
                        <Box item xs={10}>
                        {profileImage === null ? (
                            <Avatar src="/broken-mage.jpg" style={{width: '200px', height: '200px', borderRadius: '70%', marginLeft: '15%'}}/> 
                            ) : (
                            <img src={`https://kr.object.ncloudstorage.com/envdev/`+profileImage} alt='thumbnail' style={{width: '200px', height: '200px', borderRadius: '70%'}}/> 
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography component="h1" variant="h5" style={{textAlign: 'center', marginTop: '15%'}}>
                            프로필
                        </Typography>
                        <Button onClick={handleClick} variant="contained" color="primary" style={{height:'55px', width: '10rem', fontSize:'18px', marginTop: '15%'}}>
                            사진 변경
                            <input type='file' accept='image/jpg, image/jpeg, image/png' multiple ref={thumbnailInput} onChange={saveFileImage} style={{ display: 'none' }} />
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                        <TextField
                            name="userNickname"
                            variant="outlined"
                            fullWidth
                            id="userNickname"
                            label="닉네임"
                            defaultValue={ userNickname === null ? ("닉네임을 입력해주세요.") : (userNickname)}
                            onChange={handleOnChange}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="button" onClick={updateUserNickname} fullWidth variant="contained" color="primary" style={{height:'55px', fontSize:'18px', marginBottom: '5%'}}>
                            닉네임 변경하기
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h2" variant='string' style={{textAlign: 'left'}}>
                            {isTeacher === null ? ("아직 강사가 아닙니다."
                                ) : ( 
                                "이미 강사입니다.") }
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" onClick={wannabeTeacher} fullWidth variant="contained" color="primary" style={{height:'55px', fontSize:'18px', marginBottom: '15%'}}>
                            강사 계정으로 전환 신청하기
                        </Button>
                    </Grid>
            </Grid>
        </form>
    </Container>
  )
}

export default Mypage