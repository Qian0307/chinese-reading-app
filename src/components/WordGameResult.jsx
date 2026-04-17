const LEVEL_LABELS = { 1: '簡單', 2: '中等', 3: '困難' };

export default function WordGameResult({ level, score, total, onHome, onRetry, onNextLevel }) {
  const maxScore = total * 10;
  const stars = score >= maxScore ? 3 : score >= maxScore * 0.6 ? 2 : 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">
          {stars === 3 ? '🏆' : stars === 2 ? '🌟' : '💪'}
        </div>
        <h2 className="text-4xl font-black text-orange-600 mb-1">
          {stars === 3 ? '全部答對！' : stars === 2 ? '答得不錯！' : '再試試看！'}
        </h2>
        <p className="text-xl text-gray-500 mb-6">字詞遊戲 — {LEVEL_LABELS[level]}</p>

        <div className="bg-amber-50 rounded-2xl border-2 border-amber-200 py-5 px-6 mb-6">
          <p className="text-xl text-amber-700 font-medium mb-1">答對 {score / 10} / {total} 題</p>
          <p className="text-6xl font-black text-orange-500">{score}</p>
          <p className="text-lg text-amber-600 mt-1">分（滿分 {maxScore} 分）</p>
          <div className="flex justify-center gap-2 mt-3 text-4xl">
            {[1, 2, 3].map(i => (
              <span key={i} className={i <= stars ? 'opacity-100' : 'opacity-20'}>⭐</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {onNextLevel && (
            <button
              onClick={onNextLevel}
              className="bg-purple-500 hover:bg-purple-600 text-white font-black text-xl rounded-2xl py-4 active:scale-95 transition-all"
            >
              挑戰更難一關 🚀
            </button>
          )}
          <button
            onClick={onRetry}
            className="bg-orange-400 hover:bg-orange-500 text-white font-black text-xl rounded-2xl py-4 active:scale-95 transition-all"
          >
            再玩一次 🔄
          </button>
          <button
            onClick={onHome}
            className="bg-white hover:bg-amber-50 text-amber-700 border-2 border-amber-300 font-bold text-xl rounded-2xl py-4 active:scale-95 transition-all"
          >
            回首頁 🏠
          </button>
        </div>
      </div>
    </div>
  );
}
