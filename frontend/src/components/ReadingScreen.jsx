import { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';

const LEVEL_COLORS = {
  1: 'bg-green-500',
  2: 'bg-blue-500',
  3: 'bg-purple-500'
};

export default function ReadingScreen({
  passage, passageIndex, totalPassages, level, totalScore, onComplete, onHome
}) {
  const [passageScore, setPassageScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const maxScore = passage.questions.length * 15;
  const allDone = answeredCount >= passage.questions.length;

  function handleScore(points) {
    setPassageScore(prev => prev + points);
    setAnsweredCount(prev => prev + 1);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onHome}
          className="bg-white border-2 border-amber-300 text-amber-700 font-bold text-lg rounded-2xl px-4 py-2 hover:bg-amber-50 active:scale-95 transition-all"
        >
          ← 回首頁
        </button>
        <div className="flex items-center gap-3">
          <span className={`text-white font-black text-lg px-4 py-2 rounded-full ${LEVEL_COLORS[level]}`}>
            第{level}關
          </span>
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-2xl px-4 py-2 text-center">
            <span className="text-lg font-black text-yellow-700">{totalScore + passageScore} 分</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-5">
        {Array.from({ length: totalPassages }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-3 rounded-full transition-all ${
              i < passageIndex - 1
                ? 'bg-green-400'
                : i === passageIndex - 1
                ? 'bg-orange-400'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Passage title */}
      <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 mb-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">📖</span>
          <h2 className="text-2xl font-black text-amber-700">{passage.title}</h2>
          <span className="ml-auto text-lg text-gray-400">第 {passageIndex} / {totalPassages} 篇</span>
        </div>
        <p className="text-2xl leading-loose font-medium text-gray-800 tracking-wide">
          {passage.text}
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-4 mb-6">
        <h3 className="text-2xl font-black text-gray-700">回答問題：</h3>
        {passage.questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            passageId={passage.id}
            questionNumber={i + 1}
            onScore={handleScore}
          />
        ))}
      </div>

      {/* Complete button */}
      {allDone && (
        <div className="text-center py-4">
          <div className="bg-green-100 border-4 border-green-400 rounded-3xl p-5 mb-4">
            <p className="text-3xl font-black text-green-700 mb-1">🎉 這篇完成了！</p>
            <p className="text-2xl text-green-600">
              這篇得了 <span className="font-black text-green-700">{passageScore}</span> 分！
            </p>
          </div>
          <button
            onClick={() => onComplete(passageScore, maxScore)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-black text-2xl rounded-3xl px-10 py-4 shadow-lg active:scale-95 transition-all"
          >
            {passageIndex < totalPassages ? '下一篇 →' : '看成績 🏆'}
          </button>
        </div>
      )}
    </div>
  );
}
