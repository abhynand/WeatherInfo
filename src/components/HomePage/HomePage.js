import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';
import './HomePage.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    const fetchWeather = async () => {
      if (city.trim().length < 1) {
        setError(' Enter a city name.');
        return;
      }

      try {
        setLoading(true);
        const apiKey = '25f69ff708874384bb0111040251901';
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
        setWeatherData(response.data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="body">
      <h1 className="heading">Weather Info</h1>
      <TextField
        id="filled-basic" 
        label="Place" 
        variant="filled"
        value={city}
        onChange={handleCityChange}
        className="search-bar"
        fullWidth
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        weatherData && (
          <div className="weather-info">
            <div className="location-header">
              <h2>{weatherData.location.name}</h2>
              <LocationOnIcon/>
            </div>
            <div className='info'>
              <p>{weatherData.current.condition.text}</p>
              <p>Temperature: {weatherData.current.temp_c} °C</p>
              <p>Humidity: {weatherData.current.humidity}%</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Home;
