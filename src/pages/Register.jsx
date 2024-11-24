import React, { useState } from 'react'
import { Box, Button, TextField, Typography, Paper } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [name, setName] = useState('') // State for username
  const [userType, setUserType] = useState('buyer') // State for user type
  const [password, setPassword] = useState('') // State for password
  const [errorMessage, setErrorMessage] = useState('') // State for error messages
  const [successMessage, setSuccessMessage] = useState('') // State for success messages
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('') // Clear previous error message
    setSuccessMessage('') // Clear previous success message

    try {
      // Make API call to the register endpoint
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          name,
          userType,
          password,
        }
      )

      setSuccessMessage('Registration successful! You can now sign in.')
      setTimeout(() => {
        navigate('/') // Redirect to sign-in page after successful registration
      }, 3000)
      console.log('Registration successful:', response.data)
    } catch (error) {
      // Handle errors here
      if (error.response) {
        setErrorMessage(error.response.data.message)
      } else {
        setErrorMessage('An error occurred. Please try again.')
      }
      console.error('Registration failed:', error)
    }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          'url("https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") no-repeat center center/cover',
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
          Register
        </Typography>

        {/* Display error or success message */}
        {errorMessage && (
          <Typography color="error" sx={{ marginBottom: '1rem' }}>
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography color="success" sx={{ marginBottom: '1rem' }}>
            {successMessage}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: '1rem' }}
            required
          />
          <TextField
            label="User Type (buyer/farmer)"
            variant="outlined"
            fullWidth
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            sx={{ marginBottom: '1rem' }}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: '1rem' }}
            required
          />
          <Button
            type="submit"
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
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  )
}

export default RegisterPage
