import { Box, Button, ButtonGroup, Grid, IconButton, Table, TextField, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import CoTypography from '../../../atoms/common/CoTypography'
import styled from 'styled-components'
import {CategoryList} from '../../../../api/curriculumCourseApi'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import CoHoverButton from '../../../atoms/common/CoHoverButton'
import Codialog from '../../common/Codialog'


const SubSection = ({ subSectionTitle, subIndex }) => (
  <Grid container alignItems="center" key={subIndex} pb={'0.10rem'}>
    <Grid item xs={1}/>
    <Grid container item xs={10} alignItems="center">
      <Grid item xs={3} container justifyContent={'end'} >
       <Typography variant='subtitle1' sx={{color:'#585858'}}>Sub_{subIndex + 1}</Typography>
      </Grid>
      <Grid item xs={9} pl={'0.7rem'}>
        <SubTextField fullWidth variant="standard" value={subSectionTitle} />
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

const CurriculumCourse = () => {

  const [showHideSubSections, setShowHideSubSections] = useState(false);

  const [openSubSections, setOpenSubSections] = useState({});

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

        {CategoryList.map((category, index) => (
        <Fragment key={category.id}>
          <Grid container alignItems="center" key={category.id} pt={'0.55rem'}>
            <Grid item xs={1}/>

            <Grid container item xs={10} alignItems="center">

              <Grid item xs={3} container justifyContent={'end'} >
                <CoTypography size="Title">Section_{index + 1}</CoTypography>
                <IconButton
                  sx={{ padding: 0 }}
                  color="gray"
                  onClick={() => toggleSubSection(category.id)}
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

          {showHideSubSections && category.subSectionTitle.map((subCategory, subIndex) =>(
            <SubSection subSectionTitle={subCategory} subIndex={subIndex} />
          ))}

          {openSubSections[category.id] && category.subSectionTitle.map((subCategory, subIndex) => (
            <SubSection subSectionTitle={subCategory} subIndex={subIndex} />
          ))}

        </Fragment>
        ))}
      </Grid>

      <Grid item xs={2} display="flex" alignItems="start" justifyContent={'flex-end'}>
        {showHideSubSections ? (
          <CoHoverButton  variant="outlined" onClick={handleShowHide}>전체닫기</CoHoverButton>
        ):(
          <CoHoverButton  variant="outlined" onClick={handleShowHide}>펼쳐보기</CoHoverButton>
        )}
        
      </Grid>

    </Grid>
    </>
  );
}

export default CurriculumCourse