import React, { useCallback, useState } from 'react';
import { Button, TextField, Link, Grid, Container, Typography, Checkbox } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { set } from 'immutable';

const Join = () => {
    const navi = useNavigate();

    let emailCheckVal = false;
    let nicknameCheckVal = false;
    let passwordCheckVal = false;
    let agreementCheckVal = false;

    const [showPw, setshowPw] = useState(false);

    const toggleShowPw = () => {
        setshowPw(!showPw);
      };

    const [showPwCheck, setshowPwCheck] = useState(false);

    const toggleShowPwCheck = () => {
        setshowPwCheck(!showPwCheck);
    };

    const Kakao_Rest_api_key = process.env.REACT_APP_KAKAO_REST_API; //REST API KEY
    const kakao_redirect_url = 'http://localhost:3000/kakao-login' //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Kakao_Rest_api_key}&redirect_uri=${kakao_redirect_url}&response_type=code`
    
    const handleKakaoLogin = () => {
            window.location.href = kakaoURL
        };

    const Google_Rest_api_key = process.env.REACT_APP_GOOGLE_REST_API; //REST API KEY
    const google_redirect_url = 'http://localhost:3000/google-login' //Redirect URI
    // oauth 요청 URL
    const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${Google_Rest_api_key}&redirect_uri=${google_redirect_url}&response_type=code&scope=email profile`
    
    const handleGoogleLogin = () => {
            window.location.href = googleURL
        };

    const join = useCallback(
        async (username, password, userNickname) => {
            try {
                const response = await axios.post('http://localhost:9090/member/join', {
                    username: username,
                    password: password,
                    userNickname: userNickname
                });

                if (response.data.item && response.data.statusCode === 200) {
                    navi('/login');
                }
            } catch (e) {
                if (e.response.data.errorCode === 100) {
                    alert('입력 값을 모두 입력해주세요.');
                } else if (e.response.data.errorCode === 101) {
                    alert('이미 존재하는 아이디입니다.');
                } else if (e.response.data.errorCode === 102) {
                    alert('알 수 없는 에러 발생. 관리자에게 문의하세요.');
                }
            }
        },
        [navi]
    );

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!emailCheckVal) {
                alert('이메일 중복 체크를 해주세요.');
                return;
            } else if (!nicknameCheckVal) {
                alert('닉네임 중복 체크를 해주세요.');
                return;
            } else if (!passwordCheckVal) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            } else if (!agreementCheckVal) {
                alert('약관에 동의해주세요.');
                return;
            }
            const formData = new FormData(e.target);
            join(formData.get('username'), formData.get('password'), formData.get('userNickname'));
        },
        [join]
    );

    const emailCheck = useCallback(
        async (username) => {
            try {
                const response = await axios.post('http://localhost:9090/member/email-check', {
                    username: username
                });

                if (response.data.item && response.data.statusCode === 200) {
                    alert('사용 가능한 이메일입니다.');
                    emailCheckVal = true;
                }
            } catch (e) {
                if (e.response.data.errorCode === 200) {
                    alert('입력 값을 입력해주세요.');
                } else if (e.response.data.errorCode === 201) {
                    alert('이미 존재하는 아이디입니다.');
                } else if (e.response.data.errorCode === 202) {
                    alert('알 수 없는 에러 발생. 관리자에게 문의하세요.');
                }
            }
        },
        []
    );

    const handleEmailCheck = useCallback(
        (e) => {
            e.preventDefault();
            const formData = document.getElementById('username').value;
            emailCheck(formData);
        },
        [emailCheck]
    );

    const nicknameCheck = useCallback(
        async (userNickname) => {
            try {
                const response = await axios.post('http://localhost:9090/member/nickname-check', {
                    userNickname: userNickname
                });

                if (response.data.item && response.data.statusCode === 200) {
                    alert('사용 가능한 닉네임입니다.');
                    nicknameCheckVal = true
                }
            } catch (e) {
                if (e.response.data.errorCode === 200) {
                    alert('입력 값을 입력해주세요.');
                } else if (e.response.data.errorCode === 201) {
                    alert('이미 존재하는 닉네임입니다.');
                } else if (e.response.data.errorCode === 202) {
                    alert('알 수 없는 에러 발생. 관리자에게 문의하세요.');
                }
            }
        },
        []
    );

    const handleNicknameCheck = useCallback(
        (e) => {
            e.preventDefault();
            const formData = document.getElementById('userNickname').value;
            nicknameCheck(formData);
        },
        [nicknameCheck]
    );

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: '8%' }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <Typography component="h1" variant="h5">
                            회원가입
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <Typography component="h5" variant="h5" style={{fontSize:'14px'}}>
                            환영합니다!
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="username"
                            variant="outlined"
                            required
                            fullWidth
                            type='email'
                            id="username"
                            label="이메일"
                            autoFocus
                            onChange={(e) => {emailCheckVal = false}}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="button" onClick={handleEmailCheck} fullWidth variant="contained" color="primary" style={{height:'55px', fontSize:'18px'}}>
                            이메일 중복 체크
                        </Button>
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
                            onChange={(e) => {nicknameCheckVal = false}}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="button" onClick={handleNicknameCheck} fullWidth variant="contained" color="primary" style={{height:'55px', fontSize:'18px'}}>
                            닉네임 중복 체크
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
                            // required
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
                        <Typography component="p" variant='string'>
                        가입 시, 통합 계정으로 제공하는 서비스를 모두 이용하실 수 있습니다. 통합 계정 및 서비스 이용약관, 개인정보처리방침에 동의합니다.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Checkbox onChange={(e) => {agreementCheckVal = !agreementCheckVal}}/> 동의합니다.
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{height:'55px', fontSize:'18px'}}>
                            이메일로 인증번호 받기
                        </Button>
                    </Grid>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            로그인 페이지로 돌아가기
                        </Link>
                    </Grid>
                </Grid>
                    <Grid container justifyContent="center" display='flex' alignItems='center' >
                        <Grid item style={{marginTop:'8%', color:'#abb0b5', width: '100%', textAlign: 'center'}}>
                            <hr style={{position: 'relative', margin: 0, bottom: '-12px', width: '100%', border: 'none', height: '1px', backgroundColor: '#f1f3f5'}}></hr>
                            <Typography component="span" variant='string' alignItems='center' style={{color:'#abb0b5', zIndex: '1', position: 'relative', top: 0, backgroundColor: '#fff', padding:'0 8px' }}>
                                간편 로그인
                            </Typography>
                        </Grid> 
                    </Grid>
                </Grid>
                <Grid item display='flex' marginTop='15px'>
                    <Grid item xs={6}>
                    <img src='/images/kakao_login.png' alt='kakao_login' onClick={handleKakaoLogin} style={{width: '200px', height: '50px', cursor: 'pointer'}}></img>
                    </Grid>
                    <Grid item xs={6}>
                        <img src='/images/google_login.png' alt='google_login' onClick={handleGoogleLogin} style={{width: '200px', height: '50px', cursor: 'pointer'}}></img>
                    </Grid>    
                </Grid>
            </form>
        </Container>
    );
};

export default Join;
