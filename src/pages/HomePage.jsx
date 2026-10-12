import React, { useState } from 'react';

export function HomePage({ weatherData, loading, error, onSearch }) {
  const [inputVal, setInputVal] = useState('');
  const [valError, setValError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    if (trimmed.length < 2) {
      setValError('Введіть щонайменше 2 символи');
      return;
    }
    setValError('');
    onSearch(trimmed);
    setInputVal('');
  };

  return (
    <div className="space-y-8">
      <section className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (valError) setValError('');
              }}
              disabled={loading}
              placeholder="Введіть назву міста (наприклад: Київ, Lviv)..."
              className="w-full px-5 py-3 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-50"
            />
            {valError && <p className="text-red-300 text-xs mt-1.5 ml-2 font-medium">{valError}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-white text-slate-900 rounded-2xl font-bold shadow-lg hover:bg-white/90 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Шукаємо…' : 'Знайти'}
          </button>
        </form>
      </section>

      <div aria-live="polite" className="sr-only">
        {loading ? 'Завантаження даних' : error ? error : `Погода у місті ${weatherData?.city}`}
      </div>

      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-2xl text-center text-red-100 backdrop-blur-md">
          {error}
        </div>
      )}

      {weatherData && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <h2 className="text-3xl font-extrabold">{weatherData.city}</h2>
              <p className="text-white/70 text-sm">{weatherData.country}</p>
              <p className="text-white/60 text-xs mt-1">{weatherData.date}</p>
            </div>
            <div className="my-8">
              <div className="text-6xl font-black">{weatherData.temp}°C</div>
              <p className="text-lg capitalize font-medium mt-2">{weatherData.condition}</p>
            </div>
            <div className="text-xs text-white/70 border-t border-white/10 pt-3">
              Відчувається як {weatherData.feelsLike}°C | Мін: {weatherData.tempMin}° / Макс: {weatherData.tempMax}°
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <MetricCard label="Вологість" value={`${weatherData.metrics.humidity}%`} icon="💧" />
            <MetricCard label="Вітер" value={`${weatherData.metrics.windSpeed} м/с`} icon="💨" />
            <MetricCard label="Тиск" value={`${weatherData.metrics.pressure} гПа`} icon="🧭" />
            <MetricCard label="Видимість" value={`${weatherData.metrics.visibility} км`} icon="👁️" />
            <MetricCard label="Відчувається" value={`${weatherData.metrics.feelsLike}°C`} icon="🌡️" />
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value, icon }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg">
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-xs text-white/70">{label}</span>
      <span className="text-xl font-bold mt-1">{value}</span>
    </div>
  );
}