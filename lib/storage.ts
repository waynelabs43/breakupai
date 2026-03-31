import fs from 'fs';
import path from 'path';

const STORAGE_DIR = '/tmp/breakupgpt';

function ensureDir() {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }
}

export async function storeConversation(sessionId: string, text: string): Promise<void> {
  ensureDir();
  fs.writeFileSync(path.join(STORAGE_DIR, `conv_${sessionId}.txt`), text, 'utf8');
}

export async function getConversation(sessionId: string): Promise<string | null> {
  const file = path.join(STORAGE_DIR, `conv_${sessionId}.txt`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, 'utf8');
}

export async function deleteConversation(sessionId: string): Promise<void> {
  const file = path.join(STORAGE_DIR, `conv_${sessionId}.txt`);
  if (fs.existsSync(file)) fs.unlinkSync(file);
}

export async function storeAnalysis(sessionId: string, data: object): Promise<void> {
  ensureDir();
  fs.writeFileSync(path.join(STORAGE_DIR, `analysis_${sessionId}.json`), JSON.stringify(data), 'utf8');
}

export async function getAnalysis(sessionId: string): Promise<object | null> {
  const file = path.join(STORAGE_DIR, `analysis_${sessionId}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}
