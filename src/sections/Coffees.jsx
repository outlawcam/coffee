// Coffees — a text filter row over a grid of bag-label cards.
//
// Replaces the three mood cards (mellow / curious / funky), which both filtered
// the lineup and carried the section's photography. The filters are now plain
// text and single-select: "All" is the resting state rather than a cleared one,
// so clicking the active filter does nothing instead of toggling back off.
import React from 'react';
import { Section } from '../components/Section.jsx';
import { CoffeeCard } from '../components/CoffeeCard.jsx';
import { COFFEES } from '../data/coffees.js';

const FILTERS = [
  { id: 'all', label: 'All', match: () => true },
  { id: 'organic', label: 'Organic', match: (c) => c.organic },
  { id: 'non-organic', label: 'Non-Organic', match: (c) => !c.organic },
  { id: 'favorites', label: "Roaster's Favorites", match: (c) => !!c.roastersFav },
];

export function Coffees() {
  const [active, setActive] = React.useState('all');
  const filter = FILTERS.find((f) => f.id === active);
  const shown = COFFEES.filter(filter.match);

  return (
    <Section id="coffees">
      <h2 className="sect-headline">
        A coffee for everyone.
      </h2>

      <div className="filters" role="group" aria-label="Filter coffees">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={active === f.id}
            onClick={() => setActive(f.id)}
            className="filter"
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* A short summary string, replaced outright on every change. The grid
          below can't carry this itself: aria-relevant defaults to "additions
          text", so narrowing the list removes cards and announces nothing.
          See the long-form note in git history at 025e89a. */}
      <p className="sr-only" role="status">
        {active === 'all'
          ? `Showing all ${shown.length} coffees`
          : `Showing ${shown.length} ${shown.length === 1 ? 'coffee' : 'coffees'} — ${filter.label}`}
      </p>

      <ul className="bags">
        {shown.map((c) => <CoffeeCard key={c.id} coffee={c} />)}
      </ul>
    </Section>
  );
}
