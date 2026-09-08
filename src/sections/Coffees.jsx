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
    <div className="sizes">
      {sizes.map((s) => (
        <span key={s.label} className="sizes__item">
          <span className="sizes__label">{s.label}</span>
          {' '}${s.price}
        </span>
      ))}
    </div>
  );
}

function MoodGroup({ mood }) {
  const list = COFFEES.filter((c) => c.profile === mood.id);
  return (
    <div className="mood-group">
      <h3 className="mood-group__title">{mood.title}</h3>
      <ul className="coffee-list">
        {list.map((c) => (
          <li key={c.id} className="coffee-row">
            <div className="coffee-row__head">
              <span className="coffee-row__name">{c.name}</span>
              <span className="coffee-row__process">{c.process}</span>
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
    <Section id="coffees">
      <h2 className="sect-headline">
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
              className="mood-card"
            >
              <span className="mood-card__title">{m.title}</span>
              <span className="mood-card__blurb">{m.blurb}</span>
              <span className={dim ? 'mood-card__photo mood-card__photo--dim' : 'mood-card__photo'}>
                <Figure fpoLabel={m.photo} ratio="3 / 4" />
              </span>
            </button>
          );
        })}
      </div>

      {shown.map((m) => <MoodGroup key={m.id} mood={m} />)}
    </Section>
  );
}
