import { useState, useEffect } from 'react';
import { CHAR_GAMES } from '../data/charGames';

const LEVEL_LABELS = { 1: '簡單', 2: '中等', 3: '困難' };
const LEVEL_COLORS = { 1: 'bg-green-500', 2: 'bg-blue-500', 3: 'bg-purple-500' };

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function WordGameScreen({ level, onHome, onComplete }) {
  const questions = CHAR_GAMES.filter(g => g.level === level);
  const [idx, setIdx] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null); // null | answer string
  const [score, setScore] = useState(0);

  const current = questions[idx];

  useEffect(() => {
    setOptions(shuffle(current.options));
    setSelected(null);
  }, [idx]);

  function handleSelect(opt) {
    if (selected !== null) return;
    setSelected(opt);
    if (opt === current.answer) setScore(s => s + 10);
  }

  function next() {
    if (idx + 1 >= questions.length) {
      onComplete(score + (selected === current.answer ? 0 : 0));
    } else {
      setIdx(i => i + 1);
    }
  }

  const answered = selected !== null;
  const correct = selected === current.answer;
  const progress = ((idx) / questions.length) * 100;

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
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
            {LEVEL_LABELS[level]}
          </span>
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-2xl px-4 py-2">
            <span className="text-lg font-black text-yellow-700">{score} 分</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="h-4 bg-orange-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-lg font-bold text-gray-500 whitespace-nowrap">
          {idx + 1} / {questions.length}
        </span>
      </div>

      {/* Game card */}
      <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-md p-6 mb-6">
        <p className="text-center text-xl font-bold text-amber-700 mb-6">
          🀇 這兩個部件可以組成哪個字？
        </p>

        {/* Components display */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="bg-orange-100 border-4 border-orange-300 rounded-2xl w-24 h-24 flex items-center justify-center shadow-sm">
            <span className="text-5xl font-black text-orange-700">{current.component1}</span>
          </div>
          <span className="text-4xl font-black text-gray-400">＋</span>
          <div className="bg-blue-100 border-4 border-blue-300 rounded-2xl w-24 h-24 flex items-center justify-center shadow-sm">
            <span className="text-5xl font-black text-blue-700">{current.component2}</span>
          </div>
          <span className="text-4xl font-black text-gray-400">＝</span>
          <div className={`border-4 rounded-2xl w-24 h-24 flex items-center justify-center shadow-sm transition-all duration-300 ${
            answered
              ? correct ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-300'
              : 'bg-gray-100 border-gray-300'
          }`}>
            <span className="text-5xl font-black text-gray-500">
              {answered ? current.answer : '？'}
            </span>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {options.map(opt => {
            let style = 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100 active:scale-95';
            if (answered) {
              if (opt === current.answer) {
                style = 'bg-green-400 border-green-500 text-white scale-105';
              } else if (opt === selected) {
                style = 'bg-red-300 border-red-400 text-white';
              } else {
                style = 'bg-gray-100 border-gray-200 text-gray-400 opacity-60';
              }
            }
            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                disabled={answered}
                className={`border-4 rounded-2xl py-4 text-4xl font-black transition-all duration-200 ${style}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {answered && (
        <div className={`rounded-3xl border-4 p-5 mb-5 ${
          correct ? 'bg-green-50 border-green-400' : 'bg-yellow-50 border-yellow-300'
        }`}>
          {correct ? (
            <div className="flex items-start gap-3">
              <span className="text-3xl">✅</span>
              <div>
                <p className="text-2xl font-black text-green-700">答對了！＋10分</p>
                <p className="text-xl text-green-600 mt-1">
                  <span className="font-black text-3xl text-green-700">{current.answer}</span>
                  　就是「{current.meaning}」的意思！
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <span className="text-3xl">❓</span>
              <div>
                <p className="text-2xl font-black text-yellow-700">再想想！正確答案是「{current.answer}」</p>
                <p className="text-xl text-yellow-600 mt-1">提示：{current.hint}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {answered && (
        <button
          onClick={next}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-2xl rounded-3xl py-4 shadow-lg active:scale-95 transition-all"
        >
          {idx + 1 < questions.length ? '下一題 →' : '看成績 🏆'}
        </button>
      )}
    </div>
  );
}
