# ¡Adivina! 🎉

Juego de adivinar palabras para jugar en grupo con el móvil, al estilo *Heads Up!*.
Es una web (PWA): se abre desde el navegador, se puede instalar en la pantalla de inicio y funciona sin conexión.

## Cómo se juega

1. Elige una categoría.
2. Pulsa **¡Empezar!** y colócate el móvil **en horizontal sobre la frente**, con la pantalla mirando a tus amigos.
3. Tus amigos te describen la palabra sin decirla.
   - **Cabeza abajo** (pantalla hacia el suelo) → ✅ acierto
   - **Cabeza arriba** (pantalla hacia el techo) → ⏭️ pasar
   - Se puede invertir en **Ajustes → Invertir giro** (arriba = acierto, abajo = pasar).
4. Al acabar el tiempo verás el resumen de la ronda.

Sin giroscopio también se puede jugar tocando: **mitad derecha = acierto, mitad izquierda = pasar**.
En el ordenador: **↓/↑** imitan la cabeza (respetan *Invertir giro*), **→** acierto, **←** pasar, **Esc** salir.

## Ajustes

Desde el engranaje de la barra inferior: duración de la ronda (30–120 s), efectos de sonido e *Invertir giro*.
Se guardan en el propio móvil (`localStorage`).

## Stack

- React 19 + TypeScript + Vite
- Sin backend: las categorías están en `src/data/categories.ts`
- PWA con `manifest.webmanifest` y un service worker sencillo (`public/sw.js`)
- APIs del navegador: `DeviceOrientationEvent`, Wake Lock, Fullscreen + Screen Orientation, Vibration, Web Audio

## Desarrollo

```bash
npm install
npm run dev        # abre http://localhost:5173 y la IP de tu red
npm run build      # genera dist/
npm run preview    # sirve la build
```

### Probar en el móvil

El giroscopio **solo funciona con HTTPS** (en iOS, además, hay que conceder permiso al pulsar *Empezar*).
Opciones:

- Desplegar en GitHub Pages (abajo) y abrir la URL en el móvil.
- O exponer el servidor local con un túnel HTTPS, p. ej. `npx localtunnel --port 5173` o `cloudflared tunnel --url http://localhost:5173`.

Por HTTP en la red local la app funciona, pero solo con los controles táctiles.

## Despliegue en GitHub Pages

El workflow `.github/workflows/deploy.yml` compila y publica en cada push a `main`.
Solo hay que activarlo una vez: **Settings → Pages → Source: GitHub Actions**.
La app quedará en `https://<usuario>.github.io/heads-up-game/`.

## Cómo funciona la detección del giro

`src/hooks/useTilt.ts` calcula hacia dónde apunta la pantalla con `z = cos(beta)·cos(gamma)`:
≈0 en posición de juego, negativo hacia el suelo, positivo hacia el techo. Así no importa hacia qué lado
esté girado el móvil. Hay histéresis (dispara a ±0.55 y se rearma por debajo de 0.3) para evitar dobles lecturas.

Si el móvil tiene bloqueada la rotación en vertical (habitual en iOS), la partida gira el contenido
por su cuenta según el sensor (`useStageRotation` en `Game.tsx`).

## Añadir categorías

Añade un objeto a `CATEGORIES` en `src/data/categories.ts`:

```ts
{ id: 'musica', name: 'Música', emoji: '🎸', color: '#f472b6', words: ['Guitarra', 'Karaoke', ...] }
```

## Próximos pasos

- [ ] Probar umbrales del giro en iOS y Android reales
- [ ] Mazos personalizados guardados en el móvil
- [ ] Modo por equipos con marcador
- [ ] Evitar repetir palabras entre rondas
