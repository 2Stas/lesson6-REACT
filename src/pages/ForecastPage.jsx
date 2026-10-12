export function ForecastPage({ currentCity, forecastList, loading }) {
  if (loading) {
    return <div className="text-center py-12 text-xl font-medium">Завантаження прогнозу…</div>;
  }

  if (!forecastList || forecastList.length === 0) {
    return (
      <div className="text-center py-12 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
        <p className="text-lg mb-4">Немає даних про прогноз.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Прогноз погоди для міста: <span className="underline">{currentCity}</span></h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {forecastList.map((item, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="text-lg font-bold capitalize">{item.date}</div>
              <div className="text-sm capitalize text-white/80 mt-1">{item.condition}</div>
            </div>
            <div className="mt-6 flex justify-between items-end">
              <div>
                <span className="text-2xl font-black">{item.tempMax}°</span>
                <span className="text-sm text-white/60 ml-2">{item.tempMin}°</span>
              </div>
              {item.pop > 0 && (
                <span className="text-xs bg-blue-500/30 px-2 py-1 rounded-full border border-blue-300/30">
                  💧 {item.pop}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}