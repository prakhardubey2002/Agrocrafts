import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Paper,
  Grid,
} from '@mui/material';

const categories = [
  'Fruits',
  'Vegetables',
  'Grains',
  'Dairy',
  'Meat',
  'Beverages',
  'Snacks',
  'Other',
];

const ListaProduct = () => {
  const [productTitle, setProductTitle] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productType, setProductType] = useState('');
  const [productExpiry, setProductExpiry] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productMRP, setProductMRP] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [delivery, setDelivery] = useState('No');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProductImage(file); // Store the file object in state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    const formData = new FormData();
    formData.append('productTitle', productTitle);
    formData.append('productStock', productStock);
    formData.append('productCategory', productCategory);
    formData.append('productType', productType);
    formData.append('productExpiry', productExpiry);
    formData.append('productImage', productImage); // Append the image file
    formData.append('productMRP', productMRP);
    formData.append('productDescription', productDescription);
    formData.append('delivery', delivery);

    console.log('Form data submitted:', Object.fromEntries(formData)); // For demo purposes
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '2rem',
      }}
    >
      <Paper elevation={3} sx={{ padding: '2rem', width: '600px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Product Title"
                variant="outlined"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Product Stock (kg)"
                variant="outlined"
                type="number"
                value={productStock}
                onChange={(e) => setProductStock(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>Product Category</InputLabel>
                <Select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  label="Product Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select a category for the product</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Product Type"
                variant="outlined"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Product Expiry Date"
                variant="outlined"
                type="date"
                value={productExpiry}
                onChange={(e) => setProductExpiry(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                component="label"
                fullWidth
              >
                Upload Product Image
                <input
                  type="file"
                  hidden
                  accept="image/*" // Accepts only image files
                  onChange={handleImageChange}
                  required
                />
              </Button>
              {productImage && <Typography variant="body2" color="textSecondary" sx={{ marginTop: '0.5rem' }}>{productImage.name}</Typography>}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="MRP (in ₹)"
                variant="outlined"
                type="number"
                value={productMRP}
                onChange={(e) => setProductMRP(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Description"
                variant="outlined"
                multiline
                rows={4}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>Delivery</InputLabel>
                <Select
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value)}
                  label="Delivery"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
                <FormHelperText>Select if delivery is available</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              marginTop: '1rem',
              backgroundColor: '#388E3C', // Button green color
              color: '#fff',
              '&:hover': {
                backgroundColor: '#2E7D32',
              },
            }}
          >
            Add Product
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ListaProduct;
