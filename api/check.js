import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const passages = JSON.parse(readFileSync(join(__dir, '../data/passages.json'), 'utf8'));

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { passageId, questionId, answer } = req.body;
  const passage = passages.find(p => p.id === passageId);
  if (!passage) return res.status(404).json({ error: '找不到文章' });

  const question = passage.questions.find(q => q.id === questionId);
  if (!question) return res.status(404).json({ error: '找不到問題' });

  const trimmed = (answer || '').trim();
  if (!trimmed) return res.json({ correct: false, hint: '請輸入答案喔！' });

  const correct = question.keywords.some(kw => trimmed.includes(kw));
  res.json({ correct, hint: correct ? null : question.hint });
}
