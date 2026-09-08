// Shared section wrapper: max-width shell, vertical rhythm, bottom hairline.
import React from 'react';

export function Section({ id, children, last = false }) {
  return (
    <section id={id} className={last ? 'section section--last' : 'section'}>
      <div className="shell">{children}</div>
    </section>
  );
}
