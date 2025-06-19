const Weather = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="text-center mb-6">
      <h2 className="text-lg sm:text-xl font-semibold">{weather.name}</h2>
      <p className="text-3xl sm:text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
      <p className="capitalize text-sm sm:text-base">{weather.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="Weather icon"
        className="mx-auto w-16 sm:w-20"
      />
      <p className="text-sm sm:text-base">Humidity: {weather.main.humidity}%</p>
      <p className="text-sm sm:text-base">Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;