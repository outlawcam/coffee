// Intro — wordmark and a single pill CTA. No nav; this section IS the header.
import React from 'react';

export function Intro() {
  return (
    <section
      id="top"
      style={{
        // 75vh, centered. minHeight (not height) so a short viewport or a
        // zoomed-in browser lets the content push the section taller instead
        // of clipping it; borderBox keeps the padding inside the 75vh.
        minHeight: '75vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px var(--sect-pad-x)',
        textAlign: 'center',
        borderBottom: '1px solid var(--border-hairline)',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <img
          src="/assets/logo-stancraft.svg"
          alt="Stancraft Coffee Co."
          style={{ width: 'min(440px, 82vw)', height: 'auto', display: 'block', margin: '0 auto' }}
        />
      </h1>
      <a
        href="#coffees"
        style={{
          display: 'inline-block',
          marginTop: 56,
          background: 'var(--ink-900)',
          color: 'var(--paper-100)',
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          padding: '15px 32px',
          borderRadius: 'var(--radius-pill)',
        }}
      >
        Shop here
      </a>
    </section>
  );
}
