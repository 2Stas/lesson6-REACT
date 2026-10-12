import { useNavigate, Link } from 'react-router-dom';

export function HistoryPage({ history, onSelectCity, onClearHistory }) {
  const navigate = useNavigate();

  const handleCityClick = (cityName) => {
    onSelectCity(cityName);
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Історія пошуку</h1>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="px-4 py-2 bg-red-500/30 hover:bg-red-500/50 border border-red-400/40 rounded-xl text-sm font-medium transition-all"
          >
            Очистити історію
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-12 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 space-y-4">
          <p className="text-lg text-white/80">Ви ще нічого не шукали.</p>
          <Link
            to="/"
            className="inline-block px-6 py-2.5 bg-white text-slate-900 font-bold rounded-xl shadow-lg hover:bg-white/90 transition-all"
          >
            Перейти на головну
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {history.map((city, idx) => (
            <button
              key={idx}
              onClick={() => handleCityClick(city)}
              className="p-5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl text-left font-bold text-lg flex items-center justify-between transition-all group shadow-md"
            >
              <span>{city}</span>
              <span className="text-sm text-white/50 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}