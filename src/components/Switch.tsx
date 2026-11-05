interface Props {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

/** Interruptor accesible: toda la fila es pulsable. */
export function Switch({ id, checked, onChange, label, description }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={`${id}-label`}
      aria-describedby={description ? `${id}-desc` : undefined}
      className="setting-row setting-row--switch"
      onClick={() => onChange(!checked)}
    >
      <span className="setting-row__text">
        <span id={`${id}-label`} className="setting-row__label">
          {label}
        </span>
        {description && (
          <span id={`${id}-desc`} className="setting-row__desc">
            {description}
          </span>
        )}
      </span>
      <span className={`switch ${checked ? 'switch--on' : ''}`} aria-hidden>
        <span className="switch__thumb" />
      </span>
    </button>
  );
}
