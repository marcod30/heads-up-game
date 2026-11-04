import { useEffect } from 'react';

/** Evita que la pantalla se apague durante la partida. */
export function useWakeLock(active: boolean) {
  useEffect(() => {
    if (!active || !('wakeLock' in navigator)) return;
    let sentinel: WakeLockSentinel | null = null;
    let cancelled = false;

    const acquire = async () => {
      try {
        sentinel = await navigator.wakeLock.request('screen');
        if (cancelled) void sentinel.release();
      } catch {
        /* denegado o no soportado */
      }
    };
    // El sistema lo libera al cambiar de app; lo recuperamos al volver.
    const onVisible = () => document.visibilityState === 'visible' && void acquire();

    void acquire();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisible);
      void sentinel?.release();
    };
  }, [active]);
}
