import React from 'react'
import { Box, Grid, Paper } from '@mui/material'
import Rating from '@mui/material/Rating'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import CoTypography from '../../atoms/common/CoTypography'

function ContentsCard({ img, title, author, rating, reviews,paperstyle }) {
  return (
    <Box>
      
      <Paper elevation={1} style={{width:'19.1875rem', height:'11.875rem',  borderRadius: '0.5rem',marginTop:'1.5rem' , marginRight:'1.5rem', position:'relative',...paperstyle}}>
        <img src={img} alt='teacher' style={{width: '19.1875rem', height: '100%', objectFit: 'cover',  borderRadius: '0.25rem'}} />
        <BookmarkBorderIcon style={{position: 'absolute', top: '5px', right:'5px'}} />
      </Paper>

      <CoTypography style={{marginTop:'5px',width:'19.1875rem'}}>{title}</CoTypography>
      <CoTypography size="Content" style={{color:'#7d7d7d',width:'19.1875rem'}}>{author}</CoTypography>

      <div style={{display: 'flex', alignItems: 'center',width:'19.1875rem'}}>
        <Rating name="read-only" value={rating} readOnly style={{fontSize: '1rem'}} />
        <CoTypography size="Tag">({reviews})</CoTypography>
      </div>
      
    </Box>
  );
}

export default ContentsCard;