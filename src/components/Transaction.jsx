import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/context'; // Adjust the path as necessary
import axios from 'axios'; // Ensure you have axios installed

const Transaction = () => {
  const { name } = useContext(AuthContext); // Get the farmer's name from context
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        // Fetch invoices for the farmer
        const response = await axios.get(`http://localhost:5000/api/invoice/invoices/by-farmer/${name}`);
        setInvoices(response.data);

        // Extract product IDs from the invoices
        const productIds = response.data.flatMap((invoice) =>
          invoice.cartItems.map((item) => item.productId)
        );
        console.log("Product IDs:", productIds); // Log product IDs

        // Fetch product details using product IDs
        const uniqueProductIds = [...new Set(productIds)];
        console.log("Unique Product IDs:", uniqueProductIds); // Log unique product IDs

        const productResponses = await Promise.all(
          uniqueProductIds.map((id) =>
            axios.get(`http://localhost:5000/api/products/products/${id}`)
          )
        );

        const productMapping = {};
        productResponses.forEach((response) => {
          console.log("Product Response:", response.data); // Log each product response
          const productData = response.data;
          productMapping[productData._id] = productData.productTitle; // Map product ID to product title
        });

        setProducts(productMapping);
      } catch (err) {
        console.error("Error fetching invoices:", err);
        setError('Error fetching invoices. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [name]);

  const downloadInvoice = (invoiceId) => {
    // Logic to download the invoice as a PDF
    const url = `http://localhost:5000/api/invoice/download/${invoiceId}`;
    window.open(url, '_blank');
  };

  if (loading) return <div>Loading invoices...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="transaction-container">
      <h2>Transactions for {name}</h2>
      {invoices.length === 0 ? (
        <p>No invoices found for this farmer.</p>
      ) : (
        <div className="invoice-grid">
          {invoices.map((invoice) => (
            <div key={invoice._id} className="invoice-card">
              <h3>Invoice ID: {invoice._id}</h3>
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
                      {/* Now displays the product name from the API response */}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => downloadInvoice(invoice._id)}
                className="download-button"
              >
                Download Invoice PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transaction;
