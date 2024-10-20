import React, { useContext, useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/context';

const Farmer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {  token, setToken, logout, usertype, setUsertype,name, setname } = useContext(AuthContext)
  const handleSignIn = async () => {
    console.log({
      name: email,
      userType: "farmer", // Setting userType to farmer by default
      password
    });

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        name: email,
        userType: "farmer", // Setting userType to farmer by default
        password
      });

      // Assuming the API responds with a success message or token
      if (response.data.token) {
        setToken(response.data.token);
        setUsertype(response.data.user.userType)
        setname(response.data.user.name)

        navigate('/farmerdashboard'); // Redirect to FarmerDashboard
      } else {
        setError(response.data.message || 'Login failed');
        setOpenSnackbar(true);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'url("https://images.unsplash.com/photo-1483871788521-4f224a86e166?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") no-repeat center center/cover', // Add your background image
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
          Farmer Sign In
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          onClick={handleSignIn}
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

      {/* Snackbar for error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
      />
    </Box>
  );
};

export default Farmer;
