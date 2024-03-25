import { Button, Grid } from '@mui/material'
import React from 'react'
import SectionList from './SectionList'
import CoTypography from '../../../atoms/common/CoTypography'

const ChapterTwo = () => {
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={2} />
        <Grid item xs={1} style={{ display: 'flex', alignItems: 'center' }}>
          <CoTypography size="Title">강의코스</CoTypography>
        </Grid>
        <Grid item xs={7}>
          <SectionList />
        </Grid>
        <Grid item xs={2}/>
      </Grid>
    </>
  )
}

export default ChapterTwo