// Products — minimalist. Two groups (organic / non-organic), airy grid, type-led. Global React.
import React from 'react';

function CoffeeCard({ c }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%', aspectRatio: '1 / 1', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        <image-slot id={`land-${c.id}`} shape="rect" fit="contain" src="/assets/bean-placeholder-50.png" placeholder={`${c.region} — bean or region photo`}></image-slot>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '18px 0 0' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-300)', margin: '0 0 5px' }}>{c.region}</p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.01em', color: 'var(--ink-900)', margin: 0, lineHeight: 1.12 }}>{c.name}</h3>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-500)', margin: '7px 0 0' }}>{c.process} · {c.roast}</p>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.5, color: 'var(--ink-500)', margin: 0 }}>{c.notes}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginTop: 2 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--ink-900)' }}>${c.price}</span>
          {c.tag && (
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.tag === 'Decaf' ? 'var(--yellow-700)' : 'var(--accent)' }}>{c.tag}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function CoffeeGroup({ label, list }) {
  if (list.length === 0) return null;
  return (
    <div>
      <div style={{ paddingBottom: 16, borderBottom: '1px solid var(--border-hairline)', marginBottom: 40 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-500)', margin: 0 }}>{label}</h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px 30px' }}>
        {list.map(c => <CoffeeCard key={c.id} c={c} />)}
      </div>
    </div>
  );
}

const BREW_METHODS = [['drip', 'Drip'], ['espresso', 'Espresso'], ['cold', 'Cold Brew'], ['french', 'French Press']];

export function Products() {
  const C = window.STANCRAFT_COFFEES;
  const [active, setActive] = React.useState([]);
  const toggle = (m) => setActive(a => a.includes(m) ? a.filter(x => x !== m) : [...a, m]);
  // AND filter: a lot must support every selected method.
  const match = (c) => active.every(m => (c.methods || []).includes(m));
  const organic = C.organic.filter(match);
  const nonOrganic = C.nonOrganic.filter(match);
  const empty = organic.length === 0 && nonOrganic.length === 0;

  return (
    <section id="products" style={{ background: 'var(--paper-100)', padding: '96px 40px', scrollMarginTop: 72 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ maxWidth: 620, marginBottom: 40 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-500)', margin: '0 0 14px' }}>The lineup</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, letterSpacing: '-0.02em', color: 'var(--ink-900)', margin: '0 0 14px', lineHeight: 1.04 }}>The coffees.</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.6, color: 'var(--ink-500)', margin: 0 }}>
            Whole bean, roasted to order. Prices are per 12 oz bag unless noted.
          </p>
        </div>

        {/* Brew-method filter — multi-select, AND */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 56 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-300)', marginRight: 4 }}>Brew for</span>
          {BREW_METHODS.map(([key, label]) => {
            const on = active.includes(key);
            return (
              <button key={key} onClick={() => toggle(key)} style={{
                fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '9px 16px', borderRadius: 'var(--radius-pill)', cursor: 'pointer', whiteSpace: 'nowrap',
                background: on ? 'var(--ink-900)' : 'transparent',
                color: on ? 'var(--paper-100)' : 'var(--ink-700)',
                border: `1px solid ${on ? 'var(--ink-900)' : 'var(--ink-200)'}`,
                transition: 'background var(--dur) var(--ease-standard), color var(--dur) var(--ease-standard), border-color var(--dur) var(--ease-standard)',
              }}>{label}</button>
            );
          })}
          {active.length > 0 && (
            <button onClick={() => setActive([])} style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-300)', background: 'none', border: 'none', cursor: 'pointer', marginLeft: 4 }}>Clear</button>
          )}
        </div>

        {empty ? (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--ink-500)', margin: '8px 0 0' }}>
            No coffees match all of those brew methods. Try removing one.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 72 }}>
            <CoffeeGroup label="Organic" list={organic} />
            <CoffeeGroup label="Non-organic" list={nonOrganic} />
          </div>
        )}
      </div>
    </section>
  );
}
