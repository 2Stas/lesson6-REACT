import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="text-center py-20 space-y-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
      <h1 className="text-6xl font-black">404</h1>
      <p className="text-xl text-white/80">Сторінку не знайдено</p>
      <Link
        to="/"
        className="inline-block px-8 py-3 bg-white text-slate-900 font-bold rounded-2xl shadow-lg hover:bg-white/90 transition-all"
      >
        На головну
      </Link>
    </div>
  );
}