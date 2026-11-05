import type { CSSProperties } from 'react';
import type { Settings } from '../types';
import { Switch } from '../components/Switch';
import { tiltLabels } from '../lib/utils';

interface Props {
  settings: Settings;
  onChange: (s: Settings) => void;
}

// Valores fijos del deslizador (en segundos)
const MIN = 30;
const MAX = 150;
const STEP = 30;
const DURATIONS = Array.from({ length: (MAX - MIN) / STEP + 1 }, (_, i) => MIN + i * STEP);

export function SettingsScreen({ settings, onChange }: Props) {
  const set = (patch: Partial<Settings>) => onChange({ ...settings, ...patch });
  const labels = tiltLabels(settings.invertTilt);
  const duration = Math.min(MAX, Math.max(MIN, settings.duration));
  const pct = ((duration - MIN) / (MAX - MIN)) * 100;

  return (
    <main className="screen settings-screen with-nav">
      <h1 className="page-title">Ajustes</h1>

      <section className="settings-group" aria-labelledby="g-partida">
        <h2 id="g-partida" className="settings-group__title">
          Partida
        </h2>
        <div className="setting-row setting-row--slider">
          <div className="slider-head">
            <label htmlFor="duration" className="setting-row__label">
              Duración de la ronda
            </label>
            <output htmlFor="duration" className="slider-value">
              {duration} s
            </output>
          </div>
          <input
            id="duration"
            type="range"
            className="slider"
            min={MIN}
            max={MAX}
            step={STEP}
            value={duration}
            style={{ '--pct': `${pct}%` } as CSSProperties}
            aria-valuetext={`${duration} segundos`}
            onChange={(e) => set({ duration: Number(e.target.value) })}
          />
          <div className="slider-ticks" aria-hidden>
            {DURATIONS.map((d) => (
              <span key={d} className={d === duration ? 'slider-ticks__on' : ''}>
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="settings-group" aria-labelledby="g-controles">
        <h2 id="g-controles" className="settings-group__title">
          Controles
        </h2>
        <Switch
          id="invert"
          label="Invertir giro"
          description="Cambia qué dirección cuenta como acierto y cuál como pasar."
          checked={settings.invertTilt}
          onChange={(v) => set({ invertTilt: v })}
        />
        <div className="tilt-preview" aria-live="polite">
          <span className="tilt-preview__item">
            <span className="pill pill--ok">{labels.correct}</span> acierto
          </span>
          <span className="tilt-preview__item">
            <span className="pill pill--pass">{labels.pass}</span> pasar
          </span>
        </div>
      </section>

      <section className="settings-group" aria-labelledby="g-sonido">
        <h2 id="g-sonido" className="settings-group__title">
          Audio
        </h2>
        <Switch
          id="sound"
          label="Sonidos"
          checked={settings.sound}
          onChange={(v) => set({ sound: v })}
        />
      </section>
    </main>
  );
}
