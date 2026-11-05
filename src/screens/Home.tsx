import type { CSSProperties } from 'react';
import type { Category } from '../types';

interface Props {
  categories: Category[];
  onPick: (c: Category) => void;
}

export function Home({ categories, onPick }: Props) {
  return (
    <main className="screen home with-nav">
      <header className="home__header">
        <h1 className="logo">
          ¡Adivina<span>!</span>
        </h1>
        <p className="tagline">Móvil a la frente, amigos describiendo, tú adivinando.</p>
      </header>

      <section className="grid" aria-label="Categorías">
        {categories.map((c) => (
          <button
            key={c.id}
            className="card"
            style={{ '--accent': c.color } as CSSProperties}
            onClick={() => onPick(c)}
          >
            <span className="card__emoji" aria-hidden>
              {c.emoji}
            </span>
            <span className="card__name">{c.name}</span>
            <span className="card__count">{c.words.length} palabras</span>
          </button>
        ))}
      </section>
    </main>
  );
}
