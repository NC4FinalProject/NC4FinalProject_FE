import styled from '@emotion/styled';
import { Box, Toolbar } from '@mui/material';
import React from 'react';



const FooterStyle = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#D3D3D3",
  // color: "#D3D3D3",
}));

const Footer = () => {
  return (
    <FooterStyle>
      <Box>
        푸우우우우우터
      </Box>
    </FooterStyle>

  );
};

export default Footer;