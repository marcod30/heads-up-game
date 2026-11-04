import { useState } from 'react';
import type { Category, Settings, WordResult } from './types';
import { CATEGORIES } from './data/categories';
import { loadSettings, saveSettings } from './lib/utils';
import { unlockAudio } from './lib/sound';
import { enterImmersive, exitImmersive, requestMotionPermission } from './lib/device';
import { Home } from './screens/Home';
import { Ready } from './screens/Ready';
import { Game } from './screens/Game';
import { Results } from './screens/Results';

type Screen = 'home' | 'ready' | 'game' | 'results';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [category, setCategory] = useState<Category | null>(null);
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [results, setResults] = useState<WordResult[]>([]);
  const [motionDenied, setMotionDenied] = useState(false);
  const [round, setRound] = useState(0);

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

  if (screen === 'home' || !category) {
    return (
      <Home
        categories={CATEGORIES}
        settings={settings}
        onSettings={updateSettings}
        onPick={(c) => {
          setCategory(c);
          setScreen('ready');
        }}
      />
    );
  }

  if (screen === 'ready') {
    return <Ready category={category} motionDenied={motionDenied} onStart={start} onBack={() => setScreen('home')} />;
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
