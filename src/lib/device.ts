// Permisos y ajustes del dispositivo que solo pueden pedirse tras un toque del usuario.

type IOSOrientationEvent = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'granted' | 'denied'>;
};

export type MotionPermission = 'granted' | 'denied' | 'unsupported';

/** iOS 13+ exige pedir permiso explícito (y HTTPS). Android/escritorio no lo necesitan. */
export async function requestMotionPermission(): Promise<MotionPermission> {
  if (typeof DeviceOrientationEvent === 'undefined') return 'unsupported';
  const DOE = DeviceOrientationEvent as IOSOrientationEvent;
  if (typeof DOE.requestPermission !== 'function') return 'granted';
  try {
    return (await DOE.requestPermission()) === 'granted' ? 'granted' : 'denied';
  } catch {
    return 'denied';
  }
}

/** Pantalla completa + bloqueo en horizontal (funciona en Android; iOS lo ignora). */
export async function enterImmersive(): Promise<void> {
  try {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
    }
    const orientation = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> };
    await orientation.lock?.('landscape');
  } catch {
    /* no soportado: el jugador girará el móvil a mano */
  }
}

export async function exitImmersive(): Promise<void> {
  try {
    screen.orientation?.unlock?.();
    if (document.fullscreenElement) await document.exitFullscreen();
  } catch {
    /* sin efecto */
  }
}
