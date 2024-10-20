import React, { useContext, useState } from 'react'
import { Box, Button, TextField, Typography, Paper } from '@mui/material'
import axios from 'axios' // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/context'

const SignInPage = () => {
  const [email, setEmail] = useState('') // State for email
  const [password, setPassword] = useState('') // State for password
  const [errorMessage, setErrorMessage] = useState('') // State for error messages
  const {  token, setToken, logout, usertype, setUsertype,name, setname } = useContext(AuthContext)
  const navigate = useNavigate()
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('') // Clear previous error message

    try {
      // Make API call to the login endpoint
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          name: email, // Using email as the username
          userType: 'buyer',
          password,
        }
      )

      // Store the JWT token (you can also store in local storage if needed)
      const { token, user } = response.data
      if (response.data.token) {
        setToken(response.data.token)
        setUsertype(response.data.user.userType)
        setname(response.data.user.name)
      }
      navigate('/buyerdashboard')
      console.log('Login successful:', user)
      // You can store the token and user information as needed
    } catch (error) {
      // Handle errors here
      if (error.response) {
        // If there's a response from the server
        setErrorMessage(error.response.data.message)
      } else {
        setErrorMessage('An error occurred. Please try again.')
      }
      console.error('Login failed:', error)
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
          Buyer Sign In
        </Typography>

        {/* Display error message if any */}
        {errorMessage && (
          <Typography color="error" sx={{ marginBottom: '1rem' }}>
            {errorMessage}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Sign In
          </Button>
        </form>
      </Paper>
    </Box>
  )
}

export default SignInPage
