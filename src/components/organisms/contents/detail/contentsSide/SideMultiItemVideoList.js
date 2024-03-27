import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Avatar, Box, Card, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react'
import { Link } from "react-router-dom";



const BoxContainerStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  
}));

const SideMultiItemVideoList = (props) => {
  const theme = useTheme();
  return (
    <BoxContainerStyle container sx={{ paddingLeft: 0.1, paddingY: 0.7, ':hover': {backgroundColor: theme => theme.palette.action.selected, cursor: 'pointer'}, }} >
      <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{color:"#585858"}}variant='caption' paddingX={0.5}>{props.count +1}</Typography>
      </Grid>
      <Grid item >
        <Link to="/" component={Link} underline="hover" color="inherit">
          <CardMedia
            component="img"
            image={props.thumbnail} 
            alt={props.title}
            sx={{
              // width: '100%', 
              // height: '100%',
              width: theme => theme.spacing(5.5),
              height: theme => theme.spacing(5.5),
              borderRadius: '0.4rem'
              // borderRadius: '8px'
            }} />
        </Link>
      </Grid>
        
      <Grid container item xs={10} direction="column" paddingX={0.5} >
        
        <Grid sx={{ 
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal', }}>
          
          {/* 내용 */}
          <Typography sx={{ fontSize: '0.85rem', lineHeight: '1.15' }} component="p">
            {props.title}
          </Typography>
        </Grid>
        
        {/* 타임 */}
        <Grid>
          <Typography sx={{ color: "#A4A4A4", fontSize: '0.7rem', lineHeight: '1.10' }} component="p">
            {props.videoTime}
          </Typography>
        </Grid>
        
      </Grid>

    </BoxContainerStyle>
  );
};

export default SideMultiItemVideoList;
