import React, { useContext, useState } from 'react'
import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../context/context'

const Checkout = () => {
  const location = useLocation()
  const { cartItems } = location.state // Getting cart items from state
  const { name, token } = useContext(AuthContext) // Assuming userId is also available in AuthContext
  const [formData, setFormData] = useState({
    name: name,
    addressLine1: '',
    addressLine2: '',
    zipcode: '',
    landmark: '',
    state: '',
    country: '',
    phoneNumber: '',
    paymentOption: 'Pay on Delivery', // Default value
  })
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataToSend = {
      cartItems: cartItems.map((item) => ({
        productId: item._id, // Assuming _id is the product ID in cartItems
        quantity: item.quantity,
        price: item.productMRP, // Assuming productMRP is the price
      })),
      address: {
        name: formData.name,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        zipcode: formData.zipcode,
        landmark: formData.landmark,
        state: formData.state,
        country: formData.country,
        phoneNumber: formData.phoneNumber,
      },
      userId: token, // Use the user ID from context
    }
    console.log(dataToSend)
    try {
      const response = await fetch('http://localhost:5000/api/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const responseData = await response.json()
      console.log('Order placed successfully:', responseData)
      alert('Order created successfully')
      navigate('/buyerdashboard')
      // Handle successful order placement (e.g., redirect to order confirmation page)
    } catch (error) {
      console.error('Error placing order:', error)
      // Handle error (e.g., show a message to the user)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Full height of the viewport
        padding: '2rem',
        backgroundColor: '#f5f5f5', // Light background color
      }}
    >
      <Typography variant="h4" sx={{ margin: '1rem 0' }}>
        Checkout
      </Typography>

      <form
        onSubmit={handleSubmit}
        style={{ width: '100%', maxWidth: '600px' }}
      >
        {/* Shipping Details */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address Line 1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address Line 2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </Grid>
        </Grid>

        {/* Cart Items Summary */}
        <Typography variant="h6" sx={{ margin: '2rem 0 1rem' }}>
          Products in Cart
        </Typography>
        <Grid container spacing={2}>
          {cartItems.map((item) => (
            <Grid item key={item._id} xs={12}>
              <Card sx={{ display: 'flex', alignItems: 'center' }}>
                <CardMedia
                  component="img"
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: 'contain',
                    margin: '1rem',
                  }}
                  image={`http://localhost:5000/${item.productImage}`}
                  alt={item.productTitle}
                />
                <CardContent>
                  <Typography variant="h6">{item.productTitle}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                  <Typography>Price: ₹{item.productMRP}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Payment Option */}
        <Typography variant="h6" sx={{ margin: '2rem 0 1rem' }}>
          Payment Option
        </Typography>
        <Typography>Pay on Delivery</Typography>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: '2rem' }}
        >
          Place Order
        </Button>
      </form>
    </Box>
  )
}

export default Checkout
