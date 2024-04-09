import { Avatar, Box, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaCommentDots, FaEye, FaShare, FaFlag, FaRegFlag, FaThumbsUp   } from "react-icons/fa";
import burceMars from '../../../../../images/bruce-mars.jpg'
import { useContentsStore } from '../../../../../stores/ContentsStore';


const ContentsInfo = ({ comments, views, shares, contents, video } ) => {

  const {getContents, stateNum} = useContentsStore();

  return (
    <>
    <Grid sx={{px:0.5}} container justifyContent={'space-between'} >
      
      <Grid item>
        <Grid container alignItems="flex-start" style={{ height: '100%', flexDirection: 'column' }}>
         <Typography sx={{lineHeight: '1.10', fontSize:'0.80rem', color:'#2E2E2E'}}>{contents.contentsTitle}</Typography>
         <Typography variant="h6" sx={{lineHeight: '1.40', marginBottom: '0.4rem', color:'#1C1C1C'}}>{video[stateNum-1]?.videoTitle}</Typography>
        </Grid>
      </Grid>
  
      
      <Grid item>
      
      <Typography component={"div"} variant="body2" style={{ color: "#A4A4A4" }}>
        <Grid component="span" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Grid sx={{ display: 'flex', alignItems: 'center', mr: '1em' }}>
            <FaEye style={{ marginRight: '0.1em', color: '#A4A4A4' }}/>
              {views}
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center', mr: '1em' }}>
            <FaThumbsUp style={{ marginRight: '0.1em', color: '#A4A4A4' }}/>
              {comments}
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center', mr: '1em' }}>
            <FaCommentDots style={{ marginRight: '0.1em', color: '#A4A4A4' }}/>
              {comments}
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center', mr: '1em' }}>
            <FaShare style={{ marginRight: '0.1em', color: '#A4A4A4' }}/>
           
              {shares}
          </Grid>
          {/* 마지막 아이템에는 marginRight을 주지 않음 */}
          <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            <FaFlag style={{ marginRight: '0.1em', color: '#A4A4A4' }} />
              {views}
          </Grid>
          
        </Grid>
        </Typography>

        <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
         <Typography variant="caption" style={{ color: "#A4A4A4" }}>
            · 2024.03.25
          </Typography>
        </Grid>
        
      </Grid>


    </Grid>

    

    <Grid container alignItems="center" >

      <Grid sx={{mx:0.7}}>
        <Avatar src={burceMars} 
              alt="profile-image"
              sx={{
                width: theme => theme.spacing(5),
                height: theme => theme.spacing(5),
              }}/>
      </Grid>
      
      <Grid alignItems='start'>
       <Typography sx={{ fontSize: '0.95rem' }}>
          {getContents.memberId}
          {/* 고기천 강자님 */}
        </Typography>
       <Typography sx={{ fontSize: '0.75rem' }}>
          {getContents.category}
          {/* Bitcamp | 웹개발 */}
        </Typography>
      </Grid>

    </Grid>
    </>
  );
};

export default ContentsInfo;
