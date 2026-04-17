const READ_LEVELS = [
  { level: 1, label: '第一關', emoji: '🌱', color: 'bg-green-400 hover:bg-green-500', desc: '簡單短文，4 篇', stars: '⭐' },
  { level: 2, label: '第二關', emoji: '🌟', color: 'bg-blue-400 hover:bg-blue-500',   desc: '中等難度，4 篇', stars: '⭐⭐' },
  { level: 3, label: '第三關', emoji: '🏆', color: 'bg-purple-400 hover:bg-purple-500', desc: '進階文章，4 篇', stars: '⭐⭐⭐' }
];

const WORD_LEVELS = [
  { level: 1, label: '簡單', emoji: '🔤', color: 'bg-teal-400 hover:bg-teal-500',   desc: '日月→明、木木→林…', stars: '⭐' },
  { level: 2, label: '中等', emoji: '🀇', color: 'bg-cyan-500 hover:bg-cyan-600',   desc: '人木→休、林木→森…', stars: '⭐⭐' },
  { level: 3, label: '困難', emoji: '🧩', color: 'bg-indigo-500 hover:bg-indigo-600', desc: '麥面→麵、木目→相…', stars: '⭐⭐⭐' }
];

export default function WelcomeScreen({ unlockedLevels, totalScore, onStartReading, onStartWordGame }) {
  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8">
      {/* Title */}
      <div className="text-center mb-6">
        <div className="text-7xl mb-3">📖</div>
        <h1 className="text-5xl font-black text-orange-600 mb-1">閱讀小天才</h1>
        <p className="text-xl text-amber-700 font-medium">讀文章・玩字謎・得星星！</p>
      </div>

      {/* Total score */}
      {totalScore > 0 && (
        <div className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl px-8 py-3 mb-6 text-center">
          <p className="text-lg font-bold text-yellow-700">我的總分 🎉</p>
          <p className="text-4xl font-black text-yellow-600">{totalScore} 分</p>
        </div>
      )}

      <div className="w-full max-w-md space-y-6">
        {/* Reading comprehension section */}
        <div>
          <h2 className="text-2xl font-black text-gray-700 mb-3 flex items-center gap-2">
            📚 閱讀理解
          </h2>
          <div className="space-y-3">
            {READ_LEVELS.map(({ level, label, emoji, color, desc, stars }) => {
              const unlocked = unlockedLevels.includes(level);
              return (
                <button
                  key={level}
                  onClick={() => unlocked && onStartReading(level)}
                  disabled={!unlocked}
                  className={`w-full rounded-3xl p-5 text-white font-bold shadow-md transition-all duration-200 active:scale-95 ${
                    unlocked ? `${color} cursor-pointer` : 'bg-gray-300 cursor-not-allowed opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{unlocked ? emoji : '🔒'}</span>
                    <div className="text-left">
                      <div className="text-xl font-black">{label}</div>
                      <div className="text-base opacity-90">{unlocked ? desc : '繼續努力，解鎖這一關！'}</div>
                    </div>
                    <div className="ml-auto text-xl">{stars}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Word game section */}
        <div>
          <h2 className="text-2xl font-black text-gray-700 mb-3 flex items-center gap-2">
            🀇 組合字詞遊戲
          </h2>
          <div className="space-y-3">
            {WORD_LEVELS.map(({ level, label, emoji, color, desc, stars }) => (
              <button
                key={level}
                onClick={() => onStartWordGame(level)}
                className={`w-full rounded-3xl p-5 text-white font-bold shadow-md transition-all duration-200 active:scale-95 cursor-pointer ${color}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{emoji}</span>
                  <div className="text-left">
                    <div className="text-xl font-black">{label}</div>
                    <div className="text-base opacity-90">{desc}</div>
                  </div>
                  <div className="ml-auto text-xl">{stars}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-xl text-amber-600 font-medium">加油！你可以的！💪</p>
    </div>
  );
}
