import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const { cartItems } = location.state; // Getting cart items from state

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    state: '',
    country: '',
    phoneNumber: '',
    paymentOption: 'Pay on Delivery', // Default value
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Checkout details:', formData, cartItems);
    // You can call an API to submit this data here
  };

  return (
    <div>
      <Typography variant="h4" sx={{ margin: '1rem 0' }}>
        Checkout
      </Typography>

      <form onSubmit={handleSubmit}>
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
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
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
                  sx={{ width: 100, height: 100, objectFit: 'contain', margin: '1rem' }}
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

        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '2rem' }}>
          Place Order
        </Button>
      </form>
    </div>
  );
};

export default Checkout;
