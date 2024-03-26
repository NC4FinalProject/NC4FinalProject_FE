import { Box, Button, Divider, Grid, Rating, Typography } from '@mui/material'
import React from 'react'

const ContentsPrice = () => {

  const value = 4.5;
  return (
    // <Box display="flex" alignItems="center">
    //   <Divider orientation="vertical" flexItem />
    //   <div>FREE</div>
    //   <div>수 강 신 청</div>
    //   <div>장바구니|찜하기|</div>
    //   {/* 여기에 추가 내용 */}
    // </Box>
        <Grid container direction="column">
          
          <Grid container paddingX={2}>

            <Grid item xs={6} sx={{ textAlign: 'left' }}>
              <Typography variant='h5'>FREE</Typography>
            </Grid>

            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Box>
                <Rating
                  value={value}
                  size="small"
                  name="read-only"
                  precision={0.5}
                  readOnly 
                />
              </Box>
              <Box sx={{ textAlign: 'right', marginTop: '-7%'}}>
                <Typography variant='caption' >315</Typography>
              </Box>
            </Grid>

          </Grid>
          
          {/* 두 번째 그리드 - 중앙 정렬 */}
          <Grid padding={2} item xs={12} sx={{ textAlign: 'center' }}>
            <Button fullWidth variant="outlined">수강신청</Button>
          </Grid>
          
          {/* 세 번째 그리드 - 좌측 정렬 */}
          <Grid paddingX={2} item xs={12} sx={{ textAlign: 'left' }}>
            <Typography>· 단일 강의</Typography>
            <Typography>· 챕터 1개 · 59:13</Typography>
            <Typography>· 난이도 : 입문</Typography>
          </Grid>
        </Grid>
  )
}

export default ContentsPrice