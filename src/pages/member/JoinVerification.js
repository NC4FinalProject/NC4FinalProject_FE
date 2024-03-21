import React from 'react'
import { Grid, Container, Typography, TextField, Button, Link } from '@mui/material';

const JoinVerification = () => {
  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '5%', marginBottom: '10%' }}>
        <form>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5" style={{textAlign: 'center'}}>
                        이메일 인증
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="span" variant='string'>
                        user@mail.com 로 인증번호를 보내드렸습니다. 인증번호를 입력해주세요.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="verification"
                        variant="outlined"
                        required
                        fullWidth
                        id="verification"
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
                <Grid item>
                    <Link href="/login" variant="body2">
                        다시 보내기
                    </Link>
                </Grid>
            </Grid>
        </form>
    </Container>
  )
}

export default JoinVerification