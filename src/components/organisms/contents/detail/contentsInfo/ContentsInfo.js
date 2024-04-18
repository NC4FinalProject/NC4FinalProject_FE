import { Avatar, Box, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaCommentDots, FaEye, FaShare, FaFlag, FaRegFlag, FaThumbsUp   } from "react-icons/fa";
import burceMars from '../../../../../images/bruce-mars.jpg'
import { useContentsStore } from '../../../../../stores/ContentsStore';


const ContentsInfo = ({ contents, countState, video } ) => {

  const {getContents, stateNum} = useContentsStore();
  const [profileImage, setProfileImage] = useState("/broken-mage.jpg");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '.').replace(/\.$/, ''); // 'yyyy.mm.dd' 형식으로 변환
  };
  
  // 사용 예:
  const formattedDate = formatDate(getContents.regDate);

  useEffect(()=>{
    // 주소로 해당 컨텐츠 아이디와 함께 서버로 전송하고 이에 해당하는 맴버 가져오기 api/store 구분해서 만들기
    if(false){
      setProfileImage("https://kr.object.ncloudstorage.com/envdev/")
      // profileImage
    }
  },[])

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
      
      {/* <Typography component={"div"} variant="body2" style={{ color: "#A4A4A4" }}>
        <Grid component="span" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Grid sx={{ display: 'flex', alignItems: 'center', mr: '1em' }}>
            <FaEye style={{ marginRight: '0.1em', color: '#A4A4A4' }}/>
              22
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center', mr: '1em' }}>
            <FaThumbsUp style={{ marginRight: '0.1em', color: '#A4A4A4' }}/>
              22
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center', mr: '1em' }}>
            <FaCommentDots style={{ marginRight: '0.1em', color: '#A4A4A4' }}/>
              22
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center', mr: '1em' }}>
            <FaShare style={{ marginRight: '0.1em', color: '#A4A4A4' }}/>
              22
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            <FaFlag style={{ marginRight: '0.1em', color: '#A4A4A4' }} />
              22
          </Grid>
        </Grid>
        </Typography> */}

        <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
         <Typography variant="caption" style={{ color: "#A4A4A4" }}>
            · {formattedDate}
          </Typography>
        </Grid>
        
      </Grid>

    </Grid>

    <Grid container alignItems="center" >



      <Grid sx={{mx:0.7}}>
        <Avatar src={`https://kr.object.ncloudstorage.com/envdev/${getContents.profileFile}`} 
              // alt="profile-image"
              sx={{
                width: theme => theme.spacing(5),
                height: theme => theme.spacing(5),
              }}/>
      </Grid>
      
      <Grid alignItems='start'>
       <Typography sx={{ fontSize: '0.95rem' }}>
          {getContents.userNickname}
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
