import type { Category } from '../types';

const STORAGE_KEY = 'adivina:custom-categories';

export const MAX_WORD_LENGTH = 60;
export const MAX_WORDS = 1000;
export const MAX_NAME_LENGTH = 30;

/** Emojis propuestos en el selector (además, se puede escribir cualquier otro). */
export const EMOJI_CHOICES = [
  '⭐', '🎉', '🎵', '🎸', '🎮', '📚', '🎨', '🍕', '🍔', '🍦', '☕', '🍷',
  '⚽', '🏀', '🚗', '✈️', '🚀', '🏖️', '🏔️', '🌮', '🐶', '🐱', '🦄', '🐉',
  '👑', '🦸', '🧙', '👻', '🤖', '👽', '💼', '🏠', '🎄', '🎃', '❤️', '😂',
  '🔥', '💡', '🌈', '🌍', '🎬', '📺', '🎭', '🧩', '🎲', '🏆', '💃', '🍻',
];

// ---------- Guardado en el móvil ----------

function isCategory(x: unknown): x is Category {
  const c = x as Category;
  return (
    !!c &&
    typeof c.id === 'string' &&
    typeof c.name === 'string' &&
    typeof c.emoji === 'string' &&
    typeof c.color === 'string' &&
    Array.isArray(c.words) &&
    c.words.every((w) => typeof w === 'string')
  );
}

export function loadCustomCategories(): Category[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(isCategory).map((c) => ({ ...c, custom: true })) : [];
  } catch {
    return [];
  }
}

/** Devuelve false si no se ha podido guardar (modo privado, almacenamiento lleno…). */
export function saveCustomCategories(list: Category[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

export function newCategoryId(): string {
  return `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

// ---------- Palabras ----------

/** Limpia una palabra: espacios sobrantes, comillas sueltas y longitud máxima. */
export function cleanWord(raw: string): string {
  return raw
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^["'«“]+|["'»”]+$/g, '')
    .trim()
    .slice(0, MAX_WORD_LENGTH);
}

const key = (w: string) => w.toLocaleLowerCase('es').normalize('NFC');

/**
 * Añade palabras a una lista sin repetir (sin distinguir mayúsculas).
 * Devuelve la lista nueva y cuántas se han añadido, repetido o descartado por el límite.
 */
export function mergeWords(current: string[], incoming: string[]) {
  const seen = new Set(current.map(key));
  const words = [...current];
  let added = 0;
  let duplicates = 0;
  let overLimit = 0;
  for (const raw of incoming) {
    const w = cleanWord(raw);
    if (!w) continue;
    if (seen.has(key(w))) {
      duplicates++;
      continue;
    }
    if (words.length >= MAX_WORDS) {
      overLimit++;
      continue;
    }
    seen.add(key(w));
    words.push(w);
    added++;
  }
  return { words, added, duplicates, overLimit };
}

// ---------- Lectura de archivos ----------

/** Separa una línea CSV respetando las comillas ("a, b" cuenta como una sola celda). */
function splitCsvLine(line: string, sep: string): string[] {
  const cells: string[] = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === sep) {
      cells.push(cell);
      cell = '';
    } else {
      cell += ch;
    }
  }
  cells.push(cell);
  return cells;
}

/** Excel en español suele usar «;» como separador; elegimos el que más aparece. */
function detectSeparator(lines: string[]): string {
  const sample = lines.slice(0, 20).join('\n');
  const counts = [',', ';', '\t'].map((s) => [s, sample.split(s).length - 1] as const);
  counts.sort((a, b) => b[1] - a[1]);
  return counts[0][1] > 0 ? counts[0][0] : ',';
}

/**
 * Extrae palabras de un archivo:
 * - .txt: una palabra o expresión por línea.
 * - .csv: cada celda no vacía es una palabra (cualquier columna o fila).
 */
export function parseWordFile(name: string, text: string): string[] {
  const lines = text.replace(/^﻿/, '').split(/\r\n|\n|\r/);
  const isCsv = /\.csv$/i.test(name);
  if (!isCsv) return lines;
  const sep = detectSeparator(lines);
  return lines.flatMap((l) => splitCsvLine(l, sep));
}

export async function readWordFiles(files: FileList | File[]): Promise<{ words: string[]; rejected: string[] }> {
  const words: string[] = [];
  const rejected: string[] = [];
  for (const file of Array.from(files)) {
    const ok = /\.(csv|txt)$/i.test(file.name) || file.type === 'text/plain' || file.type === 'text/csv';
    if (!ok || file.size > 1_000_000) {
      rejected.push(file.name);
      continue;
    }
    words.push(...parseWordFile(file.name, await file.text()));
  }
  return { words, rejected };
}
