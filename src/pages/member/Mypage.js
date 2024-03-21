import React, { useState, useRef, useEffect } from 'react'
import { Grid, Container, Typography, TextField, Button, Box, Avatar } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
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
    
    let agreementCheckVal = false;
    let passwordCheckVal = false;

    const [value, setValue] = React.useState(0);
    const [profileImage, setImage] = useState(null);
    const [userNickname, setUserNickname] = useState(null);

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

    const handleProfileImage = useEffect(async e => {
        try { await axios.get(`http://localhost:9090/mypage`, 
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                        }
                    })
            .then((response) => {
                setImage(response.data.item.profileFile);
                setUserNickname(response.data.item.userNickname);
            })
            .catch((error) => {
                console.error('Error fetching image', error);
            });
        } catch (error) {
            console.warn("이미지 불러오기 실패", error);
        }
    }, []);

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
                            <Avatar src="/broken-mage.jpg" style={{width: '200px', height: '200px', borderRadius: '70%'}}/> 
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
                            autoFocus
                            // onChange={(e) => {nicknameCheckVal = false}}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        {/* <Button type="button" onClick={handleNicknameCheck} fullWidth variant="contained" color="primary" style={{height:'55px', fontSize:'18px'}}> */}
                        <Button type="button"  fullWidth variant="contained" color="primary" style={{height:'55px', fontSize:'18px', marginBottom: '5%'}}>
                            닉네임 변경하기
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="password"
                            variant="outlined"
                            type={showPw ? 'text' : 'password'}
                            fullWidth
                            id="password"
                            label="비밀번호"
                            onChange={(e) => {document.getElementById('password').value === document.getElementById('password-check').value ? passwordCheckVal = true : passwordCheckVal = false}}
                            InputProps={{
                                endAdornment: <RemoveRedEyeIcon onClick={toggleShowPw} sx={{cursor: 'pointer'}}/>,
                                disableUnderline: true
                                }}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="password-check"
                            variant="outlined"
                            type={showPwCheck ? 'text' : 'password'}
                            fullWidth
                            id="password-check"
                            label="비밀번호 확인"
                            onChange={(e) => {document.getElementById('password').value === document.getElementById('password-check').value ? passwordCheckVal = true : passwordCheckVal = false}}
                            InputProps={{
                                endAdornment: <RemoveRedEyeIcon onClick={toggleShowPwCheck} sx={{cursor: 'pointer'}}/>,
                                disableUnderline: true
                                }}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{height:'55px', fontSize:'18px', marginBottom: '5%'}}>
                            비밀번호 변경하기
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h2" variant='string' style={{textAlign: 'left'}}>
                        '강사 계정으로 전환하기' 신청을 합니다.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{height:'55px', fontSize:'18px', marginBottom: '15%'}}>
                            신청하기
                        </Button>
                    </Grid>
            </Grid>
        </form>
    </Container>
  )
}

export default Mypage