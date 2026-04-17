const LEVEL_CONFIG = [
  { level: 1, label: '第一關', emoji: '🌱', color: 'bg-green-400 hover:bg-green-500', desc: '簡單短文，適合入門', stars: '⭐' },
  { level: 2, label: '第二關', emoji: '🌟', color: 'bg-blue-400 hover:bg-blue-500', desc: '中等難度，挑戰看看', stars: '⭐⭐' },
  { level: 3, label: '第三關', emoji: '🏆', color: 'bg-purple-400 hover:bg-purple-500', desc: '進階文章，你是高手！', stars: '⭐⭐⭐' }
];

export default function WelcomeScreen({ unlockedLevels, totalScore, onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="text-center mb-8">
        <div className="text-7xl mb-4">📖</div>
        <h1 className="text-5xl font-black text-orange-600 mb-2">閱讀小天才</h1>
        <p className="text-2xl text-amber-700 font-medium">讀文章，回答問題，得星星！</p>
      </div>

      {totalScore > 0 && (
        <div className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl px-8 py-4 mb-8 text-center">
          <p className="text-2xl font-bold text-yellow-700">我的總分 🎉</p>
          <p className="text-5xl font-black text-yellow-600">{totalScore} 分</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 w-full max-w-md">
        {LEVEL_CONFIG.map(({ level, label, emoji, color, desc, stars }) => {
          const unlocked = unlockedLevels.includes(level);
          return (
            <button
              key={level}
              onClick={() => unlocked && onStart(level)}
              disabled={!unlocked}
              className={`
                relative rounded-3xl p-6 text-white font-bold shadow-lg
                transition-all duration-200 active:scale-95
                ${unlocked ? `${color} cursor-pointer` : 'bg-gray-300 cursor-not-allowed opacity-60'}
              `}
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{unlocked ? emoji : '🔒'}</span>
                <div className="text-left">
                  <div className="text-2xl font-black">{label}</div>
                  <div className="text-lg opacity-90">{unlocked ? desc : '繼續努力，解鎖這一關！'}</div>
                </div>
                <div className="ml-auto text-2xl">{stars}</div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-8 text-xl text-amber-600 font-medium">加油！你可以的！💪</p>
    </div>
  );
}
