export interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
  words: string[];
}

export type Outcome = 'correct' | 'pass';

export interface WordResult {
  word: string;
  outcome: Outcome;
}

export interface Settings {
  duration: number; // segundos
  sound: boolean;
}
