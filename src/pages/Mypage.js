import React, { useState } from 'react'
import { Grid, Container, Typography, TextField, Button, Link, Box, Checkbox } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
          <Tab label="멤버십" {...a11yProps(5)} />
          <Tab label="장바구니" {...a11yProps(6)} />
          <Tab label="알림설정" {...a11yProps(7)} />
        </Tabs>
      </Box>
    </Box>

        <form>
            <Grid container spacing={2} sx={{width: '40%', marginLeft: '30%'}}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5" style={{textAlign: 'center', marginTop: '5%'}}>
                        계정 정보
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                        <TextField
                            name="userNickname"
                            variant="outlined"
                            required
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
                            required
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
                            required
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
                        <Typography component="p" variant='string' style={{textAlign: 'left'}}>
                        '강사 계정으로 전환하기' 신청을 합니다.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Checkbox onChange={(e) => {agreementCheckVal = !agreementCheckVal}}/> 동의합니다.
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