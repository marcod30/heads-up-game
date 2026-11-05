import { useMemo, useState } from 'react';
import type { Category, Settings, WordResult } from './types';
import { CATEGORIES, buildDeck } from './data/categories';
import { loadSettings, saveSettings } from './lib/utils';
import { unlockAudio } from './lib/sound';
import { enterImmersive, exitImmersive, requestMotionPermission } from './lib/device';
import { loadCustomCategories, saveCustomCategories } from './lib/customCategories';
import { BottomNav, type Tab } from './components/BottomNav';
import { Home } from './screens/Home';
import { SettingsScreen } from './screens/SettingsScreen';
import { CreateScreen } from './screens/CreateScreen';
import { Ready } from './screens/Ready';
import { Game } from './screens/Game';
import { Results } from './screens/Results';

type Screen = 'home' | 'create' | 'settings' | 'ready' | 'game' | 'results';

const TAB_SCREEN: Record<Tab, Screen> = { play: 'home', create: 'create', settings: 'settings' };
// Colores disponibles para las categorías propias: los mismos que usan las de serie
const COLORS = [...new Set(CATEGORIES.map((c) => c.color))];

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  // Categorías marcadas en la portada (en el orden en que se eligieron)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [results, setResults] = useState<WordResult[]>([]);
  const [motionDenied, setMotionDenied] = useState(false);
  const [round, setRound] = useState(0);
  const [customCategories, setCustomCategories] = useState<Category[]>(loadCustomCategories);
  // Primero las propias (las más recientes arriba), después las de serie
  const allCategories = useMemo(() => [...customCategories, ...CATEGORIES], [customCategories]);

  // Mazo de la partida: une las palabras de todas las categorías elegidas
  const category = useMemo(() => {
    const picked = selectedIds
      .map((id) => allCategories.find((c) => c.id === id))
      .filter((c): c is Category => Boolean(c));
    return picked.length ? buildDeck(picked) : null;
  }, [selectedIds, allCategories]);

  /** Crea o actualiza una categoría propia. Devuelve false si no se pudo guardar. */
  const saveCustom = (cat: Category) => {
    const exists = customCategories.some((c) => c.id === cat.id);
    const next = exists ? customCategories.map((c) => (c.id === cat.id ? cat : c)) : [cat, ...customCategories];
    if (!saveCustomCategories(next)) return false;
    setCustomCategories(next);
    return true;
  };

  const deleteCustom = (id: string) => {
    const next = customCategories.filter((c) => c.id !== id);
    saveCustomCategories(next);
    setCustomCategories(next);
    setSelectedIds((ids) => ids.filter((x) => x !== id));
  };

  const toggleCategory = (id: string) =>
    setSelectedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  const updateSettings = (s: Settings) => {
    setSettings(s);
    saveSettings(s);
  };

  // Todo esto debe ocurrir dentro del toque en "Empezar" (requisito de iOS/Android).
  const start = async () => {
    unlockAudio();
    const perm = await requestMotionPermission();
    setMotionDenied(perm === 'denied');
    await enterImmersive();
    setRound((r) => r + 1);
    setScreen('game');
  };

  const leaveGame = (next: Screen) => {
    void exitImmersive();
    setScreen(next);
  };

  // Pantallas principales con barra de navegación inferior
  if (screen === 'home' || screen === 'create' || screen === 'settings' || !category) {
    const tab: Tab = screen === 'settings' ? 'settings' : screen === 'create' ? 'create' : 'play';
    return (
      <>
        {tab === 'settings' ? (
          <SettingsScreen settings={settings} onChange={updateSettings} />
        ) : tab === 'create' ? (
          <CreateScreen
            customCategories={customCategories}
            colors={COLORS}
            onSave={saveCustom}
            onDelete={deleteCustom}
          />
        ) : (
          <Home
            categories={allCategories}
            selectedIds={selectedIds}
            wordCount={category?.words.length ?? 0}
            onToggle={toggleCategory}
            onClear={() => setSelectedIds([])}
            onPlay={() => category && setScreen('ready')}
          />
        )}
        <BottomNav active={tab} onChange={(t) => setScreen(TAB_SCREEN[t])} />
      </>
    );
  }

  if (screen === 'ready') {
    return (
      <Ready
        category={category}
        motionDenied={motionDenied}
        invertTilt={settings.invertTilt}
        onStart={start}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'game') {
    return (
      <Game
        key={round}
        category={category}
        settings={settings}
        onQuit={() => leaveGame('ready')}
        onFinish={(r) => {
          setResults(r);
          leaveGame('results');
        }}
      />
    );
  }

  return <Results category={category} results={results} onAgain={() => setScreen('ready')} onHome={() => setScreen('home')} />;
}
