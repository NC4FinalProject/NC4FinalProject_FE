import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CoTypography from '../../../atoms/common/CoTypography';


const Section = ({ title, onAdd, onRemove, showRemove, isLast }) => (
  <Grid container display={'flex'}>
    <Grid item xs={10} style={{ display: 'flex', alignItems: 'center' }}>
      <CoTypography style={{ marginRight: '1rem' }} size="Title">{title}</CoTypography>
      <TextField fullWidth id="standard-basic" variant="standard" />
    </Grid>
    <Grid item xs={1.5} style={{ display: 'flex', alignItems: 'Flex-end' }}>
      {isLast && (
        <IconButton sx={{ padding: 0, marginX: 1 }} onClick={onAdd}>
          <AddCircleOutlineIcon />
        </IconButton>
      )}

      {showRemove && (
        <IconButton sx={{ padding: 0, }} color="error" onClick={onRemove}>
          <RemoveCircleOutlineIcon />
        </IconButton>
      )}
    </Grid>
    <Grid item xs={0.5}>
      <Button>+</Button>
    </Grid>
  </Grid>
);

export default function Sections() {
  const [sections, setSections] = useState([{ id: '1', subs: [{ id: '1-1' }] }]);

  const addSection = () => {
    const newId = `${sections.length + 1}`;
    setSections([...sections, { id: newId, subs: [{ id: `${newId}-1` }] }]);
  };

  const removeSection = (sectionId) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  return (
    <div>
      {sections.map((section, index) => (
        <Section
          key={section.id}
          title={`Section_${section.id}`}
          onAdd={addSection}
          onRemove={() => removeSection(section.id)}
          showRemove={sections.length > 1 && index === sections.length - 1}
          index={index}
          isLast={index === sections.length - 1}
        />
      ))}
    </div>
  );
}

