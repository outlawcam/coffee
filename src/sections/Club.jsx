// Coffee Club — framed as a clip-out newspaper coupon. Still pre-launch: the
// concept is tiered plans + a flavor questionnaire that matches you to a cup,
// so the top boxes are a 3-step "how it works". Enrollment is Coming Soon.
import React from 'react';
import { Seal } from './Seal.jsx';

const WIRE = 'var(--font-wire)';

const STEPS = [
  ['01', 'Choose a tier', 'From the occasional bag to the full club — pick the level that fits how you drink.'],
  ['02', 'Set your taste', 'A short flavor questionnaire: roast, fruit or chocolate, and how adventurous you want to get.'],
  ['03', 'Get your match', 'We recommend the cup that fits your profile and ship it, roasted to order, on your schedule.'],
];

function Step({ n, title, body, first }) {
  return (
    <div className={'bs-step' + (first ? ' bs-step-first' : '')} style={{ padding: '16px 18px 18px', borderLeft: first ? 'none' : '1px solid var(--ink-900)' }}>
      <p style={{ fontFamily: 'var(--font-head)', fontSize: 26, lineHeight: 1, color: 'var(--accent)', margin: '0 0 9px' }}>{n}</p>
      <p style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-900)', margin: '0 0 7px' }}>{title}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.5, color: 'var(--ink-500)', margin: 0 }}>{body}</p>
    </div>
  );
}

export function Club() {
  return (
    <section id="club" className="sect" style={{ background: 'var(--paper-200)', padding: '96px 40px', borderTop: '1px solid var(--border-hairline)', scrollMarginTop: 0 }}>
      <div style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-500)', margin: '0 0 14px' }}>The Club</p>
        <h2 className="h2" style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 40, letterSpacing: '-0.02em', color: 'var(--ink-fill)', WebkitTextStroke: '0.9px var(--ink-edge)', margin: '0 0 14px', lineHeight: 1.04 }}>Coffee, matched to your taste.</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.6, color: 'var(--ink-700)', margin: 0 }}>
          A membership built around your cup. Pick a tier, tell us how you take it, and we'll match you to the perfect roast — shipped on your schedule.
        </p>
      </div>

      {/* Clip-out coupon */}
      <div style={{ position: 'relative', maxWidth: 720, margin: '44px auto 0', background: 'var(--paper-000)', border: '2px dashed var(--ink-900)', padding: '38px 36px 32px' }}>
        {/* "clip here" scissors sitting on the dashed rule */}
        <span aria-hidden="true" style={{ position: 'absolute', top: -13, left: 34, background: 'var(--paper-000)', padding: '0 8px', fontSize: 18, color: 'var(--ink-700)' }}>✁</span>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 8px' }}>How it works</p>
          <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 34, letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--ink-fill)', WebkitTextStroke: '1px var(--ink-edge)', margin: 0, lineHeight: 1 }}>Coffee Club</h3>
        </div>

        <div style={{ height: 1, background: 'var(--ink-900)', margin: '26px 0' }} />

        {/* Three steps */}
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', border: '1px solid var(--ink-900)' }}>
          {STEPS.map(([n, title, body], i) => <Step key={n} n={n} title={title} body={body} first={i === 0} />)}
        </div>

        {/* Top-tier perk callout */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, border: '1px solid var(--ink-900)', borderTop: 'none', padding: '13px 18px' }}>
          <span style={{ flex: '0 0 auto', fontFamily: WIRE, fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)' }}>Top Tier</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.5, color: 'var(--ink-700)' }}>
            A quarterly bag of something extremely limited — plus a piece of Stancraft merch once a year.
          </span>
        </div>

        <p style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-300)', textAlign: 'center', margin: '24px 0 16px' }}>
          Enrollment opens with the online store
        </p>

        <div style={{ textAlign: 'center' }}>
          <button type="button" disabled aria-disabled="true"
            style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '13px 26px', color: 'var(--ink-300)', background: 'transparent', border: '1px solid var(--ink-200)', cursor: 'not-allowed' }}>
            Coming Soon
          </button>
        </div>

        {/* Approval stamp */}
        <Seal size={92} style={{ position: 'absolute', bottom: 18, right: 20, transform: 'rotate(-8deg)', opacity: 0.9 }} />
      </div>
    </section>
  );
}
