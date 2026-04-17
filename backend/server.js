const express = require('express');
const cors = require('cors');
const passages = require('./data/passages.json');

const app = express();
app.use(cors());
app.use(express.json());

// Return passages without revealing keywords/answers
app.get('/api/passages', (req, res) => {
  const safe = passages.map(p => ({
    id: p.id,
    level: p.level,
    title: p.title,
    text: p.text,
    questions: p.questions.map(q => ({
      id: q.id,
      type: q.type,
      label: q.label,
      icon: q.icon,
      question: q.question,
      hint: q.hint
    }))
  }));
  res.json(safe);
});

app.post('/api/check', (req, res) => {
  const { passageId, questionId, answer } = req.body;

  const passage = passages.find(p => p.id === passageId);
  if (!passage) return res.status(404).json({ error: '找不到文章' });

  const question = passage.questions.find(q => q.id === questionId);
  if (!question) return res.status(404).json({ error: '找不到問題' });

  const trimmed = (answer || '').trim();
  if (!trimmed) return res.json({ correct: false, hint: '請輸入答案喔！' });

  const correct = question.keywords.some(kw => trimmed.includes(kw));
  res.json({ correct, hint: correct ? null : question.hint });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`後端伺服器啟動於 http://localhost:${PORT}`));
