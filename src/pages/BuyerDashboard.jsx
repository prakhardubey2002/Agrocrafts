import React, { useState, useEffect, useContext } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Menu,
  Alert,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import AuthContext from '../context/context'
import { useNavigate } from 'react-router-dom'
import ProductDetails from '../components/ProductDetails'
import { CartContext } from '../context/CartContext'

const categories = [
  'All',
  'Fruits',
  'Vegetables',
  'Grains',
  'Dairy',
  'Meat',
  'Beverages',
  'Snacks',
]

const BuyerDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [openDetails, setOpenDetails] = useState(false)
  const { cartItems, addToCart } = useContext(CartContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          'http://localhost:5000/api/products/products'
        )
        if (!response.ok) throw new Error('Failed to fetch products')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        setError(error.message)
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?')
    if (confirmLogout) {
      logout()
      navigate('/')
    }
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setOpenDetails(true)
  }

  const handleCloseDetails = () => {
    setOpenDetails(false)
    setSelectedProduct(null)
  }

  const filteredProducts = products.filter((product) => {
    if (!product || typeof product !== 'object') return false

    const matchesSearch =
      product.productTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ??
      false
    const matchesCategory =
      selectedCategory === 'All' || product.productCategory === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = (product) => {
    try {
      addToCart(product)
      console.log(`${product.productTitle} added to cart!`)
    } catch (error) {
      console.error('Error adding to cart:', error)
      setError('Failed to add product to cart')
    }
  }

  return (
    <div>
      {/* Top Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#388E3C' }}>
        <Toolbar>
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            sx={{
              flexGrow: 1,
              marginRight: '1rem',
              backgroundColor: '#fff',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              onChange: (e) => setSearchTerm(e.target.value),
            }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
            E-Commerce Logo
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="body1"
              sx={{ marginRight: '0.5rem', color: '#fff', cursor: 'pointer' }}
              onClick={handleMenuClick}
            >
              Logo <ArrowDropDownIcon sx={{ color: '#fff' }} />
            </Typography>
            <IconButton color="inherit" onClick={() => navigate('/cart')}>
              <ShoppingCartIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Home</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Filter Section */}
      <Box sx={{ padding: '1rem', display: 'flex', alignItems: 'center' }}>
        <FormControl
          variant="outlined"
          sx={{ marginRight: '1rem', minWidth: 120 }}
        >
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#388E3C', color: '#fff' }}
        >
          Apply Filter
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ margin: '1rem' }}>
          {error}
        </Alert>
      )}

      {/* Loading Indicator */}
      {isLoading && <Typography>Loading products...</Typography>}

      {/* Products Section */}
      <Grid container spacing={2} sx={{ padding: '1rem' }}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:5000/${product.productImage}`} // Adjust path based on your API
                alt={product.productTitle}
              />
              <CardContent>
                <Typography variant="h5">{product.productTitle}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.productDescription}
                </Typography>
                <Typography variant="h6">₹{product.productMRP}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Stock: {product.productStock}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleProductClick(product)}
                  sx={{ marginTop: '1rem' }}
                >
                  View Product
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleAddToCart(product)}
                  sx={{ marginTop: '1rem', marginLeft: '0.5rem' }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Product Details Dialog */}
      <ProductDetails
        open={openDetails}
        onClose={handleCloseDetails}
        product={selectedProduct}
      />
    </div>
  )
}

export default BuyerDashboard
