import React, { useState } from 'react';
import styled from '@emotion/styled';
import { IconButton, TextField, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const SectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f0f0f0;
  margin-bottom: 8px;
  padding: 8px;
`;

const StyledIconButton = styled(IconButton)`
  margin-left: 8px;
`;

const StyledTextField = styled(TextField)`
  flex-grow: 1;
  margin-right: 8px;
  & .MuiInputBase-root {
    font-size: 1rem;
  }
`;

const AddIconButton = styled(IconButton)`
  color: #000;
`;

const Title = styled(Typography)`
  font-weight: bold;
  margin-right: 16px;
`;

const Section = ({ title, onAdd, onRemove, showRemove }) => (
  <SectionContainer>
    <Title variant="body1">{title}</Title>
    <StyledTextField variant="outlined" />
    {showRemove && (
      <StyledIconButton color="error" onClick={onRemove}>
        <RemoveCircleOutlineIcon />
      </StyledIconButton>
    )}
    <AddIconButton onClick={onAdd}>
      <AddCircleOutlineIcon />
    </AddIconButton>
  </SectionContainer>
);

export default function DynamicSections() {
  const [sections, setSections] = useState([
    { id: '1', subs: [{ id: '1-1' }] },
  ]);

  const addSection = () => {
    const newId = `${sections.length + 1}`;
    setSections([...sections, { id: newId, subs: [{ id: `${newId}-1` }] }]);
  };

  const removeSection = (sectionId) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const addSubsection = (sectionId) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              subs: [...section.subs, { id: `${sectionId}-${section.subs.length + 1}` }],
            }
          : section
      )
    );
  };

  const removeSubsection = (sectionId, subId) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              subs: section.subs.filter((sub) => sub.id !== subId),
            }
          : section
      )
    );
  };

  return (
    <div>
      <Title variant="h4" gutterBottom>
        강의 목록
      </Title>
      {sections.map((section) => (
        <React.Fragment key={section.id}>
          <Section
            title={`섹션 ${section.id}`}
            onAdd={() => addSubsection(section.id)}
            onRemove={() => removeSection(section.id)}
            showRemove={sections.length > 1}
          />
          {section.subs.map((sub) => (
            <Section
              key={sub.id}
              title={`React 1시간 마스터 과정`}
              onAdd={() => {}}
              onRemove={() => removeSubsection(section.id, sub.id)}
              showRemove={section.subs.length > 1 || sections.length > 1}
            />
          ))}
        </React.Fragment>
      ))}
      <AddIconButton onClick={addSection}>
        <AddCircleOutlineIcon />
      </AddIconButton>
    </div>
  );
}
