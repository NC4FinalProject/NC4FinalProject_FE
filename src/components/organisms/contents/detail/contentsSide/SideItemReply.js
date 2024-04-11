import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react'
import { Link } from "react-router-dom";



const BoxContainerStyle = styled(Grid)(({ theme }) => ({
  display: "flex",
}));

const SideItemReply = (props) => {
  
  const theme = useTheme();

  return (
    <BoxContainerStyle container sx={{ paddingLeft: 0.1, paddingY: 0.9 }}>
      
      <Grid item xs={1.7} sx={{paddingX: 0.5}}>
        <Link to="/" component={Link} underline="hover" color="inherit">
          <Avatar 
            src={props.userprofile} 
            alt={props.title} 
            sx={{
              width: theme => theme.spacing(3.5),
              height: theme => theme.spacing(3.5),
            }} 
          />
        </Link>
      </Grid>
      
      <Grid item xs={10.3} sx={{ alignContent: 'flex-start'}}>
        <Typography style={{ color: "#A4A4A4" }} sx={{ fontSize: '0.8rem', lineHeight: '1.0' }}>
          {props.userName}
          {/* {props.postingTime} */}
          {/* <Divider sx={{ width: '100%' }} /> */}
        </Typography>
        {/* <Grid sx={{flexGrow: 1, overflowY: 'auto',  borderBottom: `1px solid ${theme.palette.divider}`}}></Grid> */}
        <Typography style={{ color: "#2E2E2E" }} sx={{ fontSize: '0.9rem', lineHeight: '1.2' }} variant="caption" >
          {props.content}

          {/* <Divider sx={{ width: '35%' }} /> */}

          {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Divider sx={{ width: '100%' }} />
          </Box> */}
        </Typography>
      </Grid>


    </BoxContainerStyle>
  );
};

export default SideItemReply;
