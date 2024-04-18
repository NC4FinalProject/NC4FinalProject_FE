import React, {useCallback, useState} from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {Button, Container, Grid, Link, TextField, Typography} from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import MemberStore from '../../stores/MemberStore';

const Login = () => {
    const navi = useNavigate();
    const [showPw, setshowPw] = useState(false);
    const {setMemberInfo} = MemberStore((state) => state);
    const toggleShowPw = () => {
        setshowPw(!showPw);
    };

    const login = useCallback(
        async (username, password) => {
            try {
                const response = await axios.post(`http://${process.env.REACT_APP_BACK_URL}/member/login`, {
                    username: username,
                    password: password
                });

                if (response.data.item && response.data.statusCode === 200) {
                    const info = {
                        role: response.data.item.role,
                        memberId: response.data.item.memberId,
                        userNickname: response.data.item.userNickname,
                        username: response.data.item.username,
                        profileFile: response.data.item.profileFile
                    };
                    setMemberInfo(info);
                    sessionStorage.setItem('ACCESS_TOKEN', response.data.item.token);
                    sessionStorage.getItem('ACCESS_TOKEN');
                    console.log(response.data.item.role);
                    if (response.data.item.role === 'ADMIN') {
                        navi('/admin/main');
                    } else {
                        navi('/');
                    }
                }
            } catch (e) {
                if (e.response.data.errorCode === 200) {
                    alert('존재하지 않는 아이디입니다.');
                } else if (e.response.data.errorCode === 201) {
                    alert('잘못된 비밀번호입니다.');
                } else if (e.response.data.errorCode === 202) {
                    alert('탈퇴한 계정입니다.');
                } else if (e.response.data.errorCode === 203) {
                    alert('알 수 없는 에러발생. 관리자에게 문의하세요.');
                }
            }
        },
        [navi]
    );

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);

            login(formData.get('username'), formData.get('password'));
        },
        [login]
    );

    const Kakao_Rest_api_key = process.env.REACT_APP_KAKAO_REST_API; //REST API KEY
    const kakao_redirect_url = `http://${process.env.REACT_APP_FRONT_URL}/kakao-login` //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Kakao_Rest_api_key}&redirect_uri=${kakao_redirect_url}&response_type=code`

    const handleKakaoLogin = () => {
        window.location.href = kakaoURL
    };

    const Google_Rest_api_key = process.env.REACT_APP_GOOGLE_REST_API; //REST API KEY
    const google_redirect_url = `http://${process.env.REACT_APP_FRONT_URL}/google-login` //Redirect URI
    // oauth 요청 URL
    const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${Google_Rest_api_key}&redirect_uri=${google_redirect_url}&response_type=code&scope=email profile`

    const handleGoogleLogin = () => {
        window.location.href = googleURL
    };


    return (
        <Container component="main" maxWidth="xs" style={{marginTop: '6%', marginBottom: '10%'}}>
            <form onSubmit={handleSubmit}>
                <Grid container style={{justifyContent: 'center', marginBottom: '3%'}}>
                    <Grid item>
                        <img src='/images/team_logo.png' alt='team_logo'
                             style={{width: '250px', height: '50px', justifyContent: 'center', display: 'flex'}}></img>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container xs={12}>
                            <TextField style={{border: 'none', height: '100%', width: '100%'}}
                                       name="username"
                                       fullWidth
                                       required
                                       id="username"
                                       variant='outlined'
                                       label="아이디"
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <TextField style={{border: 'none', height: '100%', width: '100%'}}
                                       name="password"
                                       fullWidth
                                       required
                                       type={showPw ? 'text' : 'password'}
                                       id="password"
                                       variant='outlined'
                                       label="비밀번호"
                                       InputProps={{
                                           endAdornment: <RemoveRedEyeIcon onClick={toggleShowPw}
                                                                           sx={{cursor: 'pointer'}}/>,
                                           disableUnderline: true
                                       }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary"
                                style={{height: '55px', fontSize: '18px'}}>
                            로그인
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justifyContent="space-around" style={{marginTop: '3%'}}>
                    <Grid item>
                        <Link href="/find-password" variant="body2" style={{color: '#616568', fontSize: '17px'}}>
                            비밀번호 찾기
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/Join" variant="body2" style={{color: '#616568', fontSize: '17px'}}>
                            회원가입
                        </Link>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" display='flex' alignItems='center'>
                    <Grid item style={{marginTop: '8%', color: '#abb0b5', width: '100%', textAlign: 'center'}}>
                        <hr style={{
                            position: 'relative',
                            margin: 0,
                            bottom: '-12px',
                            width: '100%',
                            border: 'none',
                            height: '1px',
                            backgroundColor: '#f1f3f5'
                        }}></hr>
                        <Typography component="span" variant='string' style={{
                            color: '#abb0b5',
                            zIndex: '1',
                            position: 'relative',
                            top: 0,
                            backgroundColor: '#fff',
                            padding: '0 8px'
                        }}>
                            간편 로그인
                        </Typography>
                    </Grid>
                    <Grid item display='flex' marginTop='15px'>
                        <Grid item xs={6}>
                            <img src='/images/kakao_login.png' alt='kakao_login' onClick={handleKakaoLogin}
                                 style={{width: '200px', height: '50px', cursor: 'pointer'}}></img>
                        </Grid>
                        <Grid item xs={6}>
                            <img src='/images/google_login.png' alt='google_login' onClick={handleGoogleLogin}
                                 style={{width: '200px', height: '50px', cursor: 'pointer'}}></img>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Login;