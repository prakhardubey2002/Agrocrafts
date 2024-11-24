import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material'
import AuthContext from '../context/context'
import { CheckCircle, Cancel, Info, Category } from '@mui/icons-material'

const ViewProductFarm = () => {
  const { name } = useContext(AuthContext) // Get farmer's name from context
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState([]) // New state for categories

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/farmer/${name}`
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setProducts(data) // Assume your API returns an array of products
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (name) {
      fetchProducts()
    }
  }, [name])

  // Fetch categories for filtering (Assuming you have an endpoint for this)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/products/categories'
        ) // Adjust the endpoint as necessary
        const data = await response.json()
        setCategories(data) // Assuming the response is an array of category strings
      } catch (err) {
        console.error('Error fetching categories:', err)
      }
    }

    fetchCategories()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.productTitle
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory
      ? product.productCategory === selectedCategory
      : true
    return matchesSearch && matchesCategory
  })

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/product/${id}`,
          {
            method: 'DELETE',
          }
        )

        if (!response.ok) {
          throw new Error('Failed to delete the product')
        }

        // Filter out the deleted product from the state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        )
        alert('Product deleted successfully.')
      } catch (error) {
        console.error('Error:', error)
        alert('Error deleting product.')
      }
    }
  }

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>
  }

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Products for {name}
      </Typography>

      {/* Search Bar and Category Filter */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <TextField
          variant="outlined"
          label="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginRight: '1rem', flex: 1 }} // Make the search bar flexible
        />
      </Box>

      {filteredProducts.length === 0 ? (
        <Typography>No products found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} key={product._id}>
              <Paper
                elevation={3}
                sx={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}
                >
                  <Category
                    sx={{ verticalAlign: 'middle', marginRight: '0.5rem' }}
                  />
                  {product.productTitle}
                </Typography>
                <Typography>
                  <CheckCircle
                    sx={{ verticalAlign: 'middle', marginRight: '0.5rem' }}
                  />
                  Stock: {product.productStock} kg
                </Typography>
                <Typography>
                  <Info
                    sx={{ verticalAlign: 'middle', marginRight: '0.5rem' }}
                  />
                  Category: {product.productCategory}
                </Typography>
                <Typography>
                  <Info
                    sx={{ verticalAlign: 'middle', marginRight: '0.5rem' }}
                  />
                  Type: {product.productType}
                </Typography>
                <Typography>
                  <Info
                    sx={{ verticalAlign: 'middle', marginRight: '0.5rem' }}
                  />
                  Expiry Date:{' '}
                  {new Date(product.productExpiry).toLocaleDateString()}
                </Typography>
                <Typography>
                  <Info
                    sx={{ verticalAlign: 'middle', marginRight: '0.5rem' }}
                  />
                  MRP: ₹{product.productMRP}
                </Typography>
                <Typography>
                  <Info
                    sx={{ verticalAlign: 'middle', marginRight: '0.5rem' }}
                  />
                  Description: {product.productDescription}
                </Typography>
                {product.productImage && (
                  <img
                    src={`http://localhost:5000/${product.productImage}`}
                    alt={product.productTitle}
                    style={{
                      width: '100px',
                      borderRadius: '8px',
                      marginTop: '1rem',
                      objectFit: 'cover',
                    }}
                  />
                )}
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginTop: '1rem' }}
                  onClick={() => deleteProduct(product._id)} // Call delete function with product ID
                >
                  Delete
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default ViewProductFarm
