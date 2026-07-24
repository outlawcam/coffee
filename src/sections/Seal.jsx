// Circular roaster's stamp — text-on-path ring + coffee-bean mark. Reused as the
// small-batch maker's seal. Sizing/color via props; each instance gets unique
// path ids so multiple seals can coexist on the page.
import React from 'react';

export function Seal({ size = 96, color = 'var(--accent)', style, className }) {
  const uid = React.useId().replace(/[:]/g, '');
  const topId = 'seal-t-' + uid, botId = 'seal-b-' + uid;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Stancraft Coffee Co. — Small Batch, Lufkin TX" style={{ display: 'block', ...style }}>
      <defs>
        <path id={topId} d="M 13 50 A 37 37 0 0 1 87 50" fill="none" />
        <path id={botId} d="M 15 50 A 35 35 0 0 0 85 50" fill="none" />
      </defs>
      <circle cx="50" cy="50" r="47.5" fill="none" stroke={color} strokeWidth="1.3" />
      <circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="0.5" />
      <circle cx="50" cy="50" r="30" fill="none" stroke={color} strokeWidth="0.9" />
      <g fill={color} fontFamily="var(--font-wire)" fontWeight="700" fontSize="6.6" letterSpacing="1.1">
        <text><textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">STANCRAFT · COFFEE · CO.</textPath></text>
        <text><textPath href={`#${botId}`} startOffset="50%" textAnchor="middle">SMALL BATCH · WHOLE BEAN</textPath></text>
      </g>
      {/* dot separators at the ring's sides */}
      <circle cx="9.5" cy="50" r="1.4" fill={color} />
      <circle cx="90.5" cy="50" r="1.4" fill={color} />
      {/* center coffee-bean mark */}
      <g transform="rotate(-18 50 47)" stroke={color} strokeWidth="1.4" fill="none">
        <ellipse cx="50" cy="47" rx="7.5" ry="11" />
        <path d="M 50 37 C 46 43 46 51 50 57" />
      </g>
      <text x="50" y="65.5" textAnchor="middle" fill={color} fontFamily="var(--font-wire)" fontWeight="700" fontSize="5" letterSpacing="1.4">LUFKIN TX</text>
    </svg>
  );
}
