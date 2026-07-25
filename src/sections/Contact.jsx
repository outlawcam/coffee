// Contact — directory-style details on the left, portrait (stub) on the right.
import React from 'react';

const WIRE = 'var(--font-wire)';

const ROWS = [
  ['Company', <span key="c" style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 18, letterSpacing: '0.01em', color: 'var(--ink-900)' }}>Stancraft Coffee&nbsp;Co.</span>],
  ['Address', <>1200 S First St<br />Lufkin, TX 75901</>],
  ['Phone', <a href="tel:+19365550142" className="link-accent" style={{ color: 'var(--ink-900)', textDecoration: 'none' }}>(936) 555-0142</a>],
  ['Email', <a href="mailto:hello@stancraftcoffee.com" className="link-accent" style={{ color: 'var(--accent)', textDecoration: 'none' }}>hello@stancraftcoffee.com</a>],
];

export function Contact() {
  return (
    <section id="contact" className="sect" style={{ background: 'var(--paper-100)', padding: '96px 40px', borderTop: '1px solid var(--border-hairline)', scrollMarginTop: 0 }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          {/* Details */}
          <div>
            <p style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-500)', margin: '0 0 14px' }}>Contact</p>
            <h2 className="h2" style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 40, letterSpacing: '-0.02em', color: 'var(--ink-fill)', WebkitTextStroke: '0.9px var(--ink-edge)', margin: '0 0 16px', lineHeight: 1.04 }}>Come say hello.</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.6, color: 'var(--ink-700)', margin: 0, maxWidth: '42ch' }}>
              Questions, wholesale, or just want to talk coffee? Reach the roastery — we answer every note ourselves.
            </p>

            <dl style={{ margin: '30px 0 0' }}>
              {ROWS.map(([label, value]) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: 16, padding: '15px 0', borderTop: '1px solid var(--ink-200)', alignItems: 'baseline' }}>
                  <dt style={{ fontFamily: WIRE, fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-300)' }}>{label}</dt>
                  <dd style={{ margin: 0, fontFamily: WIRE, fontWeight: 700, fontSize: 14, letterSpacing: '0.03em', color: 'var(--ink-900)', lineHeight: 1.55 }}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Portrait — stub; drop a photo into the image-slot to fill it. */}
          <figure className="halftone" style={{ margin: 0, position: 'relative', width: '100%', aspectRatio: '4 / 5', overflow: 'hidden', border: '1px solid var(--ink-900)', background: 'var(--paper-200)' }}>
            {/* Placeholder label sits BEHIND the slot; drop a `src` on the
                image-slot and the photo covers it automatically. */}
            <span aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: WIRE, fontWeight: 700, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-300)' }}>Portrait</span>
            <image-slot id="land-contact" shape="rect" fit="cover" src="/assets/craft.jpg" placeholder="Portrait — the roaster" style={{ position: 'absolute', inset: 0, zIndex: 2 }}></image-slot>
            <figcaption style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 3, fontFamily: WIRE, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--paper-100)', background: 'rgba(32,27,22,0.82)', padding: '7px 12px' }}>Fig. 3 — Come by the roastery.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
