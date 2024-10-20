import React from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const SignInPage = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'url("https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") no-repeat center center/cover', // Add your background image
      }}
    >
      <Paper
        sx={{
          padding: '2rem',
          width: '400px',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: '1.5rem', color: '#2E7D32' }} // Farming green color
        >
          Buyer Sign In
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '1rem' }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            marginTop: '1.5rem',
            backgroundColor: '#388E3C', // Button green color
            color: '#fff',
            '&:hover': {
              backgroundColor: '#2E7D32',
            },
          }}
        >
          Sign In
        </Button>
      </Paper>
    </Box>
  );
};

export default SignInPage;
