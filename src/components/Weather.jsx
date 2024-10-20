import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper, Grid, Icon, Avatar } from '@mui/material';
import axios from 'axios';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import CloudIcon from '@mui/icons-material/Cloud';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';

// Styled component for the card
const WeatherCard = styled(Paper)(({ theme }) => ({
  padding: '2rem',
  margin: '0 auto',
  borderRadius: '15px',
  backgroundColor: '#e3f2fd',
  boxShadow: theme.shadows[5],
}));

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // OpenWeatherMap API key and location coordinates
  const API_KEY = '4d779a8fce2673e99554c2ffb37c6a7e';
  const lat = 23.1686;
  const lon = 79.9339;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(API_URL);
        setWeatherData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    };

    fetchWeather();
  }, [API_URL]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', padding: '2rem' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  // Convert temperature from Kelvin to Celsius
  const tempCelsius = (weatherData.main.temp - 273.15).toFixed(2);
  const feelsLikeCelsius = (weatherData.main.feels_like - 273.15).toFixed(2);
  const cityName = weatherData.name; // Get the city name

  return (
    <Box sx={{ padding: '2rem', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <WeatherCard elevation={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Weather in {cityName} 
        </Typography>
        <Typography variant="h5" align="center">
          {tempCelsius}°C
        </Typography>
        <WbSunnyIcon fontSize="large" sx={{ color: '#FFC107', display: 'block', margin: '0 auto' }} />
        <Typography variant="body1" align="center">
          Condition: {weatherData.weather[0].description}
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="space-around" sx={{ marginTop: '1rem' }}>
          <Grid item xs={2} align="center">
            <OpacityIcon fontSize="large" sx={{ color: '#00bcd4' }} />
            <Typography variant="h6">{weatherData.main.humidity}%</Typography>
            <Typography variant="body2">Humidity</Typography>
          </Grid>
          <Grid item xs={2} align="center">
            <AirIcon fontSize="large" sx={{ color: '#607d8b' }} />
            <Typography variant="h6">{weatherData.wind.speed} m/s</Typography>
            <Typography variant="body2">Wind Speed</Typography>
          </Grid>
          <Grid item xs={2} align="center">
            <VisibilityIcon fontSize="large" sx={{ color: '#3f51b5' }} />
            <Typography variant="h6">{(weatherData.visibility / 1000).toFixed(1)} km</Typography>
            <Typography variant="body2">Visibility</Typography>
          </Grid>
          <Grid item xs={2} align="center">
            <CloudIcon fontSize="large" sx={{ color: '#9e9e9e' }} />
            <Typography variant="h6">{weatherData.clouds.all}%</Typography>
            <Typography variant="body2">Cloudiness</Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ marginTop: '1rem' }}>
          <strong>Feels Like:</strong> {feelsLikeCelsius}°C
        </Typography>
      </WeatherCard>
    </Box>
  );
};

export default Weather;
