// ProductDetails.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CardMedia,
} from '@mui/material';

const ProductDetails = ({ open, onClose, product }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{product.productTitle}</DialogTitle>
      <DialogContent>
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:5000/${product.productImage}`}
          alt={product.productTitle}
        />
        <Typography variant="body2" color="text.secondary">
          {product.productDescription}
        </Typography>
        <Typography variant="h6">Price: ₹{product.productMRP}</Typography>
        <Typography variant="body2" color="text.secondary">
          Stock: {product.productStock}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={() => console.log('Add to Cart clicked')} color="primary">
          Add to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetails;
