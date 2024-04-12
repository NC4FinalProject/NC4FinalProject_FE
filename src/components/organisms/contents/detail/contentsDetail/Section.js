import { Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import CoTypography from '../../../../atoms/common/CoTypography'
import styled from 'styled-components'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import CoHoverButton from '../../../../atoms/common/CoHoverButton'
import { useContentsStore } from '../../../../../stores/ContentsStore'


const SubSection = ({ sectionSub, subIndex }) => (
  <Grid container alignItems="center" key={subIndex} pb={'0.10rem'}>
    <Grid item xs={1}/>
    <Grid container item xs={10} alignItems="center">
      <Grid item xs={3} container justifyContent={'end'} >
       <Typography variant='subtitle1' sx={{color:'#585858'}}>Sub_{subIndex + 1}</Typography>
      </Grid>
      <Grid item xs={9} pl={'0.7rem'}>
        <SubTextField fullWidth variant="standard" value={sectionSub.sectionSubTitle} />
      </Grid>
    </Grid>
    <Grid item xs={1}/>
  </Grid>
);

const SubTextField = styled(TextField)({
  '& .MuiInput-input': {
    color: '#585858', // 입력 필드 텍스트 색상을 그레이로 설정
  },
})

const TitleTextField = styled(TextField)({
  // 입력 필드 텍스트에 대한 스타일 직접 적용
  '& .MuiInput-input': {
    fontFamily: "Pretendard SemiBold",
    fontSize: "1rem",
  },
});

const Section = () => {

  const [showHideSubSections, setShowHideSubSections] = useState(false);

  const [openSubSections, setOpenSubSections] = useState({});

  const {getSection} = useContentsStore();

  const toggleSubSection = (id) => {
    setOpenSubSections(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleShowHide = () => {
    setShowHideSubSections(!showHideSubSections)
  }

  return (
    <>
    <Grid container justifyContent='space-between' pb={'7rem'}>
      <Grid item xs={2} ></Grid>

      <Grid item xs={8} justifyContent={'center'}>

        {getSection.map((category, index) => (
        <Fragment key={category.sectionId}>
          <Grid container alignItems="center" key={category.sectionId} pt={'0.55rem'}>
            <Grid item xs={1}/>

            <Grid container item xs={10} alignItems="center">

              <Grid item xs={3} container justifyContent={'end'} >
                <CoTypography size="Title">Section_{index + 1}</CoTypography>
                <IconButton
                  sx={{ padding: 0 }}
                  color="dark"
                  onClick={() => toggleSubSection(category.sectionId)}
                >
                  {showHideSubSections ? <RemoveSharpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </Grid>
              <Grid item xs={9} pl={'0.7rem'}>
                <TitleTextField fullWidth variant="standard" value={category.sectionTitle} />
              </Grid>

            </Grid>

            <Grid item xs={1}/>
          </Grid>

          {showHideSubSections && getSection[index].sectionSubList.map((sectionSub, subIndex) =>(
            <SubSection sectionSub={sectionSub} subIndex={subIndex} />
          ))}

          {openSubSections[category.sectionId] && getSection[index].sectionSubList.map((sectionSub, subIndex) => (
            <SubSection sectionSub={sectionSub} subIndex={subIndex} />
          ))}

        </Fragment>
        ))}
      </Grid>

      <Grid item xs={2} display="flex" alignItems="start" justifyContent={'flex-end'}>
        {showHideSubSections ? (
          <CoHoverButton  variant="outlined" onClick={handleShowHide}>전체닫기</CoHoverButton>
        ):(
          <CoHoverButton  variant="outlined" onClick={handleShowHide}>펼쳐보기</CoHoverButton>
        )
        }
        
      </Grid>

    </Grid>
    </>
  );
}

export default Section