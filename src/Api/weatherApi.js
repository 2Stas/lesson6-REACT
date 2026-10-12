const API_KEY = "070144dc41cac4a07947a85ef314de3a";
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchCurrentWeather(city) {
  const trimmed = city.trim();
  if (!trimmed) throw new Error('EMPTY');
  if (trimmed.length < 2) throw new Error('TOO_SHORT');

  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(trimmed)}&units=metric&lang=ua&appid=${API_KEY}`
  );

  if (!response.ok) {
    if (response.status === 404) throw new Error('NOT_FOUND');
    throw new Error('SERVER_ERROR');
  }

  const data = await response.json();

  let themeKey = 'clear';
  const mainCondition = data.weather[0]?.main.toLowerCase() || '';

  if (mainCondition.includes('cloud')) themeKey = 'clouds';
  else if (mainCondition.includes('rain') || mainCondition.includes('drizzle')) themeKey = 'rain';
  else if (mainCondition.includes('snow')) themeKey = 'snow';
  else if (mainCondition.includes('thunderstorm')) themeKey = 'thunderstorm';
  else if (mainCondition.includes('clear')) themeKey = 'clear';

  return {
    city: data.name,
    country: data.sys?.country || '',
    date: new Date().toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' }),
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    condition: data.weather[0]?.description || 'Ясно',
    themeKey: themeKey,
    metrics: {
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      feelsLike: Math.round(data.main.feels_like),
      visibility: Math.round(data.visibility / 1000),
    },
  };
}

export async function fetchWeatherForecast(city) {
  const trimmed = city.trim();
  const response = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(trimmed)}&units=metric&lang=ua&appid=${API_KEY}`
  );

  if (!response.ok) throw new Error('Не вдалося завантажити прогноз');

  const data = await response.json();
  
  const dailyList = data.list.filter((item) => item.dt_txt.includes('12:00:00')).map((item) => {
    const dateObj = new Date(item.dt * 1000);
    return {
      date: dateObj.toLocaleDateString('uk-UA', { weekday: 'short', day: 'numeric', month: 'short' }),
      condition: item.weather[0]?.description || '',
      tempMax: Math.round(item.main.temp_max),
      tempMin: Math.round(item.main.temp_min),
      pop: Math.round((item.pop || 0) * 100),
    };
  });

  return dailyList;
}