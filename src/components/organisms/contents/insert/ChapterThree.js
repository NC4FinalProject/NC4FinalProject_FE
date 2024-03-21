import { Grid, Typography } from '@mui/material'
import React from 'react'
import InsertCKEditor from '../../../atoms/common/InsertCKEditor'
import CoTypography from '../../../atoms/common/CoTypography'

const ChapterThree = () => {
  return (
    <>
    <Grid container justifyContent="center" >
      <Grid item xs={2} />
      <Grid item xs={8} >
        {/* <CoTypography style={{ marginBottom: '24px' }}>강의소개</CoTypography> */}
        <InsertCKEditor />
      </Grid>
      <Grid item xs={2} />
    </Grid>
    </>
  )
}

export default ChapterThree
