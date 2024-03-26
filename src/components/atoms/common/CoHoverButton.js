import React from 'react';
import Button from '@mui/material/Button';
import CoTypography from './CoTypography';

const CoHoverButton = ({ onClick, children, style}) => (
  <Button 
    onMouseOver={(e) => {e.currentTarget.style.color='#558BCF'}} 
    onMouseOut={(e) => {e.currentTarget.style.color='black'}} 
    onClick={onClick} 
    sx={{color: 'black', '&:hover': {color: 'primary'}}}
    style={style}
  >
    <CoTypography size="Content">{children}</CoTypography> 
  </Button>
);

export default CoHoverButton;