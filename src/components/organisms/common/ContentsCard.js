import React, { useState }  from 'react'
import { Box, Paper } from '@mui/material'
import Rating from '@mui/material/Rating'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { useNavigate } from "react-router-dom";
import CoTypography from '../../atoms/common/CoTypography'

function ContentsCard({ img, title, author, rating, reviews, paperstyle, id, booked, category, sx }) {

  const navi = useNavigate();
  const [Localbooked, setBooked] = useState(booked);

  const goDetail = (id) => {
    return () => {
      navi(`/detail/${id}`);
    };
  };

  const changeBooked = (Localbooked) => {
      Localbooked = !Localbooked;
      setBooked(Localbooked);
  };

  return (
    <Box sx={sx}>
      <Paper elevation={1} style={{width:'19.1875rem', height:'11.875rem',  borderRadius: '0.5rem',marginTop:'1.5rem' , marginRight:'1.5rem', position:'relative',...paperstyle}}>
        <Box onClick={goDetail(id)} sx={{ cursor: 'pointer' }} >
          <img src={img} alt='teacher' style={{width: '19.1875rem', height: '11.875rem', objectFit: 'cover',  borderRadius: '0.25rem'}} />
        </Box>
        { Localbooked === true ? (
          <Box onClick={() => changeBooked(Localbooked)}>
            <BookmarkIcon sx={{ cursor: 'pointer' }} style={{position: 'absolute', top: '5px', right:'5px', color: '#FFD400'}} />
          </Box>
         ) : (
          <Box onClick={() => changeBooked(Localbooked)}>
            <BookmarkBorderIcon sx={{ cursor: 'pointer' }} style={{position: 'absolute', top: '5px', right:'5px'}} />
          </Box>
          )}
        
      </Paper>

      <Box onClick={goDetail(id)}>
      <CoTypography sx={{ cursor: 'pointer' }} style={{marginTop:'5px',width:'19.1875rem'}}>{title}</CoTypography>
      </Box>
      <CoTypography size="Content" style={{color:'#7d7d7d',width:'19.1875rem'}}>{category} | {author}</CoTypography>

      <div style={{display: 'flex', alignItems: 'center',width:'19.1875rem'}}>
        <Rating name="read-only" value={rating} readOnly style={{fontSize: '1rem'}} />
        <CoTypography size="Tag">({reviews})</CoTypography>
      </div>
    </Box>
  );
}

export default ContentsCard;