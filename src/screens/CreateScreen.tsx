import { useRef, useState, type CSSProperties, type FormEvent } from 'react';
import type { Category } from '../types';
import {
  EMOJI_CHOICES,
  MAX_NAME_LENGTH,
  MAX_WORD_LENGTH,
  MAX_WORDS,
  mergeWords,
  newCategoryId,
  readWordFiles,
} from '../lib/customCategories';

interface Props {
  customCategories: Category[];
  colors: string[];
  onSave: (category: Category) => boolean;
  onDelete: (id: string) => void;
}

interface Draft {
  id: string | null; // null = categoría nueva
  name: string;
  emoji: string;
  color: string;
  words: string[];
}

type Notice = { kind: 'ok' | 'warn'; text: string } | null;

/** Primer carácter visible (un emoji compuesto cuenta como uno). */
function firstGrapheme(text: string): string {
  const t = text.trim();
  if (!t) return '';
  if ('Segmenter' in Intl) {
    const seg = new Intl.Segmenter('es', { granularity: 'grapheme' });
    for (const { segment } of seg.segment(t)) return segment;
  }
  return Array.from(t)[0];
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function CreateScreen({ customCategories, colors, onSave, onDelete }: Props) {
  const empty = (): Draft => ({ id: null, name: '', emoji: EMOJI_CHOICES[0], color: colors[0], words: [] });
  const [draft, setDraft] = useState<Draft>(empty);
  const [wordInput, setWordInput] = useState('');
  const [customEmoji, setCustomEmoji] = useState('');
  const [notice, setNotice] = useState<Notice>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [triedSave, setTriedSave] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLHeadingElement>(null);

  const update = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));

  const addWords = (incoming: string[], source: 'manual' | 'file') => {
    const r = mergeWords(draft.words, incoming);
    update({ words: r.words });
    const parts = [`${plural(r.added, 'palabra añadida', 'palabras añadidas')}`];
    if (r.duplicates) parts.push(plural(r.duplicates, 'repetida ignorada', 'repetidas ignoradas'));
    if (r.overLimit) parts.push(`${r.overLimit} fuera del límite de ${MAX_WORDS}`);
    if (source === 'manual' && r.duplicates) {
      setNotice({ kind: 'warn', text: 'Esa palabra ya está en la lista.' });
    } else if (source === 'manual' && r.overLimit) {
      setNotice({ kind: 'warn', text: `Has llegado al máximo de ${MAX_WORDS} palabras.` });
    } else if (source === 'file' || r.duplicates || r.overLimit) {
      setNotice({ kind: r.added ? 'ok' : 'warn', text: parts.join(' · ') });
    } else {
      setNotice(null);
    }
  };

  const submitWord = (e: FormEvent) => {
    e.preventDefault();
    if (!wordInput.trim()) return;
    addWords([wordInput], 'manual');
    setWordInput('');
  };

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const { words, rejected } = await readWordFiles(files);
    if (fileRef.current) fileRef.current.value = '';
    if (rejected.length && !words.length) {
      setNotice({ kind: 'warn', text: `No se ha podido leer: ${rejected.join(', ')}. Usa archivos .csv o .txt.` });
      return;
    }
    addWords(words, 'file');
    if (rejected.length) {
      setNotice((n) => ({ kind: 'warn', text: `${n?.text ?? ''} · Ignorados: ${rejected.join(', ')}` }));
    }
  };

  const edit = (c: Category) => {
    setDraft({ id: c.id, name: c.name, emoji: c.emoji, color: c.color, words: [...c.words] });
    setNotice(null);
    setTriedSave(false);
    setConfirmDelete(null);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const reset = () => {
    setDraft(empty());
    setWordInput('');
    setCustomEmoji('');
    setTriedSave(false);
  };

  const name = draft.name.trim();
  const canSave = name.length > 0 && draft.words.length > 0;

  const save = () => {
    setTriedSave(true);
    if (!canSave) return;
    const saved = onSave({
      id: draft.id ?? newCategoryId(),
      name,
      emoji: draft.emoji,
      color: draft.color,
      words: draft.words,
      custom: true,
    });
    if (!saved) {
      setNotice({ kind: 'warn', text: 'No se ha podido guardar en este dispositivo (¿navegación privada?).' });
      return;
    }
    setNotice({ kind: 'ok', text: `«${name}» guardada. Ya puedes elegirla en Jugar.` });
    reset();
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="screen create-screen with-nav" style={{ '--accent': draft.color } as CSSProperties}>
      <h1 ref={topRef} className="page-title">
        {draft.id ? 'Editar categoría' : 'Nueva categoría'}
      </h1>

      {notice && (
        <p className={`notice notice--${notice.kind}`} role="status">
          {notice.text}
        </p>
      )}

      {/* Vista previa con el mismo aspecto que en la portada */}
      <div className="create-preview">
        <div className="card card--preview" aria-hidden>
          <span className="card__emoji">{draft.emoji}</span>
          <span className="card__name">{name || 'Tu categoría'}</span>
          <span className="card__count">{plural(draft.words.length, 'palabra', 'palabras')}</span>
        </div>
      </div>

      <section className="settings-group">
        <label htmlFor="cat-name" className="settings-group__title">
          Nombre
        </label>
        <input
          id="cat-name"
          className={`text-input ${triedSave && !name ? 'text-input--error' : ''}`}
          value={draft.name}
          maxLength={MAX_NAME_LENGTH}
          placeholder="Ej.: Series de los 90"
          autoComplete="off"
          onChange={(e) => update({ name: e.target.value })}
        />
        {triedSave && !name && <span className="field-error">Ponle un nombre a la categoría.</span>}
      </section>

      <section className="settings-group" aria-labelledby="emoji-title">
        <h2 id="emoji-title" className="settings-group__title">
          Emoji
        </h2>
        <div className="emoji-grid" role="radiogroup" aria-labelledby="emoji-title">
          {EMOJI_CHOICES.map((e) => (
            <button
              key={e}
              role="radio"
              aria-checked={draft.emoji === e}
              aria-label={e}
              className={`emoji-option ${draft.emoji === e ? 'emoji-option--on' : ''}`}
              onClick={() => update({ emoji: e })}
            >
              {e}
            </button>
          ))}
        </div>
        <label className="emoji-custom">
          <span>¿Otro? Escríbelo aquí</span>
          <input
            className="text-input text-input--emoji"
            value={customEmoji}
            placeholder="😎"
            aria-label="Escribe cualquier emoji"
            onChange={(e) => {
              const g = firstGrapheme(e.target.value);
              setCustomEmoji(g);
              if (g) update({ emoji: g });
            }}
          />
        </label>
      </section>

      <section className="settings-group" aria-labelledby="color-title">
        <h2 id="color-title" className="settings-group__title">
          Color
        </h2>
        <div className="color-row" role="radiogroup" aria-labelledby="color-title">
          {colors.map((c) => (
            <button
              key={c}
              role="radio"
              aria-checked={draft.color === c}
              aria-label={`Color ${c}`}
              className={`color-swatch ${draft.color === c ? 'color-swatch--on' : ''}`}
              style={{ '--swatch': c } as CSSProperties}
              onClick={() => update({ color: c })}
            />
          ))}
        </div>
      </section>

      <section className="settings-group" aria-labelledby="words-title">
        <h2 id="words-title" className="settings-group__title">
          Palabras · {draft.words.length}
        </h2>
        <form className="word-form" onSubmit={submitWord}>
          <input
            className="text-input"
            value={wordInput}
            maxLength={MAX_WORD_LENGTH}
            placeholder="Escribe una palabra o expresión"
            aria-label="Nueva palabra"
            autoComplete="off"
            enterKeyHint="done"
            onChange={(e) => setWordInput(e.target.value)}
          />
          <button type="submit" className="btn-add" disabled={!wordInput.trim()}>
            Añadir
          </button>
        </form>

        <input
          ref={fileRef}
          type="file"
          accept=".csv,.txt,text/csv,text/plain"
          multiple
          hidden
          onChange={(e) => void onFiles(e.target.files)}
        />
        <button type="button" className="btn-upload" onClick={() => fileRef.current?.click()}>
          <span aria-hidden>📄</span> Subir archivo .csv o .txt
        </button>
        <p className="hint">En .txt, una palabra por línea. En .csv, cada celda cuenta como una palabra.</p>

        {draft.words.length > 0 ? (
          <>
            <ul className="word-list" aria-label="Palabras de la categoría">
              {draft.words.map((w) => (
                <li key={w} className="word-chip">
                  <span>{w}</span>
                  <button
                    type="button"
                    aria-label={`Quitar ${w}`}
                    onClick={() => update({ words: draft.words.filter((x) => x !== w) })}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className="link-btn" onClick={() => update({ words: [] })}>
              Vaciar lista
            </button>
          </>
        ) : (
          <p className={`empty-words ${triedSave ? 'field-error' : ''}`}>Añade al menos una palabra.</p>
        )}
      </section>

      <div className="create-actions">
        <button className="btn-start" onClick={save} aria-disabled={!canSave}>
          {draft.id ? 'Guardar cambios' : 'Guardar categoría'}
        </button>
        {draft.id && (
          <button className="btn-ghost" onClick={reset}>
            Cancelar edición
          </button>
        )}
      </div>

      {customCategories.length > 0 && (
        <section className="settings-group" aria-labelledby="mine-title">
          <h2 id="mine-title" className="settings-group__title">
            Tus categorías
          </h2>
          <ul className="mine-list">
            {customCategories.map((c) => (
              <li key={c.id} className="mine-item" style={{ '--accent': c.color } as CSSProperties}>
                <span className="mine-item__emoji" aria-hidden>
                  {c.emoji}
                </span>
                <span className="mine-item__text">
                  <span className="mine-item__name">{c.name}</span>
                  <span className="mine-item__count">{plural(c.words.length, 'palabra', 'palabras')}</span>
                </span>
                {confirmDelete === c.id ? (
                  <span className="mine-item__actions">
                    <button className="mini-btn mini-btn--danger" onClick={() => { onDelete(c.id); setConfirmDelete(null); if (draft.id === c.id) reset(); }}>
                      Borrar
                    </button>
                    <button className="mini-btn" onClick={() => setConfirmDelete(null)}>
                      No
                    </button>
                  </span>
                ) : (
                  <span className="mine-item__actions">
                    <button className="mini-btn" onClick={() => edit(c)} aria-label={`Editar ${c.name}`}>
                      Editar
                    </button>
                    <button className="mini-btn" onClick={() => setConfirmDelete(c.id)} aria-label={`Borrar ${c.name}`}>
                      Borrar
                    </button>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
