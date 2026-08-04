// Shared section wrapper: max-width shell, vertical rhythm, bottom hairline.
import React from 'react';

export function Section({ id, children, last = false, style }) {
  return (
    <section
      id={id}
      style={{
        padding: 'var(--sect-pad-y) var(--sect-pad-x)',
        borderBottom: last ? 'none' : '1px solid var(--border-hairline)',
        scrollMarginTop: 0,
        ...style,
      }}
    >
      <div style={{ maxWidth: 'var(--shell-max)', margin: '0 auto' }}>{children}</div>
    </section>
  );
}
