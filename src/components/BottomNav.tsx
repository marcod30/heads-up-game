import type { ReactNode } from 'react';

export type Tab = 'play' | 'settings';

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
    <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
    <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
  </svg>
);

const GearIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export function BottomNav({ active, onChange }: Props) {
  const items: { tab: Tab; label: string; icon: ReactNode }[] = [
    { tab: 'play', label: 'Jugar', icon: <PlayIcon /> },
    { tab: 'settings', label: 'Ajustes', icon: <GearIcon /> },
  ];
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {items.map(({ tab, label, icon }) => (
        <button
          key={tab}
          className={`bottom-nav__item ${active === tab ? 'bottom-nav__item--on' : ''}`}
          aria-current={active === tab ? 'page' : undefined}
          onClick={() => onChange(tab)}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
