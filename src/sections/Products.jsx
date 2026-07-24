// Products — the lineup rendered as a sheet of small-batch coffee LABELS.
// Boxed frame, maker + batch №, rotated side tabs, spec footer, mono copy. Global React.
import React from 'react';
import { Seal } from './Seal.jsx';
import { LocationStamp } from './LocationStamp.jsx';

const WIRE = 'var(--font-wire)';

function Spec({ label, value, accent, first }) {
  return (
    <div style={{ padding: '9px 13px', borderLeft: first ? 'none' : '1px solid var(--ink-900)', minWidth: 0 }}>
      <p style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-300)', margin: '0 0 3px' }}>{label}</p>
      <p style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: accent ? 'var(--accent)' : 'var(--ink-900)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</p>
    </div>
  );
}

function CoffeeCard({ c }) {
  const eightOz = /8\s*oz/i.test(c.tag || '');
  const netWt = eightOz ? '8 oz · 227 g' : '12 oz · 340 g';
  const stamp = c.tag ? c.tag.split('·')[0].trim() : '';
  return (
    <article style={{ position: 'relative', border: '1px solid var(--ink-900)', background: 'var(--paper-000)', display: 'flex', flexDirection: 'column' }}>
      {/* Header: maker line. Right space reserved for a future SKU. */}
      <div style={{ borderBottom: '1px solid var(--ink-900)' }}>
        <span style={{ display: 'block', padding: '9px 14px', fontFamily: WIRE, fontWeight: 700, fontSize: 10, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--ink-700)' }}>Stancraft Coffee Co.</span>
      </div>

      {/* Body */}
      <div style={{ position: 'relative', flex: 1, padding: '22px 22px 22px', textAlign: 'center' }}>
        <LocationStamp region={c.region} size={72} style={{ margin: '0 auto 14px', transform: 'rotate(-6deg)', opacity: 0.9 }} />
        <p style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-300)', margin: '0 0 8px' }}>{c.region}</p>
        <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 27, lineHeight: 1.02, letterSpacing: '0.01em', textTransform: 'uppercase', color: 'var(--ink-fill)', WebkitTextStroke: '0.55px var(--ink-edge)', margin: 0 }}>{c.name}</h3>
        <p style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-500)', margin: '11px 0 0' }}>{c.process}</p>
        <div style={{ width: 26, height: 1, background: 'var(--ink-300)', margin: '15px auto' }} />
        <p style={{ fontFamily: WIRE, fontSize: 10.5, lineHeight: 1.75, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--ink-700)', margin: 0 }}>{c.notes}</p>

        {/* Limited / Decaf overprint stamp */}
        {c.tag && (
          <span style={{ position: 'absolute', top: 12, right: 12, transform: 'rotate(7deg)', border: `1.5px solid ${c.tag === 'Decaf' ? 'var(--ink-700)' : 'var(--accent)'}`, color: c.tag === 'Decaf' ? 'var(--ink-700)' : 'var(--accent)', fontFamily: WIRE, fontWeight: 700, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 8px', background: 'rgba(242,236,221,0.75)' }}>{stamp}</span>
        )}
      </div>

      {/* Spec footer */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr 0.9fr', borderTop: '1px solid var(--ink-900)' }}>
        <Spec label="Roast" value={c.roast} first />
        <Spec label="Net Wt" value={netWt} />
        <Spec label="Price" value={'$' + c.price} accent />
      </div>
    </article>
  );
}

function CoffeeGroup({ label, list }) {
  if (list.length === 0) return null;
  return (
    <div>
      <div style={{ paddingBottom: 14, borderBottom: '1px solid var(--ink-900)', marginBottom: 34 }}>
        <h3 style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-700)', margin: 0 }}>{label}</h3>
      </div>
      <div className="grid-products" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
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
  const match = (c) => active.every(m => (c.methods || []).includes(m));
  const organic = C.organic.filter(match);
  const nonOrganic = C.nonOrganic.filter(match);
  const empty = organic.length === 0 && nonOrganic.length === 0;

  return (
    <section id="products" className="sect" style={{ position: 'relative', background: 'var(--paper-100)', padding: '96px 40px', scrollMarginTop: 72 }}>
      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto' }}>
        {/* Maker's seal, stamped on the lineup sheet */}
        <Seal className="bs-seal" size={128} style={{ position: 'absolute', top: -8, right: 0, transform: 'rotate(-7deg)', opacity: 0.92 }} />

        <div style={{ maxWidth: 620, marginBottom: 38 }}>
          <p style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-500)', margin: '0 0 14px' }}>The lineup</p>
          <h2 className="h2" style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 40, letterSpacing: '-0.02em', color: 'var(--ink-fill)', WebkitTextStroke: '0.9px var(--ink-edge)', margin: '0 0 14px', lineHeight: 1.04 }}>The coffees.</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.6, color: 'var(--ink-500)', margin: 0 }}>
            Whole bean, roasted to order — each lot labeled and dated like the small batch it is. Prices per 12&nbsp;oz bag unless noted.
          </p>
        </div>

        {/* Brew-method filter — multi-select, AND */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 50 }}>
          <span style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-300)', marginRight: 4 }}>Brew for</span>
          {BREW_METHODS.map(([key, label]) => {
            const on = active.includes(key);
            return (
              <button key={key} onClick={() => toggle(key)} className={'brewpill' + (on ? ' ink-box' : '')} style={{
                fontFamily: WIRE, fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '9px 16px', cursor: 'pointer', whiteSpace: 'nowrap',
                background: on ? 'var(--ink-900)' : 'transparent',
                color: on ? 'var(--paper-100)' : 'var(--ink-700)',
                border: `1px solid ${on ? 'var(--ink-900)' : 'var(--ink-200)'}`,
                transition: 'background var(--dur) var(--ease-standard), color var(--dur) var(--ease-standard), border-color var(--dur) var(--ease-standard)',
              }}>{label}</button>
            );
          })}
          {active.length > 0 && (
            <button onClick={() => setActive([])} style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-300)', background: 'none', border: 'none', cursor: 'pointer', marginLeft: 4 }}>Clear</button>
          )}
        </div>

        {empty ? (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--ink-500)', margin: '8px 0 0' }}>
            No coffees match all of those brew methods. Try removing one.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            <CoffeeGroup label="Organic" list={organic} />
            <CoffeeGroup label="Non-organic" list={nonOrganic} />
          </div>
        )}
      </div>
    </section>
  );
}
