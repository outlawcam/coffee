// Our Craft section — editorial. Global React.
import React from 'react';

export function Craft() {
  const principles = [
    ['flame', 'Roasted to order', 'We roast the week you buy and ship the next day. Nothing sits in a warehouse losing its voice.'],
    ['sprout', 'Sourced by relationship', 'We buy named lots from farmers and importers we return to season after season — not commodity bags off a spot market.'],
    ['bean', 'Whole bean, always', 'We do not grind. Fresh grinding at home is the single biggest upgrade to your cup, so we leave it in your hands.'],
  ];
  return (
    <section id="craft" style={{ background: 'var(--espresso-900)', color: 'var(--paper-100)', padding: '96px 40px', scrollMarginTop: 72 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        {/* Image */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 5', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
          <image-slot id="land-craft" shape="rect" placeholder="Roastery / makers photo"></image-slot>
        </div>
        {/* Text */}
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-300)', margin: '0 0 14px' }}>Our craft</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, letterSpacing: '-0.02em', margin: '0 0 20px', lineHeight: 1.06 }}>We roast to protect the cup, not to chase a color.</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.62, color: 'var(--paper-200)', margin: '0 0 34px', maxWidth: '48ch' }}>
            Stancraft is a small roastery run by people who drink a lot of coffee and are hard to please. Every origin earns its spot on a profile we dial by taste — light enough to keep what makes it worth buying, developed enough to be a pleasure to brew.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {principles.map(([icon, h, b], i) => (
              <div key={i} style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: '0 0 auto', width: 26, display: 'flex', justifyContent: 'center', color: 'var(--paper-200)', paddingTop: 2 }}>
                  <i data-lucide={icon} style={{ width: 20, height: 20 }}></i>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, margin: '2px 0 4px' }}>{h}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.55, color: 'var(--ink-300)', margin: 0 }}>{b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
