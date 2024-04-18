import React, { useEffect, useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Container, Typography, TextField, Button, Link } from '@mui/material';
import axios from 'axios';

const EmailVerification = () => {
    const location = useLocation();

    // const [form, setForm] = useState({});

    // useEffect(() => {
    //     if(location.state) {
    //         setForm({
    //             username: location.state.username,
    //             password: location.state.password,
    //             userNickname: location.state.userNickname
    //         });
    //     }
    //     console.log("==========form값", form);
    // }, [location]);

    const navi = useNavigate();

    const join = useCallback(
async (username, password, userNickname) => {
        try {
            const response = await axios.post(`http://${process.env.REACT_APP_BACK_URL}/member/join`, {
                username: username,
                password: password,
                userNickname: userNickname
            });

            if (response.data.statusCode === 200) {
                alert('회원가입이 완료되었습니다.');
                navi('/login');
            }
        } catch (e) {
            // if (e.response.data.errorCode === 100) {
            //     alert('입력 값을 모두 입력해주세요.');
            // } else if (e.response.data.errorCode === 101) {
            //     alert('이미 존재하는 아이디입니다.');
            // } else if (e.response.data.errorCode === 102) {
            //     alert('알 수 없는 에러 발생. 관리자에게 문의하세요.');
            // }
            console.log(e);
            alert('알 수 없는 에러 발생. 관리자에게 문의하세요.');
        }
    },[navi]);

    const initialize = async e => {
        try {
            const response = await axios.post(`http://${process.env.REACT_APP_BACK_URL}/member/email-verification`,
            {
              username: location.state.username,
              password: location.state.password,
              userNickname: location.state.userNickname
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                }
            });

            alert("인증번호가 발송되었습니다.");
        } catch (e) {
            if (e.response.data.errorCode === 201) {
                alert('이미 인증된 이메일입니다.');
                navi('/');
            } else if (e.response.data.errorCode === 200) {
                alert('알 수 없는 에러발생. 관리자에게 문의하세요.');
                navi('/');
            }
        }
    };

    useEffect( () => {
        initialize();
    }, []);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            sendCode(formData.get('code'));
        },[]);

    const sendCode = useCallback(
        async (code) => {
            try {
                const response = await axios.post(`http://${process.env.REACT_APP_BACK_URL}/member/code-check`, {
                    code: code
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                    }
                }
            );

                if (response.data.statusCode === 200) {
                    alert('인증되었습니다. 환영합니다!');
                    join(location.state.username, location.state.password, location.state.userNickname);
                }
            } catch (e) {
                if (e.response.data.errorCode === 200) {
                    alert('잘못된 코드입니다.');
                } else if (e.response.data.errorCode === 201) {
                    alert('알 수 없는 에러발생. 관리자에게 문의하세요.');
                }
            }
        },
        []
    );

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '5%', marginBottom: '10%' }}>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5" style={{textAlign: 'center'}}>
                        이메일 인증
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="span" variant='string'>
                        이메일로 인증번호를 보내드렸습니다. 인증번호를 입력해주세요.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="code"
                        variant="outlined"
                        required
                        fullWidth
                        id="code"
                        label="인증번호"
                        autoFocus
                    ></TextField>
                </Grid>
                
                <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="contained" color="primary" style={{height:'55px', fontSize:'18px'}}>
                        확인
                    </Button>
                </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
                <Grid item onClick={initialize}>
                    {/*<Link disabled href="/login" variant="body2">*/}
                    <Link variant="body2">
                        다시 보내기
                    </Link>
                </Grid>
            </Grid>
        </form>
    </Container>
  )
}

export default EmailVerification