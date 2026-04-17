import { useState } from 'react';

export default function QuestionCard({ question, passageId, questionNumber, onScore }) {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle');
  const [hint, setHint] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [scored, setScored] = useState(false);

  async function checkAnswer() {
    const trimmed = input.trim();
    if (!trimmed) return;

    let correct = false;
    let hintText = question.hint;

    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passageId, questionId: question.id, answer: trimmed })
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      correct = data.correct;
      hintText = data.hint || question.hint;
    } catch {
      // Offline fallback: use local keywords
      if (question.keywords?.length) {
        correct = question.keywords.some(kw => trimmed.includes(kw));
      }
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (correct) {
      setStatus('correct');
      if (!scored) {
        setScored(true);
        onScore(newAttempts === 1 ? 15 : 10);
      }
    } else {
      setStatus('incorrect');
      setHint(hintText);
    }
  }

  const typeColors = {
    who:   'bg-pink-100 border-pink-300 text-pink-700',
    where: 'bg-blue-100 border-blue-300 text-blue-700',
    what:  'bg-green-100 border-green-300 text-green-700'
  };

  return (
    <div className={`rounded-3xl border-4 p-5 transition-all duration-300 ${
      status === 'correct'   ? 'bg-green-50 border-green-400' :
      status === 'incorrect' ? 'bg-red-50 border-red-300'     :
                               'bg-white border-amber-200'
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{question.icon}</span>
        <span className={`text-lg font-black px-3 py-1 rounded-full border-2 ${typeColors[question.type]}`}>
          {question.label}
        </span>
        <span className="text-xl font-bold text-gray-500">問題 {questionNumber}</span>
      </div>

      <p className="text-2xl font-bold text-gray-800 mb-4">{question.question}</p>

      {status !== 'correct' && (
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && checkAnswer()}
            placeholder="在這裡輸入答案..."
            className="flex-1 text-2xl font-medium border-4 border-amber-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-orange-400 bg-amber-50"
          />
          <button
            onClick={checkAnswer}
            disabled={!input.trim()}
            className="bg-orange-400 hover:bg-orange-500 disabled:bg-gray-300 text-white font-black text-xl rounded-2xl px-6 py-3 transition-all active:scale-95 disabled:cursor-not-allowed"
          >
            確認
          </button>
        </div>
      )}

      {status === 'correct' && (
        <div className="flex items-center gap-3 mt-3 bg-green-100 rounded-2xl px-4 py-3">
          <span className="text-3xl">✅</span>
          <div>
            <p className="text-2xl font-black text-green-700">答對了！太棒了！</p>
            <p className="text-lg text-green-600">你的答案：{input}</p>
          </div>
          <span className="ml-auto text-2xl font-black text-green-700">
            +{attempts === 1 ? 15 : 10}分
          </span>
        </div>
      )}

      {status === 'incorrect' && (
        <div className="mt-3 bg-yellow-50 border-2 border-yellow-300 rounded-2xl px-4 py-3">
          <p className="text-xl font-bold text-yellow-700">❓ 再想想看！</p>
          <p className="text-xl text-yellow-600 mt-1">提示：{hint}</p>
          <button
            onClick={() => { setInput(''); setStatus('idle'); }}
            className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-white font-bold text-lg rounded-xl px-4 py-2 active:scale-95 transition-all"
          >
            重新輸入
          </button>
        </div>
      )}
    </div>
  );
}
