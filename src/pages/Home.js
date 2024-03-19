import React, { useState } from 'react';
import { Button, Grid, Paper, Typography,Rating,Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Carousel } from '@trendyol-js/react-carousel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const Home = () => {
  const navigate = useNavigate();

  const [slideIndex, setSlideIndex] = useState(0);
  const slidesToShow = 4;
  const totalSlides = 12;

  const handlePrev = () => {
    setSlideIndex((prev) => (prev > 0 ? prev - slidesToShow : prev));
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev < totalSlides - slidesToShow ? prev + slidesToShow : prev));
  };

  const images = [
    '/images/slider1.png',
    '/images/slider2.png',
    '/images/slider1.png',
    '/images/slider2.png',
  ];

  return (
    <div>
      <Typography style={{fontSize:'1.5rem', marginTop:'0.75rem', fontFamily: 'Pretendard SemiBold', marginBottom:'0.5rem'}}>현재 인기강사🔥</Typography>
      <Grid spacing={1.5}>
        <Carousel show={5} slide={1} swiping={true} style={{width:'100%'}}
        rightArrow={
          <IconButton style={{backgroundColor: 'white', width: '30px', height: '30px' , position: 'absolute', top: '10rem', right: '-0.9rem', transform: 'translateY(-50%)', zIndex: 2}}>
            <ArrowForwardIcon style={{ color: 'black', fontSize: '1.55rem'}}/>
          </IconButton>
        } 
        leftArrow={
          <IconButton style={{backgroundColor: 'white', width: '30px', height: '30px' , position: 'absolute', top: '10rem', left: '-0.9rem', transform: 'translateY(-50%)', zIndex: 2}}>
            <ArrowBackIcon style={{ color: 'black', fontSize: '1.5rem'}}/>
          </IconButton>}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <Grid key={item}>
                <Paper elevation={3} style={{  height: '20.9375rem', width: '15.3125rem' , display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
                <div style={{position: 'absolute', bottom: '0', left: '0', width: '100%', height: '50%', background: 'linear-gradient(transparent, black)'}}></div>
                    <img src='/images/teacher.jpg' alt='teacher' style={{width: '15.3125rem', height: '100%', objectFit: 'cover'}} />
                    <Typography style={{position: 'absolute', bottom: '3.5rem', paddingLeft: '0.725rem', maxWidth: '14rem', color: 'white', fontFamily: 'Pretendard SemiBold'}}>&lt;비전공자였던 그가 최상단에 오르기까지&gt;</Typography>
                    <Button  variant="outlined" 
                        color="error" 
                        sx={{
                            fontFamily: 'Pretendard medium',
                            color: 'white', 
                            borderColor: 'white',
                            '&:hover': {
                                color: 'black',
                                backgroundColor: 'white',
                                borderColor: 'black',
                                fontWeight: 'bold'
                            },
                            position: 'absolute', 
                            bottom: '0.1rem', 
                            marginTop: '0rem', 
                            maxHeight:'2.3rem', 
                            marginLeft:'0.725rem', 
                            marginBottom:'0.725rem'
                        }}>강의 들으러 가기</Button>
                </Paper>
            </Grid>
          ))}
          </Carousel>
        </Grid>
        
        <Carousel show={1} slide={1} swiping={true} style={{width:'100%'}}
        rightArrow={
          <IconButton style={{backgroundColor: 'white', width: '30px', height: '30px' , position: 'absolute', top: '7.5rem', right: '-0.9rem', transform: 'translateY(-50%)', zIndex: 2}}>
            <ArrowForwardIcon style={{ color: 'black', fontSize: '1.55rem'}}/>
          </IconButton>
        } 
        leftArrow={
          <IconButton style={{backgroundColor: 'white', width: '30px', height: '30px' , position: 'absolute', top: '7.5rem', left: '-0.9rem', transform: 'translateY(-50%)', zIndex: 2}}>
            <ArrowBackIcon style={{ color: 'black', fontSize: '1.5rem'}}/>
          </IconButton>}>
        {images.map((image, index) => (
          <Paper key={index} elevation={3} style={{marginTop: '1.25rem', height: 200, width: 1300, overflow: 'hidden' }}>
            <img src={image} alt={`slide-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Paper>
        ))}
	      </Carousel>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', width: '100%'}}>
          <Typography style={{fontSize:'1.5rem', marginTop:'1rem', fontFamily: 'Pretendard SemiBold', margintop:'1rem', marginBottom:'0.5rem'}}>실시간 인기 강의</Typography>
          <Typography style={{fontSize:'1rem', display:'flex', alignItems:'center', marginBottom:'5px', margintop:'2rem'}}>
            <ArrowBackIosNewIcon style={{height:'1rem', width:'1rem', color: slideIndex === 0 ? 'gray' : 'black'}} onClick={handlePrev}/>
            <ArrowForwardIosIcon style={{height:'1rem', marginTop:'1px', color: slideIndex === totalSlides - slidesToShow ? 'gray' : 'black'}} onClick={handleNext}/>
            더보기+
          </Typography>
        </div>
        <Grid item sx={{display:'-webkit-box', overflow: 'hidden'}}>
          {[{img: "images/google_login.png"}, {img: "images/google_login.png"}, {img: "images/google_login.png"}, {img: "images/google_login.png"}, 
          {img: "images/kakao_login.png"}, {img: "images/kakao_login.png"}, {img: "images/kakao_login.png"}, {img: "images/kakao_login.png"},  {img: "images/teacher.jpg"}, {img: "images/teacher.jpg"}, {img: "images/teacher.jpg"}, {img: "images/teacher.jpg"}].map((item, index) => {

            console.log(index, parseInt(index / 4) * 4, slideIndex, parseInt(index / 4) * 4=== slideIndex);
           return parseInt(index / 4) * 4 === slideIndex ?
            
            <div style={{display: 'block'}}>
              <Paper elevation={1} style={{width:'19.1875rem', height:'11.875rem',  borderRadius: '0.5rem', marginRight:'1.5rem'}}>
                <img src={item.img} alt='teacher' style={{width: '100%', height: '100%', objectFit: 'cover',  borderRadius: '0.25rem'}} />
              </Paper>
              <Typography style={{fontSize:'1rem', marginTop:'5px'}}>프론트 리액트 1시간만에 마스터하기</Typography>
              <Typography style={{fontSize:'0.825rem', color:'#7d7d7d'}}>프론트앤드 | 손우성</Typography>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Rating name="read-only" value={4} readOnly style={{fontSize: '1rem'}} />
                <Typography style={{fontSize:'0.725rem', color:'#7d7d7d'}}>(300)</Typography>
              </div>
            </div>
          
            :
            <div style={{display: 'none'}}>
              <Paper elevation={1} style={{width:'19.1875rem', height:'11.875rem',  borderRadius: '0.5rem', marginRight:'1.5rem'}}>
                <img src='/images/teacher.jpg' alt='teacher' style={{width: '100%', height: '100%', objectFit: 'cover',  borderRadius: '0.25rem'}} />
              </Paper>
              <Typography style={{fontSize:'1rem', marginTop:'5px'}}>프론트 리액트 1시간만에 마스터하기</Typography>
              <Typography style={{fontSize:'0.825rem', color:'#7d7d7d'}}>프론트앤드 | 손우성</Typography>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Rating name="read-only" value={4} readOnly style={{fontSize: '1rem'}} />
                <Typography style={{fontSize:'0.725rem', color:'#7d7d7d'}}>(300)</Typography>
              </div>
            </div>
            
      })}
        </Grid>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', width: '100%'}}>
          <Typography style={{fontSize:'1.5rem', marginTop:'1rem', fontFamily: 'Pretendard SemiBold', margintop:'1rem', marginBottom:'0.5rem'}}>최근 등록된 강의</Typography>
          <Typography style={{fontSize:'1rem', display:'flex', alignItems:'center', marginBottom:'5px', margintop:'2rem'}}>
            <ArrowBackIosNewIcon style={{height:'1rem', width:'1rem', color: slideIndex === 0 ? 'gray' : 'black'}} onClick={handlePrev}/>
            <ArrowForwardIosIcon style={{height:'1rem', marginTop:'1px', color: slideIndex === totalSlides - slidesToShow ? 'gray' : 'black'}} onClick={handleNext}/>
            더보기+
          </Typography>
        </div>
        <Grid item sx={{display:'-webkit-box', overflow: 'hidden'}}>
          {[{img: "images/google_login.png"}, {img: "images/google_login.png"}, {img: "images/google_login.png"}, {img: "images/google_login.png"}, 
          {img: "images/kakao_login.png"}, {img: "images/kakao_login.png"}, {img: "images/kakao_login.png"}, {img: "images/kakao_login.png"},  {img: "images/teacher.jpg"}, {img: "images/teacher.jpg"}, {img: "images/teacher.jpg"}, {img: "images/teacher.jpg"}].map((item, index) => {

            console.log(index, parseInt(index / 4) * 4, slideIndex, parseInt(index / 4) * 4=== slideIndex);
           return parseInt(index / 4) * 4 === slideIndex ?
            
            <div style={{display: 'block'}}>
              <Paper elevation={1} style={{width:'19.1875rem', height:'11.875rem',  borderRadius: '0.5rem', marginRight:'1.5rem'}}>
                <img src={item.img} alt='teacher' style={{width: '100%', height: '100%', objectFit: 'cover',  borderRadius: '0.25rem'}} />
              </Paper>
              <Typography style={{fontSize:'1rem', marginTop:'5px'}}>프론트 리액트 1시간만에 마스터하기</Typography>
              <Typography style={{fontSize:'0.825rem', color:'#7d7d7d'}}>프론트앤드 | 손우성</Typography>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Rating name="read-only" value={4} readOnly style={{fontSize: '1rem'}} />
                <Typography style={{fontSize:'0.725rem', color:'#7d7d7d'}}>(300)</Typography>
              </div>
            </div>
          
            :
            <div style={{display: 'none'}}>
              <Paper elevation={1} style={{width:'19.1875rem', height:'11.875rem',  borderRadius: '0.5rem', marginRight:'1.5rem'}}>
                <img src='/images/teacher.jpg' alt='teacher' style={{width: '100%', height: '100%', objectFit: 'cover',  borderRadius: '0.25rem'}} />
              </Paper>
              <Typography style={{fontSize:'1rem', marginTop:'5px'}}>프론트 리액트 1시간만에 마스터하기</Typography>
              <Typography style={{fontSize:'0.825rem', color:'#7d7d7d'}}>프론트앤드 | 손우성</Typography>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Rating name="read-only" value={4} readOnly style={{fontSize: '1rem'}} />
                <Typography style={{fontSize:'0.725rem', color:'#7d7d7d'}}>(300)</Typography>
              </div>
            </div>
            
      })}
        </Grid>
        <Grid container spacing={2} style={{marginTop:'0.725rem'}}>
  <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '20rem' }}>
    <Typography variant="h4">NC4 FINAL을 통해 연결되는 IT, 당신의 열정을 응원합니다.</Typography>
    <Typography style={{fontSize:'1rem'}}>학교에서 배우기 어렵거나 큰 비용을 지불해야만 배울 수 있는 전문적인 지식들을 제공합니다.
    오픈 플랫폼의 이점을 통해 다양성과 경제성을 모두 높입니다.</Typography>
  </Grid>
  <Grid item xs={6}>
    <Box sx={{ 
      width: '100%', 
      height: '20rem', 
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
    }}>
      {[...Array(10)].map((_, index) => (
        <Paper elevation={3} style={{width: '40.0625rem', height: '6.25rem', margin: '0.5rem 0',marginBottom:'1rem'}}>
          <Typography style={{fontSize:'0.725rem'}}>손우성 님 (강사)  7분전</Typography>
          <Typography style={{fontSize:'1rem'}}>프론트 리액트 1시간만에 마스터하기</Typography>
          <Typography style={{fontSize:'0.725rem'}}>여러분들의 열정을 응원합니다!</Typography>
        </Paper>
      ))}
    </Box>
    </Grid>
    </Grid>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', width: '100%'}}>
          <Typography style={{fontSize:'1.5rem', marginTop:'1rem', fontFamily: 'Pretendard SemiBold', margintop:'1rem', marginBottom:'0.5rem'}}>이런 강의는 어때요?</Typography>
          <Typography style={{fontSize:'1rem', display:'flex', alignItems:'center', marginBottom:'5px', margintop:'2rem'}}>
            <ArrowBackIosNewIcon style={{height:'1rem', width:'1rem', color: slideIndex === 0 ? 'gray' : 'black'}} onClick={handlePrev}/>
            <ArrowForwardIosIcon style={{height:'1rem', marginTop:'1px', color: slideIndex === totalSlides - slidesToShow ? 'gray' : 'black'}} onClick={handleNext}/>
            더보기+
          </Typography>
        </div>
        <Grid item sx={{display:'-webkit-box', overflow: 'hidden'}}>
          {[{img: "images/google_login.png"}, {img: "images/google_login.png"}, {img: "images/google_login.png"}, {img: "images/google_login.png"}, 
          {img: "images/kakao_login.png"}, {img: "images/kakao_login.png"}, {img: "images/kakao_login.png"}, {img: "images/kakao_login.png"},  {img: "images/teacher.jpg"}, {img: "images/teacher.jpg"}, {img: "images/teacher.jpg"}, {img: "images/teacher.jpg"}].map((item, index) => {

            console.log(index, parseInt(index / 4) * 4, slideIndex, parseInt(index / 4) * 4=== slideIndex);
           return parseInt(index / 4) * 4 === slideIndex ?
            
            <div style={{display: 'block'}}>
              <Paper elevation={1} style={{width:'19.1875rem', height:'11.875rem',  borderRadius: '0.5rem', marginRight:'1.5rem'}}>
                <img src={item.img} alt='teacher' style={{width: '100%', height: '100%', objectFit: 'cover',  borderRadius: '0.25rem'}} />
              </Paper>
              <Typography style={{fontSize:'1rem', marginTop:'5px'}}>프론트 리액트 1시간만에 마스터하기</Typography>
              <Typography style={{fontSize:'0.825rem', color:'#7d7d7d'}}>프론트앤드 | 손우성</Typography>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Rating name="read-only" value={4} readOnly style={{fontSize: '1rem'}} />
                <Typography style={{fontSize:'0.725rem', color:'#7d7d7d'}}>(300)</Typography>
              </div>
            </div>
          
            :
            <div style={{display: 'none'}}>
              <Paper elevation={1} style={{width:'19.1875rem', height:'11.875rem',  borderRadius: '0.5rem', marginRight:'1.5rem'}}>
                <img src='/images/teacher.jpg' alt='teacher' style={{width: '100%', height: '100%', objectFit: 'cover',  borderRadius: '0.25rem'}} />
              </Paper>
              <Typography style={{fontSize:'1rem', marginTop:'5px'}}>프론트 리액트 1시간만에 마스터하기</Typography>
              <Typography style={{fontSize:'0.825rem', color:'#7d7d7d'}}>프론트앤드 | 손우성</Typography>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Rating name="read-only" value={4} readOnly style={{fontSize: '1rem'}} />
                <Typography style={{fontSize:'0.725rem', color:'#7d7d7d'}}>(300)</Typography>
              </div>
            </div>
            
      })}
        </Grid>
      <Button variant="contained" color="primary" onClick={() => navigate('/board')} style={{marginBottom:'3rem'}}>
        Go to Board
      </Button>
    </div>
  );
};

export default Home;