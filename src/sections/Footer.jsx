// Footer — one hairline and the contact line. Deliberately minimal.
import React from 'react';

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-hairline)', padding: '44px var(--sect-pad-x)', textAlign: 'center' }}>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: 'var(--ink-500)' }}>
        Stancraft Coffee Co. · Lufkin, TX
        <br />
        <a href="mailto:tyler@stancraftcoffee.com" style={{ color: 'var(--ink-900)', textDecoration: 'none' }}>
          tyler@stancraftcoffee.com
        </a>
      </p>
    </footer>
  );
}
