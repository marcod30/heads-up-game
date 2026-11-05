import type { CSSProperties } from 'react';
import type { Category } from '../types';

interface Props {
  categories: Category[];
  selectedIds: string[];
  wordCount: number;
  onToggle: (id: string) => void;
  onClear: () => void;
  onPlay: () => void;
}

export function Home({ categories, selectedIds, wordCount, onToggle, onClear, onPlay }: Props) {
  const count = selectedIds.length;
  return (
    <main className="screen home with-nav">
      <header className="home__header">
        <h1 className="logo">
          ¡Adivina<span>!</span>
        </h1>
        <p className="tagline">Elige una o varias categorías y a jugar.</p>
      </header>

      <section className="grid" aria-label="Categorías">
        {categories.map((c) => {
          const selected = selectedIds.includes(c.id);
          return (
            <button
              key={c.id}
              className={`card ${selected ? 'card--selected' : ''}`}
              style={{ '--accent': c.color } as CSSProperties}
              aria-pressed={selected}
              onClick={() => onToggle(c.id)}
            >
              <span className="card__check" aria-hidden>
                ✓
              </span>
              <span className="card__emoji" aria-hidden>
                {c.emoji}
              </span>
              <span className="card__name">{c.name}</span>
              <span className="card__count">
                {c.words.length} {c.words.length === 1 ? 'palabra' : 'palabras'}
                {c.custom && <span className="card__tag">Tuya</span>}
              </span>
            </button>
          );
        })}
      </section>

      {count > 0 && (
        <div className="play-bar play-bar--visible">
          <button className="play-bar__clear" onClick={onClear}>
            Quitar selección
          </button>
          <button className="btn-start play-bar__go" onClick={onPlay}>
            Jugar
            <span className="play-bar__meta">
              {count === 1 ? '1 categoría' : `${count} categorías`} · {wordCount} palabras
            </span>
          </button>
        </div>
      )}
    </main>
  );
}
