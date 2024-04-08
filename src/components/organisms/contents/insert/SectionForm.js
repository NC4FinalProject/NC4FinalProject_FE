import { Grid, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CoTypography from '../../../atoms/common/CoTypography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import styled from 'styled-components';
import { useChapterTwoStore } from '../../../../stores/ContentsStore';


const CustomTextField = styled(TextField)({
  '& .MuiInput-input::placeholder': {
    fontSize: '0.9rem', // 원하는 글자 크기로 조정
  },
  '& .MuiInput-input': {
    textAlign: 'center', // 입력 필드 텍스트를 수평 중앙 정렬
    // 필요하다면 lineHeight도 조정할 수 있음
  },
})

const SectionForm = ({ title, showRemove,
                       onAdd, onRemove, onSubAdd, onSubRemove, 
                       isLast, sectionId, sectionSubList, index }) => {

  const [textFieldFocused, setTextFieldFocused] = useState(false);
  const [textFieldFocusedSub, setTextFieldFocusedSub] = useState(false);

  const [showSubSections, setShowSubSections] = useState({});

  const { chapterTwo, sectionTitleInput, sectionSubTitleInput, addSectionSub } = useChapterTwoStore();

  const handleSectionTextFiledChange = (e) => {
    const newTitle = e.target.value;
    sectionTitleInput(index, newTitle);
  };

  const handleSectionSubTextFiledChange = (sectionSubId, sectionId) => (e) => {
    const newSubTitle = e.target.value;
    sectionSubTitleInput(sectionSubId, sectionId, newSubTitle);
  };
  
  // 공백 배열의 최초 -------서브--------- 섹션 인덱스 추가
  const addSectionSubInit = (sectionId, sectionSubId) => {
    if(sectionSubList.length === 0){
      addSectionSub(sectionId, {
        sectionId: sectionId,
        sectionSubId: 1,
        sectionSubTitle: '',
      })
    }
  }
  
  useEffect(() => {
    const initialShowSubSections = chapterTwo.reduce((acc, section, idx) => {
      acc[section.sectionId] = section.sectionSubList.length > 0;
      return acc;
    }, {});
    setShowSubSections(initialShowSubSections);
  }, [chapterTwo]);

  const handleToggleSubSections = (sectionId) => {
    setShowSubSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  return (
    <>
      {/* 메인 섹션 */}
      <Grid container alignItems="center">
        {/* 기본 제목 */}
        <Grid item xs={2} display="flex" alignItems="center">
          <CoTypography size="Title">{title}</CoTypography>
          <IconButton
            sx={{ padding: 0 }}
            color="black"
            onClick={() => {
              // setShowSubSections(!showSubSections);
              handleToggleSubSections(sectionId)
              addSectionSubInit(sectionId);
            }}
          >
             {showSubSections[sectionId] ? <RemoveSharpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Grid>
        {/* 기본 입렵 */}
        <Grid item xs={8}>
          <CustomTextField fullWidth variant="standard" placeholder='컨텐츠 커리큘럼을 입력하세요.'
           onFocus={() => setTextFieldFocused(true)} 
           onBlur={() => setTextFieldFocused(false)} 
           onChange={handleSectionTextFiledChange}
           value={chapterTwo.length > index ? chapterTwo[index].sectionTitle : ''}
           />
        </Grid>
        {/* 버튼 관련 */}
        <Grid item xs={2} display="flex" alignItems="flex-end">
          {textFieldFocused && isLast && (
            <IconButton sx={{ padding: 0, mx: 1 }} 
              onMouseDown={(event) => {
              event.preventDefault(); 
              onAdd(sectionId);
              console.log("섹션 추가 버튼 쪽임")
              }}
              // onClick={addSectionFunc}
              >
              <AddCircleOutlineIcon />
            </IconButton>
          )}
          {textFieldFocused && showRemove && (
            <IconButton sx={{ padding: 0 }} color="error" 
              onMouseDown={(event) => {
              event.preventDefault();
              onRemove(sectionId); 
            }}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>

      {/* 서브 섹션 */}
      {/* {showSubSections && sectionSubList.map((subSection, indexSub) => ( */}
      {showSubSections[sectionId] && sectionSubList.map((sectionSub, indexSub) => (
        <Grid container key={sectionSub.sectionSubId} alignItems="center">
          {/* {console.log(sectionSubList.sectionSubId+"여긴 올까?")} */}
          <Grid item xs={1} />

          <Grid item xs={1}>
            <CoTypography size="Content">{`Sub_${indexSub + 1}`}</CoTypography>
          </Grid>
          {/* 하위 섹션 입력 관련 */}
          <Grid item xs={8}>
            <CustomTextField
              fullWidth
              variant="standard"
              placeholder='컨텐츠 세부과정을 입력하세요.'
              onFocus={() => setTextFieldFocusedSub(true)} 
              onBlur={() => setTextFieldFocusedSub(false)} 
              onChange={handleSectionSubTextFiledChange(sectionSub.sectionSubId, sectionId)}
              // 이렇게 수정하면 각 서브 섹션의 고유 ID를 함수에 전달할 수 있음
              value={sectionSub.sectionSubTitle || ''}
              sx={{ 
                '& .MuiInput-input': {
                  color: '#585858', 
                  fontSize: '0.95rem'
                }
              }}
            />
          </Grid>

          {/* 하위 섹션 버튼 관련 */}
          <Grid item xs={2} display="flex" alignItems="flex-end">
          {textFieldFocusedSub && indexSub === sectionSubList.length - 1 && (
            <IconButton sx={{ padding: 0, mx: 1 }} 
              onMouseDown={(event) => {
              event.preventDefault(); 
              onSubAdd(sectionId, sectionSub.sectionSubId);}}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          )}

          {/* 하위 섹션 삭제 버튼 */}
          {textFieldFocusedSub && sectionSubList.length > 0 && indexSub === sectionSubList.length - 1 && (
          <IconButton sx={{ padding: 0 }} color="error" 
            onMouseDown={(event) => {
            event.preventDefault();
            onSubRemove(sectionSub.sectionSubId);}}
            >
            <RemoveCircleOutlineIcon />
          </IconButton>
          )}
          </Grid>

        </Grid>
      ))}
    </>
  );
};

export default SectionForm;