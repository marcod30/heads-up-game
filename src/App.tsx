import { useMemo, useState } from 'react';
import type { Settings, WordResult } from './types';
import { CATEGORIES, buildDeck } from './data/categories';
import { loadSettings, saveSettings } from './lib/utils';
import { unlockAudio } from './lib/sound';
import { enterImmersive, exitImmersive, requestMotionPermission } from './lib/device';
import { BottomNav } from './components/BottomNav';
import { Home } from './screens/Home';
import { SettingsScreen } from './screens/SettingsScreen';
import { Ready } from './screens/Ready';
import { Game } from './screens/Game';
import { Results } from './screens/Results';

type Screen = 'home' | 'settings' | 'ready' | 'game' | 'results';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  // Categorías marcadas en la portada (en el orden en que se eligieron)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [results, setResults] = useState<WordResult[]>([]);
  const [motionDenied, setMotionDenied] = useState(false);
  const [round, setRound] = useState(0);

  // Mazo de la partida: une las palabras de todas las categorías elegidas
  const category = useMemo(() => {
    const picked = selectedIds
      .map((id) => CATEGORIES.find((c) => c.id === id))
      .filter((c): c is (typeof CATEGORIES)[number] => Boolean(c));
    return picked.length ? buildDeck(picked) : null;
  }, [selectedIds]);

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
  if (screen === 'home' || screen === 'settings' || !category) {
    const tab = screen === 'settings' ? 'settings' : 'play';
    return (
      <>
        {tab === 'settings' ? (
          <SettingsScreen settings={settings} onChange={updateSettings} />
        ) : (
          <Home
            categories={CATEGORIES}
            selectedIds={selectedIds}
            wordCount={category?.words.length ?? 0}
            onToggle={toggleCategory}
            onClear={() => setSelectedIds([])}
            onPlay={() => category && setScreen('ready')}
          />
        )}
        <BottomNav active={tab} onChange={(t) => setScreen(t === 'settings' ? 'settings' : 'home')} />
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
