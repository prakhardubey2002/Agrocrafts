import React, { useState } from 'react';
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const categories = [
  'All',
  'Fruits',
  'Vegetables',
  'Grains',
  'Dairy',
  'Meat',
  'Beverages',
  'Snacks',
];

const products = [
  {
    id: 1,
    title: 'Fresh Apples',
    category: 'Fruits',
    image: 'https://via.placeholder.com/150',
    price: '50',
    description: 'Juicy and fresh apples',
  },
  {
    id: 2,
    title: 'Organic Carrots',
    category: 'Vegetables',
    image: 'https://via.placeholder.com/150',
    price: '30',
    description: 'Fresh organic carrots',
  },
  // Add more products as needed
];

const BuyerDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement logout functionality here
    console.log('Logout clicked');
    handleMenuClose();
  };

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
            <IconButton color="inherit">
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
        <FormControl variant="outlined" sx={{ marginRight: '1rem', minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select defaultValue="All" label="Category">
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" sx={{ backgroundColor: '#388E3C', color: '#fff' }}>
          Apply Filter
        </Button>
      </Box>

      {/* Products Section */}
      <Grid container spacing={2} sx={{ padding: '1rem' }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h5">{product.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6">₹{product.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BuyerDashboard;
