import { Box, Button, Divider, Grid, Rating, Typography } from '@mui/material'
import React, { useState } from 'react'


// 무료일 경우 0 을 받고 FREE 라는 텍스트를 반환 -> 결국 값이 0일 경우에만 FREE 아닐 경우 가격 표시 0
// 실시간 일 경우 음수를 받아와 국비지원 인 것을 알아야 할듯? -1 
// 유료일 경우 컨텐츠로 부터 가격 데이터를 받아옴 가격 > 0


// 컨텐츠 데이터 인포 관련
export const contentsPriceApi = [
  {
    price: '59000',
    edLevel: '1',
  }
]


const ContentsPrice = () => {

  const [priceState, setPriceState] = useState(0);

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
              <Typography variant='h5'>59,000</Typography>
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
              <Box sx={{ textAlign: 'right', marginTop: '-7%', color: '#6E6E6E'}}>
                <Typography variant='caption' >315</Typography>
              </Box>
            </Grid>

          </Grid>
          
          {/* 두 번째 그리드 - 중앙 정렬 */}
          <Grid padding={2} item xs={12} sx={{ textAlign: 'center' }}>
            <Button fullWidth variant="outlined">수강신청</Button>
          </Grid>
          
          {/* 세 번째 그리드 - 좌측 정렬 */}
          <Grid paddingX={2} item xs={12} sx={{ textAlign: 'left', color: "#6E6E6E"}}>
            <Typography>· 단일 강의</Typography>
            <Typography>· 챕터 1개 · 59:13</Typography>
            <Typography>· 난이도 : 입문</Typography>
          </Grid>
        </Grid>
  )
}

export default ContentsPrice