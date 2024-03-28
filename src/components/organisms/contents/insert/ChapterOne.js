import { Button, Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UploadImage from './UploadImage'
import UploadVideo from './UploadVideo'
import CoTypography from '../../../atoms/common/CoTypography'
import styled from 'styled-components'
import {categoryItems} from '../../../api/categoryItemsApi'
import { ContentsPriceItem } from '../../../api/ContentsPriceItem'

const UnderlinedButton = styled(Button)`

border-bottom: 1px solid rgba(0, 0, 0, 0.42);
border-radius: 0;

&:hover {
  border-bottom: 2px solid rgba(0, 0, 0, 0.87);
}

&.Mui-focused {
  border-bottom: 2px solid #3f51b5;
}

&.Mui-disabled {
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
}
`;

const CustomTextField = styled(TextField)({
  '& .MuiInput-input::placeholder': {
    fontSize: '0.9rem', // 원하는 글자 크기로 조정
  },
  '& .MuiInput-input': {
    textAlign: 'center', // 입력 필드 텍스트를 수평 중앙 정렬
    // 필요하다면 lineHeight도 조정할 수 있음
  },
});

const ChapterOne = () => {

  const [categoryType, setCategoryType] = useState("");

  const [priceType, setPriceType] = useState("");
  const handleCategoryFilterTypeChange = (e) => setCategoryType(e.target.value);
  const handlePriceFilterTypeChange = (e) => {
    setPriceType(e.target.value);
    // selectPriceType();
  }


  const [payType, setPayType] = useState("") // input 

useEffect(() => {
    if (priceType === '무료 강의') {
      setPriceType("0")
    } else if (priceType === '유료 강의'){
      setPriceType("pay")
      console.log("넌 유료 강의를 선택했고 이는 가격타입 변수에 넣어질거여~")
      
    } else if (priceType === '국비 지원') {
      // 국비지원
      setPriceType("-1")
    }  
    console.log("넌 가격 유형을 " + priceType + "으로 체크 했네 ㅋㅋㅋㅋ")
  },[handlePriceFilterTypeChange]);

  // const selectPriceType = () => {
  //   if (priceType === '무료 강의') {
  //     setPriceType("0")
  //   } else if (priceType === '유료 강의'){
  //     setPriceType("pay")
  //     console.log("넌 유료 강의를 선택했고 이는 가격타입 변수에 넣어질거여~")
  //   } else if (priceType === '국비 지원') {
  //     // 국비지원
  //     setPriceType("-1")
  //   }  
  //   // console.log("넌 가격 유형을 " + e.target.value + "으로 체크 했네 ㅋㅋㅋㅋ")
  // }


  return (
  <>
    <Grid container justifyContent="center"  sx={{ marginTop: '2rem', }}>
      <Grid item xs={2} />

      <Grid item xs={1} style={{ display: 'flex', alignItems: 'end', justifyContent:'center', paddingBottom: '0.1rem' }}>
          <CoTypography size="Title">분야</CoTypography>
      </Grid>
      <Grid item xs={6}>

        <CustomTextField 
          select
          variant="standard" 
          onChange={handleCategoryFilterTypeChange}
          fullWidth
          defaultValue=""
          
          label="분야 유형을 선택하세요."
          InputLabelProps={{
            style: { textAlign: 'center', width: '100%' },
            
          }}
        >

          {/* <MenuItem disabled value="">
            카테고리 유형을 선택하세요.
          </MenuItem> */}
          {categoryItems.map((el) => (
            <MenuItem key={el.id} value={el.type} >
              {el.type}
            </MenuItem>
          ))}
          
        </CustomTextField>

      </Grid>
      <Grid item xs={3} />
    </Grid>

    <Grid container justifyContent="center" sx={{ marginTop: '0.35rem', }} >
      <Grid item xs={2} />

      <Grid item xs={1} style={{ display: 'flex', alignItems: 'end', justifyContent:'center', paddingBottom: '0.1rem'}}>
          <CoTypography size="Title">가격</CoTypography>
      </Grid>
      <Grid item xs={6}>

        <CustomTextField 
          select
          variant="standard" 
          onChange={handlePriceFilterTypeChange}
          fullWidth
          defaultValue=""
          
          label="가격 유형을 선택하세요."
          InputLabelProps={{
            style: { textAlign: 'center', width: '100%' },
            
          }}
        >
          
          {ContentsPriceItem.map((el) => (
            <MenuItem key={el.id} value={el.type} >
              {el.type}
            </MenuItem>
          ))}

        </CustomTextField>
        {priceType === 'pay' && (
          <Grid>
            넌 유료 강의를 선택했지!
          </Grid>
        )}
        {/* {priceType === '0' &&
          (
            <Grid>
              넌 무료 강의를 선택했지!
            </Grid>
          )
        }
        {priceType === '-1' &&
          (
            <Grid>
              넌 국비지원 강의를 선택했지!
            </Grid>
          )
        } */}


      </Grid>
      <Grid item xs={3} />
    </Grid>

    <Grid container justifyContent="center"  sx={{ marginTop: '2rem', }}>
        <Grid item xs={2} />

        <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent:'center'  }}>
            <CoTypography size="Title">컨텐츠</CoTypography>
        </Grid>
        <Grid item xs={6}>
          <CustomTextField fullWidth id="standard-basic" variant="standard" placeholder='컨텐츠 제목을 입력하세요.'/>
        </Grid>
        <Grid item xs={3} />
    </Grid>

    <Grid container justifyContent="center" >
      <Grid item xs={2} />
      <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent:'center'  }}>
        <CoTypography size="Title">썸네일</CoTypography>
      </Grid>
      <Grid item xs={6}>
        <UploadImage />
      </Grid>
      <Grid item xs={3} />
    </Grid>

    <Grid container justifyContent="center" sx={{ mb: '2rem', }} >
      <Grid item xs={2} />
      <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent:'center'  }}>
        <CoTypography size="Title">동영상</CoTypography>
      </Grid>
      <Grid item xs={6} >
        <UploadVideo />
      </Grid>
      <Grid item xs={3} />
    </Grid>
  </>
  )
}

export default ChapterOne