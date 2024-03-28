import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Container, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { GrFormNext } from 'react-icons/gr';

const SideTypeReal = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, px: 1 }}>
    <Button to="/" component={Link} size="small" color="inherit">
      Chat
    </Button>
    </Box>
    <Divider />
    <Container maxWidth="sm">
      <Box
        sx={{
          maxHeight: '500px',
          overflow: 'auto',
          mb: 2,
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
        }}
      >
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText primary={msg} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          placeholder="Type a message..."
        />
        <Button variant="contained" onClick={handleSend} sx={{ ml: 1 }}>
          Send
        </Button>
      </Box>
    </Container>
    </>
    
  );
};

export default SideTypeReal;