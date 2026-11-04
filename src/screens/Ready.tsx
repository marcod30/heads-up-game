import type { CSSProperties } from 'react';
import type { Category } from '../types';

interface Props {
  category: Category;
  motionDenied: boolean;
  onStart: () => void;
  onBack: () => void;
}

export function Ready({ category, motionDenied, onStart, onBack }: Props) {
  const insecure = !window.isSecureContext;
  return (
    <main className="screen ready" style={{ '--accent': category.color } as CSSProperties}>
      <button className="back" onClick={onBack} aria-label="Volver a categorías">
        ←
      </button>

      <div className="ready__title">
        <span className="ready__emoji" aria-hidden>
          {category.emoji}
        </span>
        <h2>{category.name}</h2>
      </div>

      <ol className="howto">
        <li>
          <strong>Pon el móvil en horizontal en tu frente</strong>, con la pantalla mirando a tus amigos.
        </li>
        <li>
          <span className="pill pill--ok">Cabeza abajo ↓</span> si aciertas.
        </li>
        <li>
          <span className="pill pill--pass">Cabeza arriba ↑</span> para pasar.
        </li>
      </ol>

      {(insecure || motionDenied) && (
        <p className="warn">
          {insecure
            ? 'El giroscopio necesita HTTPS. Mientras tanto, juega tocando la pantalla: derecha = acierto, izquierda = pasar.'
            : 'Sin permiso para el giroscopio. Puedes jugar tocando la pantalla: derecha = acierto, izquierda = pasar.'}
        </p>
      )}

      <button className="btn-start" onClick={onStart}>
        ¡Empezar!
      </button>
    </main>
  );
}
