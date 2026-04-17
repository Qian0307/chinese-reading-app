function getStars(score) {
  if (score >= 80) return 3;
  if (score >= 50) return 2;
  return 1;
}

function getMessage(stars) {
  if (stars === 3) return { title: '超級棒！', sub: '你是閱讀小天才！🎊', color: 'text-yellow-600' };
  if (stars === 2) return { title: '很不錯！', sub: '繼續加油，你快成功了！', color: 'text-blue-600' };
  return { title: '繼續努力！', sub: '再試一次，一定可以進步！', color: 'text-orange-600' };
}

export default function ResultScreen({
  level, totalScore, unlockedLevels, onHome, onNextLevel, onRetry
}) {
  const stars = getStars(totalScore);
  const msg = getMessage(stars);
  const nextLevelUnlocked = unlockedLevels.includes(level + 1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">
          {stars === 3 ? '🏆' : stars === 2 ? '🌟' : '💪'}
        </div>

        <h2 className={`text-4xl font-black mb-2 ${msg.color}`}>{msg.title}</h2>
        <p className="text-xl text-gray-600 mb-6">{msg.sub}</p>

        <div className="bg-amber-50 rounded-2xl border-2 border-amber-200 py-5 px-6 mb-6">
          <p className="text-xl text-amber-700 font-medium mb-1">第 {level} 關總分</p>
          <p className="text-6xl font-black text-orange-500">{totalScore}</p>
          <p className="text-lg text-amber-600 mt-1">分</p>
          <div className="flex justify-center gap-2 mt-3 text-4xl">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={i < stars ? 'opacity-100' : 'opacity-20'}>⭐</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {level < 3 && nextLevelUnlocked && (
            <button
              onClick={onNextLevel}
              className="bg-purple-500 hover:bg-purple-600 text-white font-black text-xl rounded-2xl py-4 active:scale-95 transition-all"
            >
              挑戰第 {level + 1} 關 🚀
            </button>
          )}
          {level < 3 && nextLevelUnlocked && (
            <p className="text-lg text-purple-600 font-bold -mt-1">🔓 新關卡已解鎖！</p>
          )}
          <button
            onClick={onRetry}
            className="bg-orange-400 hover:bg-orange-500 text-white font-black text-xl rounded-2xl py-4 active:scale-95 transition-all"
          >
            再試一次 🔄
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
