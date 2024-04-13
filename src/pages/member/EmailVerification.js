import React, { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { Grid, Container, Typography, TextField, Button, Link } from '@mui/material';
import axios from 'axios';

const EmailVerification = () => {

    const navi = useNavigate();

    const initialize = async e => {
        try { 
            const response = await axios.get(`http://${process.env.REACT_APP_BACK_URL}/member/email-verification`,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                        }
                    });
                    
                } catch (e) {
                    if (e.response.data.errorCode === 201) {
                        alert('이미 인증된 이메일입니다.');
                        navi('/');
                    } else if (e.response.data.errorCode === 200) {
                        alert('알 수 없는 에러발생. 관리자에게 문의하세요.');
                        navi('/');
                    }
                }
    }

    useEffect( () => {
        initialize();
    }, []);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            sendCode(formData.get('code'));
        },
        []
    );
    

    const sendCode = useCallback(
        async (code) => {
            try {
                const response = await axios.post('http://${process.env.REACT_APP_BACK_URL}/member/code-check', {
                    code: code
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                    }
                }
            );

                if (response.data.item && response.data.statusCode === 200) {
                    alert('인증되었습니다. 환영합니다!');
                    navi('/');
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
                    <Link disabled href="/login" variant="body2">
                        다시 보내기
                    </Link>
                </Grid>
            </Grid>
        </form>
    </Container>
  )
}

export default EmailVerification