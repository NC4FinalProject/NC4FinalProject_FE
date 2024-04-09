import React, { useEffect, useRef, useState } from 'react'

import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material'
import CoTypography from '../../../../atoms/common/CoTypography'

import { useTheme } from '@emotion/react'
import SideTypeMulti from './SideTypeMulti'

import styled from 'styled-components'
import { useContentsStore } from '../../../../../stores/ContentsStore'

const CustomTextField = styled(TextField)({
  '& .MuiInput-input::placeholder': {
    fontSize: '0.9rem', // 원하는 글자 크기로 조정
  },
});

const ContentsSide = () => {
  
  const theme = useTheme();

  const { getVideo } = useContentsStore();


  // contentsType
  // 단일 강의 일 경우 sideTypeOne - reply
  // 다중 강의 일 경우 sideTypeMulti - list reply
  // 화상 강의 일 경우 sideTypeReal - chat
  const [contentsType, setContentsType] = useState();

  // contentsTypeBody
  // list, reply, chat
  const [activeComponent, setActiveComponent] = useState();

  const [videoId, setVideoId] = useState('');

  ///////////////////////////////
  /////////상단 테스트////////////
  const [testButton, setTestButton] = useState(false);

  const changeButton =() => {
    if (testButton){
      setContentsType('sideTypeOne')
    } else {
      setContentsType('sideTypeMulti')
    }
  };
  const toggleTestButton = () => {
    setTestButton(currentState => !currentState); 
    changeButton();
  };
  ///////////////////////////////
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeComponent]); 

  useEffect(()=>{
    if(getVideo.length === 0){
      setContentsType('sideTypeOne')
      setActiveComponent('reply');
      console.log("1")
    } else if(getVideo.length < 0){
      setContentsType('sideTypeMulti')
      setActiveComponent('list');
      console.log("2")
    } else if(getVideo.length < null){
      setContentsType('sideTypeChat')
      console.log("3")
    }
  },[getVideo.length])

  const [isReplyHover, setIsReplyHover] = useState(false);

  const handleReplyClick = () => {
    console.log('리플리 클릭');
    setActiveComponent('reply');
  };

  const handleVideoListClick = () => {
    console.log('리스트 클릭');
    setActiveComponent('list');
  };

  const handleReplyContent = (e) => {
    const inputText = e.target.value;
    console.log(inputText)
    // Video[videoId].videoReplyList
  }

  const selectVideo = (newSelect) => {
    setVideoId(newSelect)
    console.log("================이것이 콜백함수의 힘이여 여기 부모컴포넌트임"+newSelect)
  };

  return (
    <Grid container direction="column" sx={{ height: '100%', display: 'flex' }}>

      {/* 상단 버튼 영역 */}
      <Grid item sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: `1px solid ${theme.palette.divider}`}}>
        
        <Grid container sx={{ px: 2, py: 0.3, paddingTop: 1, display: 'flex' }}>
          
          {/* sideTypeOne일때 상단에서 reply 로직 */}
          {contentsType === 'sideTypeOne' && (
            <>
              <Grid item xs={3} onClick={handleReplyClick} >
                <CoTypography size="Content" sx={{color: 'primary.main'}}>Reply</CoTypography>
              </Grid>
              <Grid item xs={9} onClick={handleVideoListClick} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              </Grid>
            </>
          )}

          {/* sideTypeMulti일때 상단에서 reply&list 전환 로직 */}
          {contentsType === 'sideTypeMulti' && (
            <>
            {activeComponent === 'reply' ? (
              ///////////////////// 1
              <>
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
              <Grid item xs={9} onClick={handleVideoListClick} 
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
                ///////////////////// 2
              <>
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
            </>
          )}
          {/* sideTypeReal일때 상단에서 Chat 로직 */}
          
        </Grid>

        <Divider style={{width: '70%'}}/>

      </Grid>

      {/* 본문 영역 */}
      <Grid ref={scrollRef} item xs sx={{ flexGrow: 1, overflowY: 'auto',  borderLeft: `1px solid ${theme.palette.divider}` }}>

        <SideTypeMulti bodyCkeck={activeComponent} videoCheck={selectVideo}/>
        {/* {console.log(activeComponent)} */}

      </Grid>
      

      {/* 입력 필드 영역 */}
      <Grid item sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Divider sx={{ width: '30%' }} />
        </Box>
        { activeComponent === 'reply' ? (
          <CustomTextField onChange={handleReplyContent} fullWidth id="standard-basic" variant="standard" placeholder='댓글을 입력하세요.'/>
          ) : (<></>)
        }
      </Grid>

      {/* 테스트용 */}
      {/* <Button onClick={toggleTestButton}>체체체인지</Button> */}

    </Grid>
  )
}


export default ContentsSide
