import { NavLink, Outlet, Link } from 'react-router-dom';

export function Layout({ currentTheme }) {
  const gradientClass = currentTheme?.gradient || 'from-amber-500 via-orange-500 to-rose-600';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradientClass} text-white transition-all duration-700 flex flex-col font-sans relative`}>
      <div className="fixed inset-0 bg-black/5 pointer-events-none z-0" />

      <header className="relative z-10 border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-bold tracking-wider flex items-center gap-2">
            <span>☀️</span> ПОГОДА
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4 bg-white/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/10">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive ? 'bg-white text-slate-900 shadow-md' : 'hover:bg-white/10 text-white/90'
                }`
              }
            >
              Головна
            </NavLink>
            <NavLink
              to="/forecast"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive ? 'bg-white text-slate-900 shadow-md' : 'hover:bg-white/10 text-white/90'
                }`
              }
            >
              Прогноз
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive ? 'bg-white text-slate-900 shadow-md' : 'hover:bg-white/10 text-white/90'
                }`
              }
            >
              Історія
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto p-4 md:p-8">
        <Outlet />
      </main>

      <footer className="relative z-10 border-t border-white/10 py-4 text-center text-xs text-white/60">
        Джерело даних:{' '}
        <a
          href="https://openweathermap.org/"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-white transition-colors"
        >
          OpenWeatherMap API
        </a>
      </footer>
    </div>
  );
}