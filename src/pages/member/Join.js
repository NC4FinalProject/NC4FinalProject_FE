import React, { useCallback, useState } from 'react';
import { Button, TextField, Link, Grid, Container, Typography, Checkbox } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { set } from 'immutable';

const Join = () => {
    const navi = useNavigate();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [nicknameError, setNicknameError] = useState(false);
    const [passwordCheckError, setPasswordCheckError] = useState(false);


    const [emailCheckVal, setEmailCheckVal] = useState(false);
    const [nicknameCheckVal, setNicknameCheckVal] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState("");
    const [password, setPassword] = useState("");
    let agreementCheckVal = false;

    const [emailVal, setEmailVal] = useState(false);

    const [showPw, setshowPw] = useState(false);

    const toggleShowPw = () => {
        setshowPw(!showPw);
      };

    const [showPwCheck, setshowPwCheck] = useState(false);

    const toggleShowPwCheck = () => {
        setshowPwCheck(!showPwCheck);
    };

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

    // const join = useCallback(
    //     async (username, password, userNickname) => {
    //         try {
    //             const response = await axios.post('http://${process.env.REACT_APP_BACK_URL}/member/join', {
    //                 username: username,
    //                 password: password,
    //                 userNickname: userNickname
    //             });
    //
    //             if (response.data.item && response.data.statusCode === 200) {
    //                 navi('/member/email-verification', {state: {
    //                     username: username,
    //                     password: password,
    //                     userNickname: userNickname
    //                 }});
    //             }
    //         } catch (e) {
    //             if (e.response.data.errorCode === 100) {
    //                 alert('입력 값을 모두 입력해주세요.');
    //             } else if (e.response.data.errorCode === 101) {
    //                 alert('이미 존재하는 아이디입니다.');
    //             } else if (e.response.data.errorCode === 102) {
    //                 alert('알 수 없는 에러 발생. 관리자에게 문의하세요.');
    //             }
    //         }
    //     },
    //     [navi]
    // );

    const emailVerification = useCallback(
        (username, password, userNickname) => {
            console.log("emailVerification start");
            navi('/member/email-verification', {state: {
                username: username,
                password: password,
                userNickname: userNickname
            }});
        }
    );

    const validatePassword = (password) => {
        if (password.length < 8) {
            return false;
        }

        // 대문자, 소문자, 숫자, 특수 문자 포함 검사
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
            return false;
        }

        return true;
    }

    // const handlePasswordChange = (event) => {
    //     setPasswordCheck(event.target.value);
    //
    //     if (password !== event.target.value) {
    //         setPasswordCheckError(true);
    //     } else {
    //         setPasswordCheckError(false);
    //     }
    // };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);

        if (passwordCheck !== event.target.value) {
            setPasswordCheckError(true);
        } else {
            setPasswordCheckError(false);
        }
    };

    const handlePasswordCheckChange = (event) => {
        setPasswordCheck(event.target.value);

        if (password !== event.target.value) {
            setPasswordCheckError(true);
        } else {
            setPasswordCheckError(false);
        }
    };

    const isPasswordMatch = () => {
        return password === passwordCheck;
    };

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!emailCheckVal) {
                alert('이메일 중복 체크를 해주세요.');
                return;
            } else if (!nicknameCheckVal) {
                alert('닉네임 중복 체크를 해주세요.');
                return;
            } else if (!validatePassword(passwordCheck)) {
                alert('비밀번호가 유효하지 않습니다. 비밀번호는 8자 이상, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.');
                return;
            } else if (!isPasswordMatch()) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            } else if (!agreementCheckVal) {
                alert('약관에 동의해주세요.');
                return;
            }
            const formData = new FormData(e.target);
            emailVerification(formData.get('username'), formData.get('password'), formData.get('userNickname'));
        },
        [emailVerification, emailCheckVal, nicknameCheckVal, passwordCheck, agreementCheckVal]
    );

    const emailCheck = useCallback(
        async (username) => {
            try {
                const response = await axios.post(`http://${process.env.REACT_APP_BACK_URL}/member/email-check`, {
                    username: username
                });

                if (response.data.item && response.data.statusCode === 200) {
                    alert('사용 가능한 이메일입니다.');
                    setEmailCheckVal(true);
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
            // const formData = document.getElementById('username').value;
            // emailCheck(formData);

            // emailCheck(email);

            if (!validateEmail(email)) {
                alert("이메일 형식이 올바르지 않습니다.");
                setEmailError(true);
            } else {
                setEmailError(false);
                emailCheck(email);
            }
        },
        [emailCheck, email]
    );

    const nicknameCheck = useCallback(
        async (userNickname) => {
            try {
                const response = await axios.post(`http://${process.env.REACT_APP_BACK_URL}/member/nickname-check`, {
                    userNickname: userNickname
                });

                if (response.data.item && response.data.statusCode === 200) {
                    alert('사용 가능한 닉네임입니다.');
                    setNicknameCheckVal(true);
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

    //////////

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        //////////
        setEmailCheckVal(false);
        //////////

        if (!validateEmail(event.target.value)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }

    const handleBlur = () => {
        if (!validateEmail(email)) {
            setEmailError(true);
        }
    }
    //////////


    // const handleNicknameCheck = useCallback(
    //     (e) => {
    //         e.preventDefault();
    //         const formData = document.getElementById('userNickname').value;
    //         nicknameCheck(formData);
    //     },
    //     [nicknameCheck]
    // );

    const handleNicknameCheck = useCallback(
        (e) => {
            e.preventDefault();
            const formData = document.getElementById('userNickname').value;
            if (!formData) {
                setNicknameError(true);
            } else {
                setNicknameError(false);
                nicknameCheck(formData);
            }
        },
        [nicknameCheck]
    );

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: '6%', marginBottom:'10%' }}>
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
                            error={emailError}
                            helperText={emailError ? "이메일 형식이 올바르지 않습니다." : ""}
                            value={email}
                            // onChange={(e) => {emailCheckVal = false}}
                            onChange={handleEmailChange}
                            onBlur={handleBlur}
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
                            // onChange={(e) => {nicknameCheckVal = false}}
                            error={nicknameError}
                            helperText={nicknameError ? "닉네임을 입력해주세요." : ""}
                            // onChange={(e) => {nicknameCheckVal = false; setNicknameError(false);}}
                            onChange={(e) => {setNicknameCheckVal(false); setNicknameError(false);}}
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
                            // onChange={(e) => {document.getElementById('password').value === document.getElementById('password-check').value ? passwordCheckVal = true : passwordCheckVal = false}}
                            onChange={handlePasswordChange}
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
                            // onChange={(e) => {document.getElementById('password').value === document.getElementById('password-check').value ? passwordCheckVal = true : passwordCheckVal = false}}
                            onChange={handlePasswordCheckChange}
                            error={passwordCheckError}
                            helperText={passwordCheckError ? "비밀번호가 일치하지 않습니다." : ""}
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
                            가입하고 이메일로 인증번호 받기
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
