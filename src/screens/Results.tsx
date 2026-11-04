import type { CSSProperties } from 'react';
import type { Category, WordResult } from '../types';

interface Props {
  category: Category;
  results: WordResult[];
  onAgain: () => void;
  onHome: () => void;
}

export function Results({ category, results, onAgain, onHome }: Props) {
  const score = results.filter((r) => r.outcome === 'correct').length;
  return (
    <main className="screen results" style={{ '--accent': category.color } as CSSProperties}>
      <div className="results__score">
        <span className="results__num">{score}</span>
        <span className="results__label">{score === 1 ? 'acierto' : 'aciertos'}</span>
        <span className="results__sub">
          {category.emoji} {category.name} · {results.length - score} {results.length - score === 1 ? 'pasada' : 'pasadas'}
        </span>
      </div>

      <ul className="results__list">
        {results.map((r, i) => (
          <li key={i} className={`result result--${r.outcome}`}>
            <span aria-hidden>{r.outcome === 'correct' ? '✓' : '✗'}</span> {r.word}
          </li>
        ))}
        {results.length === 0 && <li className="result result--empty">Ninguna palabra esta vez</li>}
      </ul>

      <div className="results__actions">
        <button className="btn-start" onClick={onAgain}>
          Otra ronda
        </button>
        <button className="btn-ghost" onClick={onHome}>
          Categorías
        </button>
      </div>
    </main>
  );
}
