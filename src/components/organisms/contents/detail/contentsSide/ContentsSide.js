import React, { useEffect, useRef, useState } from 'react'

import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import CoTypography from '../../../../atoms/common/CoTypography'

import { useTheme } from '@emotion/react'
import SideTypeOne from './SideTypeOne'
import SideTypeMulti from './SideTypeMulti'
import SideTypeReal from './SideTypeReal'
import SideMulti from './SideTypeMulti'
import styled from 'styled-components'


const CustomTextField = styled(TextField)({
  '& .MuiInput-input::placeholder': {
    fontSize: '0.9rem', // 원하는 글자 크기로 조정
  },
});

const ContentsSide = () => {
  
  const theme = useTheme();

  // 다중 강의 일 경우 list reply - multi
  // 단일 강의 일 경우 reply - one
  // 화상 강의 일 경우 chat - real
  const [contentsType, setContentsType] = useState('multi');

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []); 

  // {contentsType === 'multi' && <SideTypeMulti />}
  // {contentsType === 'one' && <SideTypeOne />}
  // {contentsType === 'real' && <SideTypeReal />}

  const [activeComponent, setActiveComponent] = useState('list');

  const [isReplyHover, setIsReplyHover] = useState(false);

  const handleReplyClick = () => {
    console.log('리플리 클릭');
    setActiveComponent('reply');
  };

  const handleVideoListClick = () => {
    console.log('리스트 클릭');
    setActiveComponent('list');
  };

  return (
    <Grid container direction="column" sx={{ height: '100%', display: 'flex' }}>

      {/* 상단 버튼 영역 */}
      <Grid item sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: `1px solid ${theme.palette.divider}`}}>
        
        <Grid container sx={{ px: 2, py: 0.3, paddingTop: 1, display: 'flex' }}>
          {activeComponent === 'reply' ? (
            <>
            {/* <Grid item xs={3} onClick={handleReplyClick} >
              <CoTypography size="Content" sx={{color: 'primary.main', ':hover': {cursor: 'pointer'}}}>Reply</CoTypography>
            </Grid>
            <Grid item xs={9} onClick={handleVideoListClick} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Typography variant='body2' sx={{':hover': {color: 'primary.main', cursor: 'pointer'}}}>List</Typography>
            </Grid> */}
            <Grid item xs={3} onClick={handleReplyClick}>
              <CoTypography 
                size='Content' 
                sx={{
                  color: isReplyHover ? 'text.primary' : 'primary.main', 
                  ':hover': {
                    color: 'primary.main', 
                    cursor: 'pointer'
                  }
                }}
              >Reply
              </CoTypography>
            </Grid>
            <Grid 
              item xs={9} 
              onClick={handleVideoListClick} 
              onMouseEnter={() => setIsReplyHover(true)} 
              onMouseLeave={() => setIsReplyHover(false)}
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'flex-end',
                color: "#6E6E6E"
              }}
            >
              <Typography variant="body2" sx={{':hover': {color: 'primary.main', cursor: 'pointer'}}}>List</Typography>
            </Grid>
            </>
          ) : (
          <>
          {/* <Grid item xs={3} onClick={handleListClick}>
            <CoTypography size='Content' sx={{color: 'primary.main', ':hover': {cursor: 'pointer'}}}>List</CoTypography>
          </Grid>
          <Grid item xs={9} onClick={handleReplyClick} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <Typography variant="body2" sx={{':hover': {color: 'primary.main', cursor: 'pointer'}}}>Reply</Typography>
          </Grid> */}
          <Grid item xs={3} onClick={handleVideoListClick}>
            <CoTypography 
              size='Content' 
              sx={{
                color: isReplyHover ? 'text.primary' : 'primary.main', 
                ':hover': {
                  color: 'primary.main', 
                  cursor: 'pointer'
                }
              }}
            >List
            </CoTypography>
          </Grid>
          <Grid 
            item xs={9} 
            onClick={handleReplyClick} 
            onMouseEnter={() => setIsReplyHover(true)} 
            onMouseLeave={() => setIsReplyHover(false)}
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'flex-end',
              color: "#6E6E6E"
            }}
          >
            <Typography variant="body2" sx={{':hover': {color: 'primary.main', cursor: 'pointer'}}}>Reply</Typography>
          </Grid>
          </>
          )}
        </Grid>

        <Divider style={{width: '70%'}}/>
      </Grid>

      {/* 본문 영역 */}
      <Grid ref={scrollRef} item xs sx={{ flexGrow: 1, overflowY: 'auto',  borderLeft: `1px solid ${theme.palette.divider}` }}>


        <SideTypeMulti bodyCkeck={activeComponent}/>
        {console.log(activeComponent)}

      </Grid>
      

      {/* 입력 필드 영역 */}
      <Grid item sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Divider sx={{ width: '30%' }} />
        </Box>
        { activeComponent === 'reply' ? (
          <CustomTextField fullWidth id="standard-basic" variant="standard" placeholder='댓글을 입력하세요.'/>
          ) : (<></>)
        }
        
      </Grid>
    </Grid>
  )
}


export default ContentsSide
