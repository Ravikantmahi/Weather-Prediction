import { useState } from 'react';
import Weather from './components/Weather.jsx';
import Forecast from './components/Forecast.jsx';
import Loading from './components/Loading.jsx';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError('');
      // Fetch current weather
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      setWeather(weatherRes.data);

      // Fetch 5-day forecast
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
      );
      // Filter forecast to one per day (at 12:00)
      const dailyForecast = forecastRes.data.list.filter(item =>
        item.dt_txt.includes('12:00:00')
      );
      setForecast(dailyForecast);
    } catch (err) {
      setError('City not found or API error. Please try again.');
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      setCity(''); // Clear input after search
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4">
          Weather Prediction
        </h1>
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base"
            >
              Search
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-center text-sm sm:text-base mb-4">{error}</p>}
        {loading && <Loading />}
        <Weather weather={weather} />
        <Forecast forecast={forecast} />
      </div>
    </div>
  );
};

export default App;