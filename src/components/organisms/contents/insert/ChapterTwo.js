import { Button, Grid } from '@mui/material'
import React from 'react'
import SectionList from './SectionList'
import CoTypography from '../../../atoms/common/CoTypography'

const ChapterTwo = () => {
  return (
    <>
    <Grid container justifyContent="center">
        <Grid item xs={3} />
        {/* <Grid item xs={1} style={{ display: 'column', alignItems: 'baseline' }}>
          <Grid >
            <CoTypography size="Title">강의코스</CoTypography>
          </Grid>
        </Grid> */}
        <Grid item xs={6}>
          <SectionList />
        </Grid>
        <Grid item xs={3}/>
      </Grid>
    </>
  )
}

export default ChapterTwo