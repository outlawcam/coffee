// Coffees — three mood cards that filter the lineup below them.
//
// Default state lists all 11 coffees under all three moods, so the section is
// informative with no interaction. Clicking a mood narrows to it and dims the
// other two; clicking the active mood again clears back to everything.
import React from 'react';
import { Section } from '../components/Section.jsx';
import { Figure } from '../components/Figure.jsx';
import { COFFEES } from '../data/coffees-2026-07.js';

const MOODS = [
  { id: 'mellow', title: 'Something mellow', blurb: 'A flavorful and smooth cup, enjoyed by all.',
    photo: 'Mellow — portrait' },
  { id: 'curious', title: 'Something curious', blurb: 'Need something a bit more dynamic? This is your bag.',
    photo: 'Curious — portrait' },
  { id: 'funky', title: 'Something funky', blurb: 'Be ready for an other-worldly cup of coffee.',
    photo: 'Funky — portrait' },
];

function SizeLadder({ sizes }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 18px', marginTop: 6 }}>
      {sizes.map((s) => (
        <span key={s.label} style={{ fontSize: 15, color: 'var(--ink-500)', whiteSpace: 'nowrap' }}>
          <span style={{ fontWeight: 700, color: 'var(--ink-900)' }}>{s.label}</span>
          {' '}${s.price}
        </span>
      ))}
    </div>
  );
}

function MoodGroup({ mood }) {
  const list = COFFEES.filter((c) => c.profile === mood.id);
  return (
    <div style={{ marginTop: 48 }}>
      <h3 style={{
        fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--ink-500)', margin: '0 0 4px', paddingBottom: 12,
        borderBottom: '1px solid var(--border-hairline)',
      }}>
        {mood.title}
      </h3>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {list.map((c) => (
          <li key={c.id} style={{ padding: '18px 0', borderBottom: '1px solid var(--border-hairline)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0 12px' }}>
              <span style={{ fontWeight: 700, fontSize: 17, color: 'var(--ink-900)' }}>{c.name}</span>
              <span style={{ fontSize: 14, color: 'var(--ink-500)' }}>{c.process}</span>
            </div>
            <SizeLadder sizes={c.sizes} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Coffees() {
  const [activeMood, setActiveMood] = React.useState(null);
  const shown = activeMood ? MOODS.filter((m) => m.id === activeMood) : MOODS;

  return (
    <Section id="coffees" last>
      <h2 className="sect-headline" style={{ fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 44px' }}>
        A coffee for everyone.
      </h2>

      <div className="moods">
        {MOODS.map((m) => {
          const on = activeMood === m.id;
          const dim = activeMood !== null && !on;
          return (
            <button
              key={m.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActiveMood(on ? null : m.id)}
              style={{
                display: 'block', textAlign: 'left', background: 'none', border: 'none',
                padding: 0, cursor: 'pointer', fontFamily: 'var(--font-body)',
                opacity: dim ? 0.35 : 1, transition: 'opacity 200ms ease',
              }}
            >
              <span style={{
                display: 'block', fontWeight: 700, fontSize: 14, letterSpacing: '0.04em',
                textTransform: 'uppercase', color: 'var(--ink-900)', marginBottom: 6,
              }}>
                {m.title}
              </span>
              <span style={{ display: 'block', fontSize: 15, lineHeight: 1.5, color: 'var(--ink-900)', marginBottom: 18 }}>
                {m.blurb}
              </span>
              <Figure label={m.photo} ratio="3 / 4" />
            </button>
          );
        })}
      </div>

      {shown.map((m) => <MoodGroup key={m.id} mood={m} />)}
    </Section>
  );
}
