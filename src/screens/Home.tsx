import type { CSSProperties } from 'react';
import type { Category, Settings } from '../types';

interface Props {
  categories: Category[];
  settings: Settings;
  onSettings: (s: Settings) => void;
  onPick: (c: Category) => void;
}

const DURATIONS = [30, 60, 90, 120];

export function Home({ categories, settings, onSettings, onPick }: Props) {
  return (
    <main className="screen home">
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

      <section className="settings" aria-label="Ajustes">
        <div className="settings__group">
          <span className="settings__label">Tiempo</span>
          <div className="chips">
            {DURATIONS.map((d) => (
              <button
                key={d}
                className={`chip ${settings.duration === d ? 'chip--on' : ''}`}
                aria-pressed={settings.duration === d}
                onClick={() => onSettings({ ...settings, duration: d })}
              >
                {d}s
              </button>
            ))}
          </div>
        </div>
        <button
          className={`chip ${settings.sound ? 'chip--on' : ''}`}
          aria-pressed={settings.sound}
          onClick={() => onSettings({ ...settings, sound: !settings.sound })}
        >
          {settings.sound ? '🔊 Sonido' : '🔇 Sin sonido'}
        </button>
      </section>
    </main>
  );
}
