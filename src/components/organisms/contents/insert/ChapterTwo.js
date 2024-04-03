import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CoTypography from '../../../atoms/common/CoTypography'
import SectionForm from './SectionForm'
import { useChapterTwoStore } from '../../../../stores/ContentsStore'

const ChapterTwo = () => {

  const { chapterTwo, addSection, removeSection, addSectionSub, removeSectionSub } = useChapterTwoStore();
  
  // !!!!!!!!!!!섹션!!!!!!!! 추가
  const addSectionFunc = (sectionId) => {
    console.log("이것이 받아온 섹션 아이디여 이거 눌리는데 왜 아이디가 0으로 바끼지" + sectionId)
    addSection({
      sectionId: sectionId + 1,
      sectionTitle: '',
      sectionSubList: []
    });
  }

  // 섹션 삭제
  const removeSectionFunc = (sectionId) => {
    removeSection(sectionId);
  }

  // -------------서브----------- 섹션 추가 함수가 될 것이여
  const addSectionSubFunc = (sectionId, sectionSubId) => {
    // const subID = indexSub +1
    addSectionSub(sectionId, {
      sectionId: sectionId,
      sectionSubId: sectionSubId + 1,
      sectionSubTitle: '',
    });
  }

  const removeSectionSubFunc = (sectionSubId) => {
    removeSectionSub(sectionSubId);
  }

  // 공백 배열의 !!!!!!!!!!최초!!!!!!! 섹션 인덱스 추가
  useEffect(()=>{
    if(chapterTwo.length === 0){
      addSection({
        sectionId: 1,
        sectionTitle: '',
        sectionSubList: []
      })
      console.log("최초마운트 시, 공백의 섹션 객체 생성 부모 컴포넌트")
    }
  },[])

  return (
    <>
      <Grid container justifyContent="center" sx={{ my: '2rem', }}>
        <Grid item xs={2} />
        <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent:'center'  }}>
          <CoTypography size="Title">강의코스</CoTypography>
        </Grid>
        <Grid item xs={7}>
          {chapterTwo.map((section, index) => (
            <SectionForm
              key={index}
              index={index}
              sectionId={section.sectionId}
              title={`Section_${index +1}`}
              onAdd={addSectionFunc}
              onRemove={removeSectionFunc}
              onSubAdd={addSectionSubFunc} 
              onSubRemove={removeSectionSubFunc} 
              showRemove={chapterTwo.length > 1 && index === chapterTwo.length - 1}
              isLast={index === chapterTwo.length - 1}
              sectionSubList={section.sectionSubList}
            />
          ))}
        </Grid>
        <Grid item xs={2}/>

        {/* 테스트여 */}
        <Button onClick={() => {console.log(chapterTwo);}}>test</Button>

      </Grid>
    </>
  )
}

export default ChapterTwo


/*
const addSection = () => {
  console.log(sections)
  const newId = `${sections.length + 1}`;
  setSections([...sections, { id: newId, subs: [{ id: `${newId}-1` }] }]);
  console.log(chapterTwo[0])
};

const removeSection = (sectionId) => {
  setSections(sections.filter((section) => section.id !== sectionId));
};

const addSectionSub = (sectionId) => {
  setSections(sections.map(section => {
    if (section.id === sectionId) {
      const newSubId = `${sectionId}-${section.subs.length + 1}`;
      const newSub = { id: newSubId };
      // console.log("1번 서브섹션 아이디 체크"+newSub)
      // console.log("2번 뉴서브" + newSub)
      // console.log("3번 서브섹션 아이디 체크2"+newSubId)
      // console.log("4번 뉴서브 아이디" + newSubId)
      return { ...section, subs: [...section.subs, newSub] };
    }
    return section;
  }));
};

const removeSectionSub = (sectionId, subId) => {
  // console.log(`Removing sub-section with ID ${subId} from section ${sectionId}`);
  setSections(sections.map(section => {
    if (section.id === sectionId) {
      const filteredSubs = section.subs.filter(sub => sub.id !== subId);
      {console.log("필터후서브섹션 : "+filteredSubs)}
      {console.log("리무브서브섹션 : "+subId)}
      return { ...section, subs: filteredSubs };
    }
    return section;
  }));
};
*/