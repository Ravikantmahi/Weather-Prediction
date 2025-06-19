const Forecast = ({ forecast }) => {
  if (forecast.length === 0) return null;

  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold mb-2">5-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {forecast.map((day, index) => (
          <div key={index} className="text-center">
            <p className="text-xs sm:text-sm">
              {new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt="Forecast icon"
              className="mx-auto w-10 sm:w-12"
            />
            <p className="text-xs sm:text-sm">{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;