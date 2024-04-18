import React, { useEffect, useState } from 'react';
import { Grid, Paper,Box, Hidden } from '@mui/material';
import {  Link } from 'react-router-dom';
import { Carousel } from '@trendyol-js/react-carousel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CoTypography from '../../components/atoms/common/CoTypography';
import ContentsCard from '../../components/organisms/common/ContentsCard';
import MainStore from '../../stores/MainStore';
const Home = () => {
  const { bestContents, recentContents, randomContents, recentComments,getMainContents } = MainStore();

  useEffect(() => {
    getMainContents();
  }, []);

  const [bestSlideIndex, setBestSlideIndex] = useState(0);
  const [recentSlideIndex, setRecentSlideIndex] = useState(0);
  const [randomSlideIndex, setRandomSlideIndex] = useState(0);

  const slidesToShow = 4;
  const totalSlides = 12;

  const handleBestPrevsmall = () => {
    setBestSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleBestNextsmall = () => {
      setBestSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  const handleRecentPrevsmall = () => {
    setRecentSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleRecentNextsmall = () => {
    setRecentSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  const handleRandomPrevsmall = () => {
    setRandomSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleRandomNextsmall = () => {
    setRandomSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  };


  const handleBestPrev = () => {
    setBestSlideIndex((prev) => (prev > 0 ? prev - slidesToShow : prev));
  };

  const handleBestNext = () => {
    setBestSlideIndex((prev) => (prev < totalSlides - slidesToShow ? prev + slidesToShow : prev));
  };

  const handleRecentPrev = () => {
    setRecentSlideIndex((prev) => (prev > 0 ? prev - slidesToShow : prev));
  };

  const handleRecentNext = () => {
    setRecentSlideIndex((prev) => (prev < totalSlides - slidesToShow ? prev + slidesToShow : prev));
  };

  const handleRandomPrev = () => {
    setRandomSlideIndex((prev) => (prev > 0 ? prev - slidesToShow : prev));
  };

  const handleRandomNext = () => {
    setRandomSlideIndex((prev) => (prev < totalSlides - slidesToShow ? prev + slidesToShow : prev));
  };


  const bestIconStyle = {height:'1rem', width:'1rem', color:bestSlideIndex === 0 ? 'gray' : 'black', cursor: 'pointer'};
  const handleBestMouseOver = (e) => { if (bestSlideIndex !== 0) e.target.style.color='#558BCF';};
  const handleBestMouseOut = (e) => { e.target.style.color= bestSlideIndex === 0 ? 'gray' : 'black';};
  
  const handleBestMouseOver2 = (e) => { if (bestSlideIndex !== totalSlides - slidesToShow) e.target.style.color='#558BCF';};
  const handleBestMouseOut2 = (e) => { e.target.style.color= bestSlideIndex === totalSlides - slidesToShow ? 'gray' : 'black';};
  
  const recentIconStyle = {height:'1rem', width:'1rem', color:recentSlideIndex === 0 ? 'gray' : 'black', cursor: 'pointer'};
  const handleRecentMouseOver = (e) => { if (recentSlideIndex !== 0) e.target.style.color='#558BCF';};
  const handleRecentMouseOut = (e) => { e.target.style.color= recentSlideIndex === 0 ? 'gray' : 'black';};
  
  const handleRecentMouseOver2 = (e) => { if (recentSlideIndex !== totalSlides - slidesToShow) e.target.style.color='#558BCF';};
  const handleRecentMouseOut2 = (e) => { e.target.style.color= recentSlideIndex === totalSlides - slidesToShow ? 'gray' : 'black';};
  
  const randomIconStyle = {height:'1rem', width:'1rem', color:randomSlideIndex === 0 ? 'gray' : 'black', cursor: 'pointer'};
  const handleRandomMouseOver = (e) => { if (randomSlideIndex !== 0) e.target.style.color='#558BCF';};
  const handleRandomMouseOut = (e) => { e.target.style.color= randomSlideIndex === 0 ? 'gray' : 'black';};
  
  const handleRandomMouseOver2 = (e) => { if (randomSlideIndex !== totalSlides - slidesToShow) e.target.style.color='#558BCF';};
  const handleRandomMouseOut2 = (e) => { e.target.style.color= randomSlideIndex === totalSlides - slidesToShow ? 'gray' : 'black';};
  

  const images = [
    '/images/Banner1.png',
    '/images/Banner2.png',
    '/images/Banner3.png',
  ];

  return (
    console.log(bestContents[0]),
    <div>
      <Hidden lgUp>
       <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', width: '100%'}}>
          <CoTypography size="MainTitle" style={{ marginTop:'1rem', marginBottom:'0.5rem'}}>실시간 인기 강의👍</CoTypography>
          <CoTypography size="Title" style={{ display:'flex', alignItems:'center', marginBottom:'5px', marginTop:'2rem'}}>
          <ArrowBackIosNewIcon style={bestIconStyle} onClick={handleBestPrevsmall} onMouseOver={handleBestMouseOver} onMouseOut={handleBestMouseOut}/>
          <ArrowForwardIosIcon style={{height:'1rem', marginTop: 0, color: bestSlideIndex === totalSlides - slidesToShow ? 'gray' : 'black', cursor: 'pointer'}} onClick={handleBestNextsmall} onMouseOver={handleBestMouseOver2} onMouseOut={handleBestMouseOut2}/>            
          <Link to="/list" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box component="span" sx={{'&:hover': {color: '#558BCF'}}}>더보기+</Box>
            </Link>          
          </CoTypography>
        </div>
        </Hidden>
      <Hidden lgDown>
       <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', width: '100%'}}>
          <CoTypography size="MainTitle" style={{ marginTop:'1rem', marginBottom:'0.5rem'}}>실시간 인기 강의👍</CoTypography>
          <CoTypography size="Title" style={{ display:'flex', alignItems:'center', marginBottom:'5px', marginTop:'2rem'}}>
          <ArrowBackIosNewIcon style={bestIconStyle} onClick={handleBestPrev} onMouseOver={handleBestMouseOver} onMouseOut={handleBestMouseOut}/>
          <ArrowForwardIosIcon style={{height:'1rem', marginTop: 0, color: bestSlideIndex === totalSlides - slidesToShow ? 'gray' : 'black', cursor: 'pointer'}} onClick={handleBestNext} onMouseOver={handleBestMouseOver2} onMouseOut={handleBestMouseOut2}/>            
          <Link to="/list" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box component="span" sx={{'&:hover': {color: '#558BCF'}}}>더보기+</Box>
            </Link>          
          </CoTypography>
        </div>
        </Hidden>
        <Grid item sx={{display:'-webkit-box', overflow: 'hidden'}}>
        <Hidden lgUp>
                {bestContents.map((item, index) => (
                parseInt(index / 1) === bestSlideIndex ? (
                    <ContentsCard
                        key={index}
                        category={item[3]}
                        contentsId={item[0]}
                        contentsTitle={item[1]}
                        memberId={item[6]}
                        price={item[5]}
                        thumbnail={item[2]}
                        index={index}
                        reviewRating={item[8]}
                        reviewCount={item[7]}
                        booked={false}
                    />
                ) : (
                    <div key={index} style={{ display: 'none' }} />
                )
            ))}
          </Hidden>
          <Hidden lgDown>
          {bestContents.map((item, index) => {

           return parseInt(index / 4) * 4 === bestSlideIndex ?
            
           <ContentsCard
           key={index}
           category={item[3]}
            contentsId={item[0]}
            contentsTitle={item[1]}
            userNickname={item[6]}
            price={item[5]}
            thumbnail={item[2]}
            index={index}
            reviewRating={item[8]}
            reviewCount={item[7]}
           booked={false} paperstyle={index >= 3 && (index % 4 === 3) ? {marginRight: 0} : {}} />

            :
            <ContentsCard key={index} {...item} sx={{display:'none'}} />
      })}
      </Hidden>
        </Grid>
        <Carousel show={1} slide={1} swiping={true} style={{width:'100%'}}
        rightArrow={
          <IconButton style={{backgroundColor: 'white', width: '30px', height: '30px' , position: 'absolute', top: '7.5rem', right: '-0.9rem', transform: 'translateY(-50%)', zIndex: 2, color:'black'}} onMouseOver={(e) => {e.target.style.color='#558BCF';}} onMouseOut={(e) => {e.target.style.color='black';}}>
            <ArrowForwardIcon style={{fontSize: '1.55rem'}}/>
          </IconButton>
        } 
        leftArrow={
          <IconButton style={{backgroundColor: 'white', width: '30px', height: '30px' , position: 'absolute', top: '7.5rem', left: '-0.9rem', transform: 'translateY(-50%)', zIndex: 2, color:'black'}} onMouseOver={(e) => {e.target.style.color='#558BCF';}} onMouseOut={(e) => {e.target.style.color='black';}}>
            <ArrowBackIcon style={{fontSize: '1.5rem'}}/>
          </IconButton>}>
        {images.map((image, index) => (
          <Paper key={index} elevation={3} style={{marginTop: '1.25rem', height: 200, width: 1300, overflow: 'hidden' }}>
            <img src={image} alt={`slide-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Paper>
        ))}
	      </Carousel>
        <Hidden lgUp>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', width: '100%'}}>
          <CoTypography size="MainTitle" style={{marginTop:'1rem', marginBottom:'0.5rem'}}>최근 등록된 강의🖥️</CoTypography>
          <CoTypography size="Title" style={{ display:'flex', alignItems:'center', marginBottom:'5px', margintop:'2rem'}}>
          <ArrowBackIosNewIcon style={recentIconStyle} onClick={handleRecentPrevsmall} onMouseOver={handleRecentMouseOver} onMouseOut={handleRecentMouseOut}/>
          <ArrowForwardIosIcon style={{height:'1rem', marginTop: 0, color: recentSlideIndex === totalSlides - slidesToShow ? 'gray' : 'black', cursor: 'pointer'}} onClick={handleRecentNextsmall} onMouseOver={handleRecentMouseOver2} onMouseOut={handleRecentMouseOut2}/> 
            <Link to="/list" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box component="span" sx={{'&:hover': {color: '#558BCF'}}}>더보기+</Box>
            </Link>
          </CoTypography>
        </div>
        </Hidden>
        <Hidden lgDown>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', width: '100%'}}>
          <CoTypography size="MainTitle" style={{marginTop:'1rem', marginBottom:'0.5rem'}}>최근 등록된 강의🖥️</CoTypography>
          <CoTypography size="Title" style={{ display:'flex', alignItems:'center', marginBottom:'5px', margintop:'2rem'}}>
          <ArrowBackIosNewIcon style={recentIconStyle} onClick={handleRecentPrev} onMouseOver={handleRecentMouseOver} onMouseOut={handleRecentMouseOut}/>
          <ArrowForwardIosIcon style={{height:'1rem', marginTop: 0, color: recentSlideIndex === totalSlides - slidesToShow ? 'gray' : 'black', cursor: 'pointer'}} onClick={handleRecentNext} onMouseOver={handleRecentMouseOver2} onMouseOut={handleRecentMouseOut2}/> 
            <Link to="/list" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box component="span" sx={{'&:hover': {color: '#558BCF'}}}>더보기+</Box>
            </Link>
          </CoTypography>
        </div>
        </Hidden>
        <Grid item sx={{display:'-webkit-box', overflow: 'hidden'}}>
        <Hidden lgUp>
             {recentContents.map((item, index) => (
                parseInt(index / 1) === recentSlideIndex ? (
                    <ContentsCard
                        key={index}
                        category={item[3]}
                        contentsId={item[0]}
                        contentsTitle={item[1]}
                        memberId={item[6]}
                        price={item[5]}
                        thumbnail={item[2]}
                        index={index}
                        reviewRating={item[8]}
                        reviewCount={item[7]}
                        booked={false}
                    />
                ) : (
                    <div key={index} style={{ display: 'none' }} />
                )
          ))}
          </Hidden>
          <Hidden lgDown>
              {recentContents.map((item, index) => {

              return parseInt(index / 4) * 4 === recentSlideIndex ?
        
              <ContentsCard
              key={index}
              category={item[3]}
              contentsId={item[0]}
              contentsTitle={item[1]}
              memberId={item[6]}
              price={item[5]}
              thumbnail={item[2]}
              index={index}
              reviewRating={item[8]}
              reviewCount={item[7]}
              booked={false} paperstyle={index >= 3 && (index % 4 === 3) ? {marginRight: 0} : {}} />
                    :

              <ContentsCard key={index} {...item} sx={{display:'none'}} />
          })}
          </Hidden>
        </Grid>
          <Grid container spacing={2} style={{marginTop:'0.725rem'}}>
        <Hidden lgDown>
            <Grid item xs={12} lg={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '20rem' }}>
                <CoTypography style={{fontSize:'3rem'}}>NC4 ALL을 통해 연결되는 IT, &nbsp;&nbsp;당신의 열정을 응원합니다.</CoTypography>
                <CoTypography>학교에서 배우기 어렵거나 큰 비용을 지불해야만 배울 수 있는 전문적인 지식들을 제공합니다.
                오픈 플랫폼의 이점을 통해 다양성과 경제성을 모두 높입니다.</CoTypography>
            </Grid>
        </Hidden>
    <Grid item xs={12} lg={6}>
        <Box sx={{ 
            width: '100%', 
            height: '20rem', 
            overflow: 'auto',
            '&::-webkit-scrollbar': {
                display: 'none'
            },
            'msoverflowstyle': 'none',
            'scrollbarwidth': 'none',
        }}>
            {recentComments.map((comment, index) => (
              
                <Paper key={index} elevation={3} style={{ width: '100%', height: '6.25rem', margin: '0.5rem 0', marginBottom: '1rem' }}>
              <CoTypography size="Tag">{comment[2]} 님 ({comment[1] === "ADMIN" ? "관리자" :
                                                        comment[1] === "USER" ? "수강생" :
                                                        comment[1] === "TEACHER" ? "강사" :
                                                        comment[1] === "RESIGNED" ? "탈퇴 회원" :
                                                        comment[1] === "BLACKLIST" ? "블랙" :
                                                        comment[1] === "PRETEACHER" ? "강사 신청" : "null"}) 
                                                        {comment[4]}</CoTypography>
                                                        <CoTypography>{comment[0]}</CoTypography>
                    <CoTypography size="Tag">{comment[3]}</CoTypography>
                </Paper>
            ))}
        </Box>
    </Grid>
</Grid>
        <Hidden lgUp>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', width: '100%'}}>
        <CoTypography size="MainTitle" style={{marginTop:'1rem', marginBottom:'0.5rem'}}>이런 강의는 어때요 ❓</CoTypography>
              <CoTypography size="Title" style={{ display:'flex', alignItems:'center', marginBottom:'5px', margintop:'2rem'}}>
          <ArrowBackIosNewIcon style={randomIconStyle} onClick={handleRandomPrevsmall} onMouseOver={handleRandomMouseOver} onMouseOut={handleRandomMouseOut}/>
          <ArrowForwardIosIcon style={{height:'1rem', marginTop: 0, color: randomSlideIndex === totalSlides - slidesToShow ? 'gray' : 'black', cursor: 'pointer'}} onClick={handleRandomNextsmall} onMouseOver={handleRandomMouseOver2} onMouseOut={handleRandomMouseOut2}/> 
            <Link to="/list" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box component="span" sx={{'&:hover': {color: '#558BCF'}}}>더보기+</Box>
            </Link>
          </CoTypography>
        </div>
        </Hidden>
        <Hidden lgDown>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', width: '100%'}}>
        <CoTypography size="MainTitle" style={{marginTop:'1rem', marginBottom:'0.5rem'}}>이런 강의는 어때요 ❓</CoTypography>
              <CoTypography size="Title" style={{ display:'flex', alignItems:'center', marginBottom:'5px', margintop:'2rem'}}>
          <ArrowBackIosNewIcon style={randomIconStyle} onClick={handleRandomPrev} onMouseOver={handleRandomMouseOver} onMouseOut={handleRandomMouseOut}/>
          <ArrowForwardIosIcon style={{height:'1rem', marginTop: 0, color: randomSlideIndex === totalSlides - slidesToShow ? 'gray' : 'black', cursor: 'pointer'}} onClick={handleRandomNext} onMouseOver={handleRandomMouseOver2} onMouseOut={handleRandomMouseOut2}/> 
            <Link to="/list" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box component="span" sx={{'&:hover': {color: '#558BCF'}}}>더보기+</Box>
            </Link>
          </CoTypography>
        </div>
        </Hidden>
        <Grid item sx={{display:'-webkit-box', overflow: 'hidden'}}>
          <Hidden lgUp>
          {randomContents.map((item, index) => (
                parseInt(index / 1) === randomSlideIndex ? (
                    <ContentsCard
                        key={index}
                        category={item[3]}
                        contentsId={item[0]}
                        contentsTitle={item[1]}
                        memberId={item[6]}
                        price={item[5]}
                        thumbnail={item[2]}
                        index={index}
                        reviewRating={item[8]}
                        reviewCount={item[7]}
                        booked={false}
                    />
                ) : (
                    <div key={index} style={{ display: 'none' }} />
                )
            ))}
          </Hidden>
        <Hidden lgDown>
        {randomContents.map((item, index) => {

        return parseInt(index / 4) * 4 === randomSlideIndex ?

        <ContentsCard
        key={index}
        category={item[3]}
        contentsId={item[0]}
        contentsTitle={item[1]}
        memberId={item[6]}
        price={item[5]}
        thumbnail={item[2]}
        index={index}
        reviewRating={item[8]}
        reviewCount={item[7]}
        booked={false} paperstyle={index >= 3 && (index % 4 === 3) ? {marginRight: 0} : {}} />
              :

        <ContentsCard key={index} {...item} sx={{display:'none'}} />
        })}
        </Hidden>
                </Grid>
            </div>
          );
        };

export default Home;