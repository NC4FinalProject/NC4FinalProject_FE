import { Box, Button, Divider, Grid, Rating, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {contentsListApi} from '../../../../api/contentsListApi'
import { FaCartPlus } from "react-icons/fa";
import ContentsPriceCal from '../../../../atoms/common/ContentsPriceCal';


// 컨텐츠 데이터 인포 관련
// export const contentsPriceApi = [
//   {
//     price: '59000',
//     edLevel: '1',
//   }
// ]


const ContentsPrice = () => {


  /////////////////컨텐츠 번호 가져와서 플라이스 컴포넌트에 전달/////////////////
  const [priceState, setPriceState] = useState(null);

  const [contentsIndexNumber, setContentsNumber] = useState('4');

  // 무료일 경우 0 을 받고 FREE 라는 텍스트를 반환 -> 결국 값이 0일 경우에만 FREE 아닐 경우 가격 표시 0
  // 실시간 일 경우 음수를 받아와 국비지원 인 것을 알아야 할듯? -1 
  // 유료일 경우 컨텐츠로 부터 가격 데이터를 받아옴 가격 > 0
  
  useEffect(() => {
    setContentsNumber(contentsIndexNumber);
    
    if (contentsListApi[contentsIndexNumber].price === 0) {
      setPriceState('FREE')
    } else if (contentsListApi[contentsIndexNumber].price > 0) {
      setPriceState(contentsListApi[contentsIndexNumber].price)
    } else {
      setPriceState('국비지원')
    }
  }, [])
  /////////////////컨텐츠 번호 가져와서 플라이스 컴포넌트에 전달/////////////////


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
          
          <Grid container paddingX={'1rem'}>

            <Grid item xs={6} sx={{ textAlign: 'left' }}>
             <Typography variant='h5' sx={{ color:'#1C1C1C'}}>
                <ContentsPriceCal price={priceState}/>
              </Typography>
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
          <Grid item xs={12} sx={{ padding: '1rem'   }}>
            <Button fullWidth variant="outlined">수강신청</Button>
          </Grid>

          {/* 세 번째 그리드 - 좌측 정렬 */}
          <Grid container item xs={12} sx={{ color: "#6E6E6E", paddingX: '1rem' }}>
  
            <Grid container item xs={8} direction="column">
             <Typography>· 단일 강의</Typography>
             <Typography>· 챕터 1개 · 59:13</Typography>
             <Typography>· 난이도 : 입문</Typography>
            </Grid>
            
            <Grid container item xs={4} justifyContent={'flex-end'}>
              <FaCartPlus style={{ marginRight: '0.3em', color: '#6E6E6E', cursor: 'pointer', fontSize: '20px' }}/>
            </Grid>

          </Grid>

        </Grid>
  )
}

export default ContentsPrice