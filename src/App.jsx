import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ForecastPage } from './pages/ForeCastPage';
import { HistoryPage } from './pages/HistoryPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { WEATHER_THEMES } from './constants/weatherThemes';
import { fetchCurrentWeather, fetchWeatherForecast } from './Api/weatherApi';

export default function App() {
  const [currentCity, setCurrentCity] = useState('Київ');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastList, setForecastList] = useState([]);
  const [activeThemeKey, setActiveThemeKey] = useState('clear');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('weather_history');
    return saved ? JSON.parse(saved) : [];
  });

  const loadWeather = async (city) => {
    setLoading(true);
    setError('');
    try {
      const current = await fetchCurrentWeather(city);
      const forecast = await fetchWeatherForecast(city);

      setWeatherData(current);
      setForecastList(forecast);
      setCurrentCity(current.city);

      if (current.themeKey && WEATHER_THEMES[current.themeKey]) {
        setActiveThemeKey(current.themeKey);
      }


      setHistory((prev) => {
        const filtered = prev.filter((item) => item.toLowerCase() !== current.city.toLowerCase());
        const updated = [current.city, ...filtered].slice(0, 10);
        localStorage.setItem('weather_history', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      if (err.message === 'NOT_FOUND') {
        setError(`Місто «${city}» не знайдено. Перевірте назву`);
      } else if (err.message === 'TOO_SHORT') {
        setError('Введіть щонайменше 2 символи');
      } else {
        setError('Не вдалося отримати дані. Перевірте інтернет і спробуйте ще раз.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('weather_history');
  };

  useEffect(() => {
    loadWeather('Київ');
  }, []);

  const currentTheme = WEATHER_THEMES[activeThemeKey] || WEATHER_THEMES.clear;

  return (
    <Routes>
      <Route element={<Layout currentTheme={currentTheme} />}>
        <Route
          path="/"
          element={
            <HomePage
              weatherData={weatherData}
              loading={loading}
              error={error}
              onSearch={loadWeather}
            />
          }
        />
        <Route
          path="/forecast"
          element={
            <ForecastPage
              currentCity={currentCity}
              forecastList={forecastList}
              loading={loading}
            />
          }
        />
        <Route
          path="/history"
          element={
            <HistoryPage
              history={history}
              onSelectCity={loadWeather}
              onClearHistory={handleClearHistory}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}