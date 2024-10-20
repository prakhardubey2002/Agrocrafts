import React, { useContext, useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import Weather from '../components/weather';
import ListaProduct from '../components/ListaProduct';
import ViewProductfarm from '../components/ViewProductfarm';
import AuthContext from '../context/context';
import { useNavigate } from 'react-router-dom';

const FarmerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Weather');
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Function to render different components based on selected option
  const renderContent = () => {
    switch (activeComponent) {
      case 'Weather':
        return <Weather />;
      case 'List a Product':
        return <ListaProduct />;
      case 'View All Products':
        return <ViewProductfarm />;
      case 'Transactions':
        return <Typography variant="h6">Transactions Component</Typography>;
      case 'Logout':
        handleLogout(); // Call logout when this case is selected
        return null; // Returning null as the component will redirect
      default:
        return (
          <Typography variant="h6">
            Select an option from the sidebar
          </Typography>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: '20%',
          bgcolor: '#2E7D32',
          color: 'white',
          padding: '1rem',
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: '2rem', textAlign: 'center' }}
        >
          Farmer Dashboard
        </Typography>
        <List>
          {[
            'Weather',
            'List a Product',
            'View All Products',
            'Transactions',
            'Logout', // Added Logout option
          ].map((text) => (
            <ListItem
              button
              key={text}
              onClick={() => setActiveComponent(text)}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ width: '80%', padding: '2rem' }}>{renderContent()}</Box>
    </Box>
  );
};

export default FarmerDashboard;
