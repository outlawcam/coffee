// Circular roaster's stamp — two equal-weight rings, "Small Batch" / "Whole
// Bean" set in Flapjack centered between them, and a SOLID coffee bean whose
// center crease is knocked out (transparent, so the page shows through). The
// bean carries the print-halo (pooled-ink edge) via an SVG inner shadow.
import React from 'react';

export function Seal({ size = 120, color = 'var(--accent)', style, className }) {
  const uid = React.useId().replace(/[:]/g, '');
  const topId = 'seal-t-' + uid, botId = 'seal-b-' + uid;
  const beanMask = 'bean-m-' + uid, halo = 'bean-h-' + uid;
  const beanTf = 'rotate(-18 50 45)';
  const beanGeo = { cx: 50, cy: 45, rx: 8, ry: 11.5 };
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Stancraft — Small Batch, Whole Bean, Lufkin TX" style={{ display: 'block', ...style }}>
      <defs>
        {/* arcs at the band midpoint (r=39, between rings at 31.5 and 46.5) */}
        <path id={topId} d="M 11 50 A 39 39 0 0 1 89 50" fill="none" />
        <path id={botId} d="M 11 50 A 39 39 0 0 0 89 50" fill="none" />
        {/* bean: white = solid, black crease = knocked out (transparent) */}
        <mask id={beanMask}>
          <ellipse {...beanGeo} transform={beanTf} fill="#fff" />
          <path d="M 50 34.5 C 45.5 41 45.5 49 50 55.5" transform={beanTf} fill="none" stroke="#000" strokeWidth="1.9" strokeLinecap="round" />
        </mask>
        {/* print halo — dark ink pooled at the (masked) edges */}
        <filter id={halo} x="-40%" y="-40%" width="180%" height="180%">
          <feComponentTransfer in="SourceAlpha" result="inv"><feFuncA type="table" tableValues="1 0" /></feComponentTransfer>
          <feGaussianBlur in="inv" stdDeviation="1.1" result="b" />
          <feFlood floodColor="#1e0504" floodOpacity="0.55" result="c" />
          <feComposite in="c" in2="b" operator="in" result="s" />
          <feComposite in="s" in2="SourceAlpha" operator="in" result="inner" />
          <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="inner" /></feMerge>
        </filter>
      </defs>

      {/* two rings, same thickness */}
      <circle cx="50" cy="50" r="46.5" fill="none" stroke={color} strokeWidth="1.4" />
      <circle cx="50" cy="50" r="31.5" fill="none" stroke={color} strokeWidth="1.4" />

      {/* ring legend — Flapjack, centered on the midline via dominant-baseline */}
      <g fill={color} fontFamily="var(--font-head)" fontSize="9.5" letterSpacing="0.8" dominantBaseline="central">
        <text><textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">SMALL BATCH</textPath></text>
        <text><textPath href={`#${botId}`} startOffset="50%" textAnchor="middle">WHOLE BEAN</textPath></text>
      </g>

      {/* dot separators between the rings, at the sides */}
      <circle cx="10.5" cy="50" r="1.6" fill={color} />
      <circle cx="89.5" cy="50" r="1.6" fill={color} />

      {/* solid bean, crease knocked out, pooled-ink edge */}
      <g filter={`url(#${halo})`}>
        <ellipse {...beanGeo} transform={beanTf} fill={color} mask={`url(#${beanMask})`} />
        <ellipse {...beanGeo} transform={beanTf} fill="none" stroke="var(--red-600)" strokeWidth="1.1" mask={`url(#${beanMask})`} />
      </g>

      {/* center label — Flapjack */}
      <text x="50" y="66.5" textAnchor="middle" fill={color} fontFamily="var(--font-head)" fontSize="7.5" letterSpacing="0.5">LUFKIN TX</text>
    </svg>
  );
}
