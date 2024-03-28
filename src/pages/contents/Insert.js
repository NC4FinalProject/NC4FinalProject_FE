import styled from '@emotion/styled';
import { Button, Container, Grid, Input, TextField, Typography } from '@mui/material';
import React from 'react'
import SectionList from '../../components/organisms/contents/insert/SectionList';
import LinearStepper from '../../components/organisms/contents/insert/LinearStepper';
import InsertCKEditor from '../../components/atoms/common/InsertCKEditor';


const Insert = () => {
  return (
    <>
    <Container sx={{m: 5}}>

      <Grid item xs={12} sm={8} md={8} >
        <LinearStepper />
      </Grid>

    </Container>
    </>
    
  )
}

export default Insert;
