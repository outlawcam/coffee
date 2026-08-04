// Intro — wordmark and a single pill CTA. No nav; this section IS the header.
import React from 'react';

export function Intro() {
  return (
    <section
      id="top"
      style={{
        padding: '150px var(--sect-pad-x) 96px',
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
