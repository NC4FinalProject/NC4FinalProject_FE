import { Avatar, Box, Grid, Typography } from '@mui/material';
import React from 'react'
import { FaCommentDots, FaEye, FaShare, FaFlag, FaRegFlag, FaThumbsUp   } from "react-icons/fa";
import burceMars from '../../../../../images/bruce-mars.jpg'


const ContentsInfo = ({ comments, views, shares, color }) => {
  return (
    <>
    <Grid sx={{px:0.5}} container justifyContent={'space-between'}  >
      
      <Grid item>
        <Typography variant="h5">비트캠프 데브옵스 4기 과정 React 기초 강의</Typography>
      </Grid>
  
      <Grid item>

        <Grid>
          <Typography variant="body2" style={{ color: "#A4A4A4" }}>
            <Box component="span" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: '1em' }}>
                <FaEye style={{ marginRight: '0.3em' }}/>{views}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: '1em' }}>
                <FaThumbsUp style={{ marginRight: '0.3em' }}/>{comments}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: '1em' }}>
                <FaCommentDots style={{ marginRight: '0.3em' }}/>{comments}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: '1em' }}>
                <FaShare style={{ marginRight: '0.3em' }}/>{shares}
              </Box>
              {/* 마지막 아이템에는 marginRight을 주지 않음 */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FaFlag style={{ marginRight: '0.3em' }} />{views}
              </Box>
            </Box>
          </Typography>
        </Grid>

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
          Gogichen12
        </Typography>
        <Typography sx={{ fontSize: '0.75rem' }}>
          Bitcamp | 웹개발
        </Typography>
      </Grid>

    </Grid>
    </>
  );
};

export default ContentsInfo;
