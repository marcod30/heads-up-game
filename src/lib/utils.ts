import type { Settings } from '../types';

export function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SETTINGS_KEY = 'adivina:settings';
export const DEFAULT_SETTINGS: Settings = { duration: 60, sound: true };

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(s: Settings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  } catch {
    /* modo privado: no pasa nada */
  }
}

export function vibrate(pattern: number | number[]): void {
  // No existe en iOS; en Android da un toque físico de confirmación.
  if ('vibrate' in navigator) navigator.vibrate(pattern);
}
