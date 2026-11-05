export interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
  words: string[];
  /** Solo en mazos combinados: nombres de las categorías que lo forman. */
  includes?: string[];
  /** Creada por el jugador (se guarda en el móvil). */
  custom?: boolean;
}

export type Outcome = 'correct' | 'pass';

export interface WordResult {
  word: string;
  outcome: Outcome;
}

export interface Settings {
  duration: number; // segundos
  sound: boolean;
  /** false: cabeza abajo = acierto (por defecto). true: cabeza arriba = acierto. */
  invertTilt: boolean;
}
