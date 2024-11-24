import React, { useContext } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material'
import { useNavigate } from 'react-router-dom' // To navigate to checkout page
import { CartContext } from '../context/CartContext'

const Cart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext)

  const navigate = useNavigate()

  const handleRemoveFromCart = (item) => {
    removeFromCart(item._id)
  }

  const handleProceedToCheckout = () => {
    // Navigate to checkout and pass cart items through the state
    navigate('/checkout', { state: { cartItems } })
  }

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#388E3C' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
            Your Cart
          </Typography>
          <Button color="inherit" onClick={clearCart}>
            Clear Cart
          </Button>
        </Toolbar>
      </AppBar>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <Typography variant="h6" sx={{ margin: '1rem' }}>
          Your cart is empty!
        </Typography>
      ) : (
        <Grid container spacing={2} sx={{ padding: '1rem' }}>
          {cartItems.map((item) => (
            <Grid item key={`${item._id}`} xs={12}>
              <Card sx={{ display: 'flex', alignItems: 'center' }}>
                <CardMedia
                  component="img"
                  sx={{
                    width: 150,
                    height: 150,
                    objectFit: 'contain',
                    margin: '1rem',
                  }}
                  image={`http://localhost:5000/${item.productImage}`} // Assuming this is the image field in your product object
                  alt={item.productTitle}
                />
                <CardContent sx={{ flex: '1' }}>
                  <Typography variant="h5" gutterBottom>
                    {item.productTitle}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    ₹{item.productMRP}
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '1rem',
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => decreaseQuantity(item._id)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <Typography variant="body1" sx={{ margin: '0 1rem' }}>
                      Quantity: {item.quantity}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => increaseQuantity(item._id)}
                    >
                      +
                    </Button>
                    <Button
                      onClick={() => handleRemoveFromCart(item)}
                      variant="contained"
                      color="secondary"
                      sx={{ marginLeft: '1rem' }}
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Total Cost and Checkout Button */}
      {cartItems.length > 0 && (
        <Grid
          container
          justifyContent="space-between"
          sx={{ mt: 2, padding: '1rem' }}
        >
          <Typography variant="h6">Subtotal:</Typography>
          <Typography variant="h6">₹{calculateTotal(cartItems)}</Typography>
        </Grid>
      )}

      {cartItems.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: '2rem auto', display: 'block' }}
          onClick={handleProceedToCheckout}
        >
          Proceed to Checkout
        </Button>
      )}
    </div>
  )
}

// Helper function to calculate total
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.productMRP * item.quantity, 0)
}

export default Cart
