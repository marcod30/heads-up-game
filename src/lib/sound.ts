// Sonidos sintetizados con Web Audio: sin ficheros que descargar.
let ctx: AudioContext | null = null;

/** Llamar dentro de un gesto del usuario (toque) para desbloquear el audio en iOS. */
export function unlockAudio(): void {
  try {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx ??= new AC();
    if (ctx.state === 'suspended') void ctx.resume();
  } catch {
    ctx = null;
  }
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', gain = 0.25): void {
  if (!ctx) return;
  const t = ctx.currentTime + start;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

export const sounds = {
  correct: () => { tone(660, 0, 0.12, 'triangle'); tone(990, 0.1, 0.22, 'triangle'); },
  pass: () => { tone(300, 0, 0.18, 'sawtooth', 0.12); tone(220, 0.14, 0.25, 'sawtooth', 0.12); },
  tick: () => tone(1200, 0, 0.05, 'square', 0.08),
  go: () => tone(880, 0, 0.35, 'triangle'),
  end: () => { tone(523, 0, 0.18); tone(659, 0.16, 0.18); tone(784, 0.32, 0.4); },
};
