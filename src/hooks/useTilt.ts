import { useEffect, useRef, useState } from 'react';
import type { Outcome } from '../types';

/**
 * Detecta el giro del móvil colocado en la frente (en horizontal, pantalla mirando a los demás).
 *
 * Se calcula hacia dónde apunta la pantalla: z = cos(beta)·cos(gamma)
 *   z ≈  0  → pantalla vertical (posición de juego, neutra)
 *   z <  0  → pantalla hacia el suelo  (cabeza abajo)  → ACIERTO
 *   z >  0  → pantalla hacia el techo  (cabeza arriba) → PASAR
 * Esta fórmula no depende de hacia qué lado esté girado el móvil en horizontal
 * y evita los saltos de ±90° que tiene gamma en esa postura.
 *
 * Histéresis: dispara al pasar de TRIGGER y no vuelve a disparar hasta regresar por debajo de REARM.
 */
const TRIGGER = 0.55; // ≈ 33° de inclinación
const REARM = 0.3; // ≈ 17°

const toRad = (deg: number) => (deg * Math.PI) / 180;

export function useTilt(enabled: boolean, onTilt: (outcome: Outcome) => void) {
  const [sensorActive, setSensorActive] = useState(false);
  const armedRef = useRef(false); // no armamos hasta ver la posición neutra
  const cbRef = useRef(onTilt);
  cbRef.current = onTilt;

  useEffect(() => {
    if (!enabled) return;
    armedRef.current = false;

    const handler = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return;
      setSensorActive(true);
      const z = Math.cos(toRad(e.beta)) * Math.cos(toRad(e.gamma));

      if (!armedRef.current) {
        if (Math.abs(z) < REARM) armedRef.current = true;
        return;
      }
      if (z < -TRIGGER) {
        armedRef.current = false;
        cbRef.current('correct');
      } else if (z > TRIGGER) {
        armedRef.current = false;
        cbRef.current('pass');
      }
    };

    window.addEventListener('deviceorientation', handler);
    return () => window.removeEventListener('deviceorientation', handler);
  }, [enabled]);

  return { sensorActive };
}
