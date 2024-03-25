import styled from '@emotion/styled';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import React from 'react'
import { Link } from "react-router-dom";
import CoTypography from '../../../../atoms/common/CoTypography';


const BoxContainerStyle = styled(Box)(({ theme }) => ({
  display: "flex",

  // "& .MuiAvatar-root": {
  //   borderRadius: theme.spacing(1),
  //   marginTop: theme.spacing(0.75),
  // },
  // "& h3": {
  //   fontWeight: 500,
  // },
  // "& .MuiTypography-caption": 
  //   color: theme.palette.text.secondary,
  // },
  // "& .MuiTypography-body2": {
  //   backgroundColor: theme.palette.gray.lighter,
  //   color: theme.palette.gray.main,
  //   fontWeight: 500,
  //   lineHeight: 1,
  //   display: "inline-block",
  //   borderRadius: 25,
  //   padding: "4px 6px",
  // },
}));

const ReplyItem = (props) => {
  return (
    <BoxContainerStyle sx={{ my: 0.5 }}>
      <Grid container >
        <Grid item xs={2}>
          <Link to="/" component={Link} underline="hover" color="inherit">
            <Avatar 
              src={props.photo} 
              alt={props.title} 
              sx={{
                width: theme => theme.spacing(3.5),
                height: theme => theme.spacing(3.5),
              }} 
            />
          </Link>
        </Grid>
        
        <Grid item xs={10}>
          <Box sx={{ px: 1 }}>
            
            <Typography sx={{ fontSize: '0.75rem' }}>
              {props.title} | {props.postingTime}
            </Typography>
            
            <Typography sx={{ fontSize: '0.85rem' }} variant="caption" component="p">
              {props.subtitle}
            </Typography>
            
          </Box>
        </Grid>
      </Grid>

    </BoxContainerStyle>
  );
};

export default ReplyItem;
