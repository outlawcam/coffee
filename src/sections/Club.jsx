// Coffee Club — a standing-order subscription, framed as a clip-out newspaper
// subscription coupon. Stub: enrollment opens with the shop; CTA is an email.
import React from 'react';
import { Seal } from './Seal.jsx';

const WIRE = 'var(--font-wire)';

function Opt({ label, value, first }) {
  return (
    <div style={{ padding: '14px 18px', borderLeft: first ? 'none' : '1px solid var(--ink-900)', textAlign: 'center' }}>
      <p style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-300)', margin: '0 0 6px' }}>{label}</p>
      <p style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-900)', margin: 0, lineHeight: 1.5 }}>{value}</p>
    </div>
  );
}

export function Club() {
  return (
    <section id="club" className="sect" style={{ background: 'var(--paper-200)', padding: '96px 40px', borderTop: '1px solid var(--border-hairline)', scrollMarginTop: 72 }}>
      <div style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-500)', margin: '0 0 14px' }}>The Club</p>
        <h2 className="h2" style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 40, letterSpacing: '-0.02em', color: 'var(--ink-fill)', WebkitTextStroke: '0.9px var(--ink-edge)', margin: '0 0 14px', lineHeight: 1.04 }}>Never run out of good coffee.</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.6, color: 'var(--ink-700)', margin: 0 }}>
          A standing order for people who go through beans. Tell us how often and how much — we roast to your schedule and ship the day after it comes off the drum.
        </p>
      </div>

      {/* Clip-out subscription coupon */}
      <div style={{ position: 'relative', maxWidth: 720, margin: '44px auto 0', background: 'var(--paper-000)', border: '2px dashed var(--ink-900)', padding: '38px 36px 32px' }}>
        {/* "clip here" scissors sitting on the dashed rule */}
        <span aria-hidden="true" style={{ position: 'absolute', top: -13, left: 34, background: 'var(--paper-000)', padding: '0 8px', fontSize: 18, color: 'var(--ink-700)', transform: 'rotate(0deg)' }}>✁</span>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 8px' }}>Standing Order</p>
          <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 34, letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--ink-fill)', WebkitTextStroke: '1px var(--ink-edge)', margin: 0, lineHeight: 1 }}>Coffee Club</h3>
        </div>

        <div style={{ height: 1, background: 'var(--ink-900)', margin: '26px 0' }} />

        {/* Options, set as a ruled spec strip */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', border: '1px solid var(--ink-900)' }}>
          <Opt label="Deliver" value={<>Weekly<br />Biweekly<br />Monthly</>} first />
          <Opt label="Per Drop" value={<>One or two<br />12 oz bags</>} />
          <Opt label="Members" value={<>10% off<br />ships free</>} />
        </div>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6, color: 'var(--ink-500)', textAlign: 'center', margin: '24px auto 22px', maxWidth: '46ch' }}>
          Enrollment opens with the online store. Reserve a seat now and you'll be first in line when the club opens — no charge until it does.
        </p>

        <div style={{ textAlign: 'center' }}>
          <a href="mailto:tyler@stancraftcoffee.com?subject=Coffee%20Club%20%E2%80%94%20reserve%20a%20seat" className="bs-btn ink-box" style={{ display: 'inline-block', fontFamily: WIRE, fontWeight: 700, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', padding: '13px 26px', color: 'var(--paper-100)', border: 'none' }}>Reserve your seat →</a>
        </div>

        {/* Approval stamp */}
        <Seal size={72} style={{ position: 'absolute', bottom: 18, right: 20, transform: 'rotate(-8deg)', opacity: 0.9 }} />
      </div>
    </section>
  );
}
