import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const passages = JSON.parse(readFileSync(join(__dir, '../data/passages.json'), 'utf8'));

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  res.json(passages);
}
