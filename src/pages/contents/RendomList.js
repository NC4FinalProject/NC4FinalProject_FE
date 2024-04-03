import React, { useEffect } from 'react'
import { Box, Pagination,  } from '@mui/material'
import CoTypography from '../../components/atoms/common/CoTypography'
import ContentsCard from '../../components/organisms/common/ContentsCard'

const BestList = () => {
  const lectures = [
    { img: '/images/teacher.jpg', title: '프론트 리액트 1시간만에 마스터하기', author: '프론트앤드 | 손우성', rating: 4, reviews: 300 },
    { img: '/images/teacher.jpg', title: '프론트 리액트 1시간만에 마스터하기', author: '프론트앤드 | 손우성', rating: 4, reviews: 300 },
    { img: '/images/teacher.jpg', title: '프론트 리액트 1시간만에 마스터하기', author: '프론트앤드 | 손우성', rating: 4, reviews: 300 },
    { img: '/images/teacher.jpg', title: '프론트 리액트 1시간만에 마스터하기', author: '프론트앤드 | 손우성', rating: 4, reviews: 300 },
    { img: '/images/teacher.jpg', title: '프론트 리액트 1시간만에 마스터하기', author: '프론트앤드 | 손우성', rating: 4, reviews: 300 },
    { img: '/images/teacher.jpg', title: '프론트 리액트 1시간만에 마스터하기', author: '프론트앤드 | 손우성', rating: 4, reviews: 300 },
    { img: '/images/teacher.jpg', title: '프론트 리액트 1시간만에 마스터하기', author: '프론트앤드 | 손우성', rating: 4, reviews: 300 },
    { img: '/images/teacher.jpg', title: '프론트 리액트 1시간만에 마스터하기', author: '프론트앤드 | 손우성', rating: 4, reviews: 300 },
    { img: '/images/teacher.jpg', title: '프론트 리액트 1시간만에 마스터하기', author: '프론트앤드 | 손우성', rating: 4, reviews: 300 },
    { img: '/images/teacher.jpg', title: '프론트 리액트 1시간만에 마스터하기', author: '프론트앤드 | 손우성', rating: 4, reviews: 300 },
    { img: '/images/teacher.jpg', title: '프론트 리액트 1시간만에 마스터하기', author: '프론트앤드 | 손우성', rating: 4, reviews: 300 },
    { img: '/images/teacher.jpg', title: '프론트 리액트 1시간만에 마스터하기', author: '프론트앤드 | 손우성', rating: 4, reviews: 300 },
    { img: '/images/teacher.jpg', title: '프론트 리액트 1시간만에 마스터하기', author: '프론트앤드 | 손우성', rating: 4, reviews: 300 },
    { img: '/images/teacher.jpg', title: '프론트 리액트 1시간만에 마스터하기', author: '프론트앤드 | 손우성', rating: 4, reviews: 300 },
    { img: '/images/teacher.jpg', title: '프론트 리액트 1시간만에 마스터하기', author: '프론트앤드 | 손우성', rating: 4, reviews: 300 },
    { img: '/images/teacher.jpg', title: '프론트 리액트 1시간만에 마스터하기', author: '프론트앤드 | 손우성', rating: 4, reviews: 300 },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box>
        <CoTypography size="MainTitle" style={{marginTop:'1rem', marginBottom:'0.5rem'}}>이런 강의는 어때요 ❓</CoTypography>
    <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
      {lectures.map((lecture, index) => (
  <ContentsCard key={index} {...lecture} paperstyle={index >= 3 && (index % 4 === 3) ? {marginRight: 0} : {}}/>
      ))}
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3}}>
          <Pagination count={10} color="primary" />
     </Box>
    </Box>
  );
}

export default BestList;