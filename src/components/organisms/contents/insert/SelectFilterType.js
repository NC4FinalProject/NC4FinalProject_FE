import { Grid, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CoTypography from '../../../atoms/common/CoTypography'
import styled from 'styled-components';
import { chapterOneStore, contentsCategoryItems, contentsPriceTypeItems, useChapterOneStore } from '../../../../stores/ContentsStore';

const CustomTextField = styled(TextField)({
  '& .MuiInput-input::placeholder': {
    fontSize: '0.9rem', // 원하는 글자 크기로 조정
  },
  '& .MuiInput-input': {
    textAlign: 'center', // 입력 필드 텍스트를 수평 중앙 정렬
    // 필요하다면 lineHeight도 조정할 수 있음
  },
});

// 분야 유형 또는 가격 유형에 따른 컴포넌트 표출
const FilterMap = ({isType, placeholder, handleTypeSelector }) => {

  const { chapterOne, chapterOneInput } = useChapterOneStore();

  const valueType = isType ? chapterOne.category : chapterOne.priceType;
  
  
  return(
    <CustomTextField
      select
      value={valueType} 
      variant="standard" 
      onChange={handleTypeSelector}
      fullWidth
      defaultValue=""

      label={placeholder}
      InputLabelProps={{
        style: { textAlign: 'center', width: '100%' },
      }}
    >
      
      {
        isType ? (
          contentsCategoryItems.map((el) => (
            <MenuItem key={el.id} value={el.type}>
              {el.type}
            </MenuItem>
          ))
        ):(
          contentsPriceTypeItems.map((el) => (
            <MenuItem key={el.id} value={el.type} >
              {el.type}
            </MenuItem>
          ))
        )
      }

    </CustomTextField>
  )

}

const SelectFilterType = ({title, placeholder, isType}) => {

  const [payType, setPayType] = useState("");

  const [pay, setPay] = useState("");

  const { chapterOne, chapterOneInput } = useChapterOneStore();

  const [formattedPrice, setFormattedPrice] = useState('');
  
  // 가격 정보 상태 저장
  const handlePriceChange = (e) => {
    // chapterOneInput({ price: e.target.value });

    const rawPrice = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = rawPrice ? new Intl.NumberFormat('de-DE').format(parseInt(rawPrice, 10)) : '';

    // 포맷된 값을 뷰 상태로 저장
    setFormattedPrice(formattedValue);

    // 숫자만을 저장하는 로직
    chapterOneInput({ price: rawPrice });
  };

  /// 카테고리 및 가격 유형 정보 상태 저장
  const handleTypeSelector = (e) => {
    setPayType(e.target.value);
    if(isType){
      chapterOneInput({ category: e.target.value });
      // setValueType(chapterOne.category)
      console.log("카테고리 유형 선택 함수에는 오니?")
    } else {
      chapterOneInput({ priceType: e.target.value });
      // setValueType(chapterOne.priceType)
    }
  };

  // 유료 강의에서 무료 강의 시, 가격 초기화 및 컨텐츠 가격 유형 결정
  useEffect((e) => {
    if (payType === "무료 강의") {
      // console.log("무료 강의 타입으로 눌림")
      setPay("0")
      chapterOneInput({ price: ""})
    } else if (payType === '유료 강의'){
      // console.log("유료 강의 타입으로 눌림")
      setPay("1")

    } else if (payType === '국비 지원') {
      // console.log("국비 지원 타입으로 눌림")
      setPay("-1")
      chapterOneInput({ price: "-1"})
    }  
    // console.log(payType)
  }, [payType]);

  // 가격 포맷
  useEffect(() => {
    const rawPrice = chapterOne.price;
    const formattedValue = rawPrice ? rawPrice.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : '';
    setFormattedPrice(formattedValue);
  }, [chapterOne.price]);

  return (
  <Grid container justifyContent="center" sx={{ marginTop: '0.35rem', }} >
    <Grid item xs={2} />

    <Grid item xs={1} style={{ display: 'flex', alignItems: 'end', justifyContent:'center', paddingBottom: '0.1rem'}}>
        <CoTypography size="Title">{title}</CoTypography>
    </Grid>

    {/* 유료강의 일 경우 가격입력 란 표시 */}
    <Grid item xs={6}> 
    {!isType && chapterOne.priceType === "유료 강의" ? (
      <Grid container alignItems={'flex-end'}>
        <Grid item xs={8} >
          <CustomTextField fullWidth id="standard-basic" variant="standard" 
            value={formattedPrice || ""} 
            onChange={handlePriceChange}  
            placeholder='가격을 입력하세요.'/>
        </Grid>
        <Grid item xs={4}>
          <FilterMap isType={isType} placeholder={placeholder} handleTypeSelector={handleTypeSelector} payType={payType}/>
        </Grid>
      </Grid>
    ) : (
      <FilterMap isType={isType} placeholder={placeholder} handleTypeSelector={handleTypeSelector} payType={payType}/>
    )}
    </Grid>
    
    <Grid item xs={3} />
  </Grid>

  )
}

export default SelectFilterType