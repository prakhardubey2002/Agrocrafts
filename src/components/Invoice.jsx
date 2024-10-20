import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed

const InvoicePDF = () => {
  const location = useLocation();
  const invoice = location.state; // Access the invoice data from state
  const [products, setProducts] = useState({}); // Store product details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Extract product IDs from the invoice cart items
        const productIds = invoice.cartItems.map(item => item.productId);
        const uniqueProductIds = [...new Set(productIds)]; // Get unique product IDs

        // Fetch product details using product IDs
        const productResponses = await Promise.all(
          uniqueProductIds.map(id =>
            axios.get(`http://localhost:5000/api/products/products/${id}`)
          )
        );

        // Create a mapping of product IDs to product names
        const productMapping = {};
        productResponses.forEach(response => {
          const productData = response.data; // Adjust based on your API response structure
          productMapping[productData._id] = productData.productTitle; // Assuming `productTitle` is the name
        });

        setProducts(productMapping); // Update state with product names
      } catch (err) {
        setError('Error fetching product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (invoice) {
      fetchProductDetails();
    }
  }, [invoice]); // Fetch product details when the invoice changes

  // Calculate total amount
  const calculateTotal = () => {
    return invoice.cartItems.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0).toFixed(2);
  };

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.invoiceContainer}>
        <h1>Invoice</h1>
        <button onClick={() => window.print()} style={styles.downloadButton}>
          Download PDF
        </button>

        <h2>Invoice ID: {invoice._id}</h2>
        <div className="invoice-address">
          <h4>Address:</h4>
          <p>{invoice.address.name}</p>
          <p>{invoice.address.addressLine1}</p>
          <p>{invoice.address.addressLine2}</p>
          <p>{invoice.address.zipcode}</p>
          <p>{invoice.address.landmark}</p>
          <p>{invoice.address.state}</p>
          <p>{invoice.address.country}</p>
          <p>Phone Number: {invoice.address.phoneNumber}</p>
        </div>
        <div className="invoice-products">
          <h4>Products:</h4>
          <ul>
            {invoice.cartItems.map((item) => (
              <li key={item.productId}>
                {item.quantity} x ${item.price.toFixed(2)} 
                <br />
                <strong>
                  Product Name: {products[item.productId] || 'Loading...'}
                </strong>
              </li>
            ))}
          </ul>
        </div>
        <div className="invoice-total" style={{ marginTop: '20px', fontWeight: 'bold' }}>
          <h4>Total: ${calculateTotal()}</h4>
        </div>
      </div>
    </div>
  );
};

// Styles for the invoice
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9', // Optional background color for contrast
  },
  invoiceContainer: {
    padding: '20px',
    maxWidth: '600px',
    width: '100%',
    border: '5px solid green', // Green border
    borderRadius: '5px',
    backgroundColor: 'white', // Optional background for the invoice
  },
  downloadButton: {
    marginBottom: '20px',
    padding: '10px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default InvoicePDF;
