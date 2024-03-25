import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CoTypography from '../../../atoms/common/CoTypography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';


const Section = ({ title, onAdd, onRemove, showRemove, onSubAdd, onSubRemove, isLast, sectionId, subs }) => {
  const [showSubSections, setShowSubSections] = useState(false);

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={2} display="flex" alignItems="center">
          <CoTypography size="Title">{title}</CoTypography>
          <IconButton
            sx={{ padding: 0 }}
            color="gray"
            onClick={() => setShowSubSections(!showSubSections)}
          >
            {showSubSections ? <RemoveSharpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Grid>

        <Grid item xs={8}>
          <TextField fullWidth variant="standard" />
        </Grid>

        <Grid item xs={2} display="flex" alignItems="flex-end">
          {isLast && (
            <IconButton sx={{ padding: 0, mx: 1 }} onClick={onAdd}>
              <AddCircleOutlineIcon />
            </IconButton>
          )}
          {showRemove && (
            <IconButton sx={{ padding: 0 }} color="error" onClick={onRemove}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>

      {showSubSections && subs.map((sub, index) => (
        <Grid container key={sub.id} alignItems="center">
          {/* {console.log(sub.id)} */}
          <Grid item xs={1} />

          <Grid item xs={1}>
            <CoTypography size="Content">{`Sub_${index + 1}`}</CoTypography>
          </Grid>

          <Grid item xs={8}>
            <TextField
              fullWidth
              variant="standard"
            />
          </Grid>

          <Grid item xs={2} display="flex" alignItems="flex-end">
          {index === subs.length - 1 && (
            <IconButton sx={{ padding: 0, mx: 1 }} onClick={() => onSubAdd(sectionId)}>
              <AddCircleOutlineIcon />
            </IconButton>
          )}
          {/* 서브섹션 삭제 버튼은 첫 번째를 제외한 나머지 서브섹션에 표시됩니다. */}
          {subs.length > 0 && index === subs.length - 1 && (
          <IconButton sx={{ padding: 0 }} color="error" onClick={() => onSubRemove(sectionId, subs.id)}>
            <RemoveCircleOutlineIcon />
          </IconButton>
          )}
          </Grid>

        </Grid>
      ))}
    </>
  );
};

export default function Sections() {
  const [sections, setSections] = useState([{ id: '1', subs: [{ id: '1-1' }] }]);

  const addSection = () => {
    console.log(sections)
    const newId = `${sections.length + 1}`;
    setSections([...sections, { id: newId, subs: [{ id: `${newId}-1` }] }]);
  };

  const removeSection = (sectionId) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const addSubSection = (sectionId) => {
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

  const removeSubSection = (sectionId, subId) => {
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

  return (
    <div>
      {sections.map((section, index) => (
        <Section
          key={section.id}
          sectionId={section.id}
          title={`Section_${section.id}`}
          onAdd={addSection}
          onRemove={() => removeSection(section.id)}
          onSubAdd={() => addSubSection(section.id)} 
          onSubRemove={(subId) => removeSubSection(section.id, subId)} 
          showRemove={sections.length > 1 && index === sections.length - 1}
          index={index}
          isLast={index === sections.length - 1}
          subs={section.subs}
        />
      ))}
    </div>
  );
}

