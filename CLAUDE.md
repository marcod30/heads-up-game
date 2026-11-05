# Normas del repositorio

## Flujo de trabajo con Git

- **Nunca hagas commits directamente en `main`.** Cualquier cambio se hace en una rama nueva creada desde `main` actualizado (`git fetch origin main` antes de crearla).
- Nombra las ramas de forma descriptiva y en minúsculas con guiones, por ejemplo `ajustes-slider` o `fix-giro-ios`.
- Sube la rama a `origin` y propón una pull request hacia `main`; la integración en `main` la decide el propietario del repositorio.
- No hagas `push --force` a `main`.

## Proyecto

- Juego web (PWA) de adivinar palabras con el móvil: React + Vite + TypeScript, sin backend.
- `npm run build` ejecuta la comprobación de tipos (`tsc --noEmit`) y la build de Vite; debe pasar antes de proponer cambios.
- Textos de la interfaz y documentación en español.
