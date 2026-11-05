import type { Settings } from '../types';
import { Switch } from '../components/Switch';
import { tiltLabels } from '../lib/utils';

interface Props {
  settings: Settings;
  onChange: (s: Settings) => void;
}

const DURATIONS = [30, 60, 90, 120];

export function SettingsScreen({ settings, onChange }: Props) {
  const set = (patch: Partial<Settings>) => onChange({ ...settings, ...patch });
  const labels = tiltLabels(settings.invertTilt);

  return (
    <main className="screen settings-screen with-nav">
      <h1 className="page-title">Ajustes</h1>

      <section className="settings-group" aria-labelledby="g-partida">
        <h2 id="g-partida" className="settings-group__title">
          Partida
        </h2>
        <div className="setting-row">
          <span className="setting-row__text">
            <span id="duration-label" className="setting-row__label">
              Duración de la ronda
            </span>
          </span>
          <div className="chips" role="radiogroup" aria-labelledby="duration-label">
            {DURATIONS.map((d) => (
              <button
                key={d}
                role="radio"
                aria-checked={settings.duration === d}
                className={`chip ${settings.duration === d ? 'chip--on' : ''}`}
                onClick={() => set({ duration: d })}
              >
                {d}s
              </button>
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
          Sonido
        </h2>
        <Switch
          id="sound"
          label="Efectos de sonido"
          description="Cuenta atrás, aciertos, pases y final de ronda."
          checked={settings.sound}
          onChange={(v) => set({ sound: v })}
        />
      </section>
    </main>
  );
}
