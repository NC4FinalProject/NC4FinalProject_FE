import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react'
import { Link } from "react-router-dom";



const BoxContainerStyle = styled(Grid)(({ theme }) => ({
  display: "flex",
  
}));

const SideMultiItemReply = (props) => {
  const theme = useTheme();
  return (
    <BoxContainerStyle container sx={{ paddingLeft: 0.1, paddingY: 0.4 }}>
      
      <Grid item sx={{paddingX: 0.5}}>
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

      <Grid item xs={10} >
        <Box sx={{ paddingLeft: 0.7}}>
          <Typography style={{ color: "#A4A4A4" }} sx={{ fontSize: '0.75rem' }}>
            {props.title} | {props.postingTime}
            {/* <Divider sx={{ width: '100%' }} /> */}
          </Typography>
          {/* <Grid sx={{flexGrow: 1, overflowY: 'auto',  borderBottom: `1px solid ${theme.palette.divider}`}}></Grid> */}
          
          <Typography style={{ color: "#2E2E2E" }} sx={{ fontSize: '0.85rem', lineHeight: '1.2' }} variant="caption" component="p">
            {props.subtitle}

            {/* <Divider sx={{ width: '35%' }} /> */}

            {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <Divider sx={{ width: '100%' }} />
            </Box> */}

          </Typography>
          
        </Box>
      </Grid>

    </BoxContainerStyle>
  );
};

export default SideMultiItemReply;
