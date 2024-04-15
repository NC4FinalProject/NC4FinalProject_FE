import React, { useState } from 'react';
import { Grid, Paper,Box } from '@mui/material';
import {  Link } from 'react-router-dom';
import { Carousel } from '@trendyol-js/react-carousel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CoTypography from '../../components/atoms/common/CoTypography';
import ContentsCard from '../../components/organisms/common/ContentsCard';

const Home = () => {

  
  const [slideIndex, setSlideIndex] = useState(0);
  const slidesToShow = 4;
  const totalSlides = 12;
  
  
  const handlePrev = () => {
    setSlideIndex((prev) => (prev > 0 ? prev - slidesToShow : prev));
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev < totalSlides - slidesToShow ? prev + slidesToShow : prev));
  };

  const iconStyle = {height:'1rem', width:'1rem', color:slideIndex === 0 ? 'gray' : 'black', cursor: 'pointer'};
  const handleMouseOver = (e) => { if (slideIndex !== 0) e.target.style.color='#558BCF';};
  const handleMouseOut = (e) => { e.target.style.color= slideIndex === 0 ? 'gray' : 'black';};

  const handleMouseOver2 = (e) => { if (slideIndex !== totalSlides - slidesToShow) e.target.style.color='#558BCF';};
  const handleMouseOut2 = (e) => { e.target.style.color= slideIndex === totalSlides - slidesToShow ? 'gray' : 'black';};

  const lectures = [
    { id: 1, title: '국민 내일 배움카드', category: '국비교육', author: '손우성', rating: 4, reviews: 300, booked: true, img: 'https://greenart.co.kr/upimage/comm/20240227134333.webp' },
    { id: 2, title: '프론트 자바스크립 1시간만에 마스터하기', category: '퍼블리셔', author: '정재호', rating: 4, reviews: 300, booked: true, img: 'https://www.bitcamp.co.kr/data/file/class/thumb-3731540291_fd46qzJH_7b2d735a24874b5aed27d7731e797a505be5c2e4_380x200.png' },
    { id: 3, title: '프론트 뷰 1시간만에 마스터하기', category: '프론트앤드', author: '김시원', rating: 4, reviews: 300, booked: true, img: 'https://www.bitcamp.co.kr/data/file/class/thumb-3731540291_3ksrC6ZO_3cbfbf024380892ff95d9f3d9a0dbba8c28d62c3_380x200.png'},
    { id: 4, title: '자바스프링 1시간만에 마스터하기', category: '백엔드', author: '이무호', rating: 4, reviews: 300, booked: true, img: 'https://cdn.inflearn.com/public/courses/333218/cover/14d95c81-9cbf-4281-8faa-23e2a552279a/333218.jpg'},
    { id: 5, title: '[N캠프] 클라우드 기반 웹 개발자 & 데브옵스 과정_13기', category: '국비과정', author: '손무성', rating: 4, reviews: 300, booked: true, img: 'https://cdn.inflearn.com/public/courses/326485/cover/830bce1a-023d-45ff-a0d1-883bc9074b9a/326485-eng.png'},
    { id: 6, title: '한입 크기로 잘라 먹는 리액트(React.js) : 기초부터 실전까지', category: '프론트엔드', author: '정시호', rating: 4, reviews: 300, booked: true, img: 'https://cdn.inflearn.com/public/courses/332506/cover/c58f00a0-181d-4b2e-a058-6c98a7dca47a/332506-eng.png'},
    { id: 7, title: '프로그래밍 시작하기:웹 입문(Inflearn Original)', category: '무료 강의', author: '김우원', rating: 4, reviews: 300, booked: true, img: 'https://cdn.inflearn.com/public/courses/328340/cover/13465c65-a83b-4bc1-82b3-71832345759d/328340-eng.png'},
    { id: 8, title: '프론트 리액트 1시간만에 마스터하기', category: '국비교육', author: '정우원', rating: 4, reviews: 300, booked: true, img: 'https://www.bitcamp.co.kr/data/editor/2402/thumb-20240215153249_919f4464e3ef68c659bf087dbeb188af_r69m_600x600.png' }
  ];

  const images = [
    '/images/slider1.png',
    '/images/slider2.png',
    '/images/slider1.png',
    '/images/slider2.png',
  ];

  return (
    <div>
       <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', width: '100%'}}>
          <CoTypography size="MainTitle" style={{ marginTop:'1rem', marginBottom:'0.5rem'}}>실시간 인기 강의👍</CoTypography>
          <CoTypography size="Title" style={{ display:'flex', alignItems:'center', marginBottom:'5px', marginTop:'2rem'}}>
          <ArrowBackIosNewIcon style={iconStyle} onClick={handlePrev} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}/>
          <ArrowForwardIosIcon style={{height:'1rem', marginTop: 0, color: slideIndex === totalSlides - slidesToShow ? 'gray' : 'black', cursor: 'pointer'}} onClick={handleNext} onMouseOver={handleMouseOver2} onMouseOut={handleMouseOut2}/>            
          <Link to="/BestList" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box component="span" sx={{'&:hover': {color: '#558BCF'}}}>더보기+</Box>
            </Link>          
          </CoTypography>
        </div>
        <Grid item sx={{display:'-webkit-box', overflow: 'hidden'}}>
          {lectures.map((item, index) => {

           return parseInt(index / 4) * 4 === slideIndex ?
            
           <ContentsCard key={index} {...item} paperstyle={index >= 3 && (index % 4 === 3) ? {marginRight: 0} : {}} />

            :
            <ContentsCard key={index} {...item} sx={{display:'none'}} />
      })}
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
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', width: '100%'}}>
          <CoTypography size="MainTitle" style={{marginTop:'1rem', marginBottom:'0.5rem'}}>최근 등록된 강의🖥️</CoTypography>
          <CoTypography size="Title" style={{ display:'flex', alignItems:'center', marginBottom:'5px', margintop:'2rem'}}>
          <ArrowBackIosNewIcon style={iconStyle} onClick={handlePrev} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}/>
          <ArrowForwardIosIcon style={{height:'1rem', marginTop: 0, color: slideIndex === totalSlides - slidesToShow ? 'gray' : 'black', cursor: 'pointer'}} onClick={handleNext} onMouseOver={handleMouseOver2} onMouseOut={handleMouseOut2}/> 
            <Link to="/recentlist" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box component="span" sx={{'&:hover': {color: '#558BCF'}}}>더보기+</Box>
            </Link>
          </CoTypography>
        </div>
        <Grid item sx={{display:'-webkit-box', overflow: 'hidden'}}>
          {lectures.map((item, index) => {

           return parseInt(index / 4) * 4 === slideIndex ?
            
           <ContentsCard key={index} {...item} paperstyle={index >= 3 && (index % 4 === 3) ? {marginRight: 0} : {}} />
            :

            <ContentsCard key={index} {...item} paperstyle={index >= 3 && (index % 4 === 3) ? {marginRight: 0} : {}} />
      })}
        </Grid>
        <Grid container spacing={2} style={{marginTop:'0.725rem'}}>
  <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '20rem' }}>
    <CoTypography style={{fontSize:'3rem'}}>NC4 ALL을 통해 연결되는 IT, &nbsp;&nbsp;당신의 열정을 응원합니다.</CoTypography>
    <CoTypography>학교에서 배우기 어렵거나 큰 비용을 지불해야만 배울 수 있는 전문적인 지식들을 제공합니다.
    오픈 플랫폼의 이점을 통해 다양성과 경제성을 모두 높입니다.</CoTypography>
  </Grid>
  <Grid item xs={6}>
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
      {[...Array(10)].map((_, index) => (
        <Paper key={index} elevation={3} style={{width: '40.0625rem', height: '6.25rem', margin: '0.5rem 0',marginBottom:'1rem'}}>
          <CoTypography size="Tag">손우성 님 (강사)  7분전</CoTypography>
          <CoTypography>프론트 리액트 1시간만에 마스터하기</CoTypography>
          <CoTypography size="Tag">여러분들의 열정을 응원합니다!</CoTypography>
        </Paper>
      ))}
    </Box>
    </Grid>
    </Grid>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', width: '100%'}}>
    <CoTypography size="MainTitle" style={{marginTop:'1rem', marginBottom:'0.5rem'}}>이런 강의는 어때요 ❓</CoTypography>
          <CoTypography size="Title" style={{ display:'flex', alignItems:'center', marginBottom:'5px', margintop:'2rem'}}>
          <ArrowBackIosNewIcon style={iconStyle} onClick={handlePrev} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}/>
          <ArrowForwardIosIcon style={{height:'1rem', marginTop: 0, color: slideIndex === totalSlides - slidesToShow ? 'gray' : 'black', cursor: 'pointer'}} onClick={handleNext} onMouseOver={handleMouseOver2} onMouseOut={handleMouseOut2}/> 
            <Link to="/randomlist" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box component="span" sx={{'&:hover': {color: '#558BCF'}}}>더보기+</Box>
            </Link>
          </CoTypography>
        </div>
        <Grid item sx={{display:'-webkit-box', overflow: 'hidden'}}>
          {lectures.map((item, index) => {

           return parseInt(index / 4) * 4 === slideIndex ?
            
           <div style={{display: 'block'}}>
           <ContentsCard key={index} {...item} paperstyle={index >= 3 && (index % 4 === 3) ? {marginRight: 0} : {}} />
           </div>
          //  <div style={{display: 'block'}}>
          //  <Paper elevation={1} style={{width:'19.1875rem', height:'11.875rem',  borderRadius: '0.5rem', marginRight:'1.5rem',position: 'relative'}}>
          //    <img src={item.img} alt='teacher' style={{width: '100%', height: '100%', objectFit: 'cover',  borderRadius: '0.25rem'}} />
          //    <BookmarkBorderIcon style={{position: 'absolute', top: '5px', right:'5px'}} />
          //  </Paper>
          //     <CoTypography style={{marginTop:'5px'}}>프론트 리액트 1시간만에 마스터하기</CoTypography>
          //     <CoTypography size="Content" style={{color:'#7d7d7d'}}>프론트앤드 | 손우성</CoTypography>
          //     <div style={{display: 'flex', alignItems: 'center'}}>
          //       <Rating name="read-only" value={4} readOnly style={{fontSize: '1rem'}} />
          //       <CoTypography size="Tag">(300)</CoTypography>
          //     </div>
          //   </div>
          
            :

            <ContentsCard key={index} {...item} paperstyle={index >= 3 && (index % 4 === 3) ? {marginRight: 0} : {}} />
            // <div key={index} style={{display: 'none', position: 'relative'}}>
            //   <Paper elevation={1} style={{width:'19.1875rem', height:'11.875rem',  borderRadius: '0.5rem', marginRight:'1.5rem'}}>
            //     <img src='/images/teacher.jpg' alt='teacher' style={{width: '100%', height: '100%', objectFit: 'cover',  borderRadius: '0.25rem'}} />
            //   </Paper>
            //   <CoTypography style={{marginTop:'5px'}}>프론트 리액트 1시간만에 마스터하기</CoTypography>
            //   <CoTypography size="Content" style={{color:'#7d7d7d'}}>프론트앤드 | 손우성</CoTypography>
            //   <div style={{display: 'flex', alignItems: 'center'}}>
            //     <Rating name="read-only" value={4} readOnly style={{fontSize: '1rem'}} />
            //     <CoTypography size="Tag">(300)</CoTypography>
            //   </div>
            // </div>
            
      })}
        </Grid>
    </div>
  );
};

export default Home;