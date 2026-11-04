import type { CSSProperties } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Category, Outcome, Settings, WordResult } from '../types';
import { useTilt } from '../hooks/useTilt';
import { useWakeLock } from '../hooks/useWakeLock';
import { shuffle, vibrate } from '../lib/utils';
import { sounds } from '../lib/sound';

interface Props {
  category: Category;
  settings: Settings;
  onFinish: (results: WordResult[]) => void;
  onQuit: () => void;
}

type Phase = 'countdown' | 'play' | 'flash';

const COUNTDOWN = 3;
const FLASH_MS = 750;

/** Tamaño de letra según longitud, en unidades del contenedor (cqw/cqh). */
function wordSize(word: string): string {
  const longest = Math.max(...word.split(' ').map((w) => w.length));
  const k = Math.min(17, 112 / Math.max(6, longest), 210 / Math.max(8, word.length));
  return `min(${k.toFixed(1)}cqw, 40cqh)`;
}

/**
 * Si el móvil tiene la rotación bloqueada en vertical (muy habitual en iOS),
 * giramos el contenido nosotros usando el sensor para que se lea en horizontal.
 */
function useStageRotation(): number {
  const [rot, setRot] = useState(0);
  useEffect(() => {
    const handler = (e: DeviceOrientationEvent) => {
      const portrait = window.innerHeight > window.innerWidth;
      if (!portrait || e.gamma == null) return setRot(0);
      if (Math.abs(e.gamma) > 50) setRot(e.gamma > 0 ? -90 : 90);
    };
    const onResize = () => window.innerHeight <= window.innerWidth && setRot(0);
    window.addEventListener('deviceorientation', handler);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('deviceorientation', handler);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return rot;
}

export function Game({ category, settings, onFinish, onQuit }: Props) {
  const words = useMemo(() => shuffle(category.words), [category]);
  const [phase, setPhase] = useState<Phase>('countdown');
  const [count, setCount] = useState(COUNTDOWN);
  const [timeLeft, setTimeLeft] = useState(settings.duration);
  const [index, setIndex] = useState(0);
  const [flash, setFlash] = useState<Outcome | null>(null);

  const phaseRef = useRef<Phase>('countdown');
  const resultsRef = useRef<WordResult[]>([]);
  const finishedRef = useRef(false);
  const play = settings.sound ? sounds : null;
  const rot = useStageRotation();

  useWakeLock(true);

  const setPhaseBoth = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    play?.end();
    vibrate([80, 60, 80]);
    onFinish(resultsRef.current);
  }, [onFinish, play]);

  // Cuenta atrás inicial
  useEffect(() => {
    if (phase !== 'countdown') return;
    if (count === 0) {
      play?.go();
      setPhaseBoth('play');
      return;
    }
    play?.tick();
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, count]);

  // Temporizador de la ronda (basado en la hora real para no desviarse)
  const started = phase !== 'countdown';
  useEffect(() => {
    if (!started) return;
    const end = Date.now() + settings.duration * 1000;
    const id = setInterval(() => {
      const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      setTimeLeft((prev) => {
        if (left !== prev && left <= 5 && left > 0) play?.tick();
        return left;
      });
      if (left === 0) {
        clearInterval(id);
        finish();
      }
    }, 200);
    return () => clearInterval(id);
  }, [started, settings.duration, finish, play]);

  const handleOutcome = useCallback(
    (outcome: Outcome) => {
      if (phaseRef.current !== 'play' || finishedRef.current) return;
      resultsRef.current = [...resultsRef.current, { word: words[index], outcome }];
      setFlash(outcome);
      setPhaseBoth('flash');
      if (outcome === 'correct') {
        play?.correct();
        vibrate(60);
      } else {
        play?.pass();
        vibrate([30, 40, 30]);
      }
      setTimeout(() => {
        if (finishedRef.current) return;
        if (index + 1 >= words.length) return finish();
        setIndex(index + 1);
        setFlash(null);
        setPhaseBoth('play');
      }, FLASH_MS);
    },
    [index, words, play, finish],
  );

  const { sensorActive } = useTilt(true, handleOutcome);

  // Teclado para probar en el ordenador: ↓/→ acierto, ↑/← pasar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') handleOutcome('correct');
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') handleOutcome('pass');
      if (e.key === 'Escape') onQuit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleOutcome, onQuit]);

  const stageClass = ['stage', flash ? `stage--${flash}` : '', phase === 'countdown' ? 'stage--countdown' : '']
    .filter(Boolean)
    .join(' ');
  const stageStyle = {
    '--accent': category.color,
    ...(rot ? { width: '100vh', height: '100vw', transform: `translate(-50%, -50%) rotate(${rot}deg)` } : {}),
  } as CSSProperties;

  const current = words[index];

  return (
    <main className="screen game">
      <div className={`${stageClass} ${rot ? 'stage--rotated' : ''}`} style={stageStyle}>
        <div className="hud">
          <button className="hud__quit" onClick={onQuit} aria-label="Salir de la partida">
            ✕
          </button>
          <span className="hud__cat">
            {category.emoji} {category.name}
          </span>
          <span className={`hud__time ${timeLeft <= 5 && started ? 'hud__time--hot' : ''}`}>{timeLeft}</span>
        </div>

        {phase === 'countdown' ? (
          <div className="countdown">
            <p className="countdown__hint">¡Al frente!</p>
            <p key={count} className="countdown__num">
              {count || '¡Ya!'}
            </p>
          </div>
        ) : flash ? (
          <p className="word word--flash">{flash === 'correct' ? '¡Correcto!' : 'Paso'}</p>
        ) : (
          <p key={current} className="word" style={{ fontSize: wordSize(current) }}>
            {current}
          </p>
        )}

        {/* Respaldo táctil: útil sin giroscopio o para probar */}
        {phase === 'play' && (
          <div className="touch">
            <button className="touch__pass" onClick={() => handleOutcome('pass')}>
              {!sensorActive && <span>Pasar</span>}
            </button>
            <button className="touch__ok" onClick={() => handleOutcome('correct')}>
              {!sensorActive && <span>Acierto</span>}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
