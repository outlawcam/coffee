// Stancraft wordmark — the outlined Illustrator vector (public/assets/logo-new.svg),
// inlined so the theme drives its colors:
//   STANCRAFT  = ink paths (--ink-900)
//   COFFEE CO. = burgundy paths (--accent)
import React from 'react';
import { LOGO_VIEWBOX, LOGO_INK_PATHS, LOGO_COFFEE_PATHS } from './logo-paths.js';

export function Logo({ style, className, title = 'Stancraft Coffee Co.' }) {
  return (
    <svg className={className} viewBox={LOGO_VIEWBOX} role="img" aria-label={title}
      style={{ display: 'block', width: '100%', height: 'auto', ...style }}>
      <g fill="var(--ink-900)">
        {LOGO_INK_PATHS.map((d, i) => <path key={i} d={d} />)}
      </g>
      <g fill="var(--accent)">
        {LOGO_COFFEE_PATHS.map((d, i) => <path key={i} d={d} />)}
      </g>
    </svg>
  );
}
