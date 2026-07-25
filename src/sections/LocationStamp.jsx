// Origin stamp: the coffee's continent drawn as thin oxblood outlines with the
// source country filled solid — roughened by a displacement filter so it reads
// like an ink stamp pressed onto the label.
import React from 'react';
import { CONTINENTS, STAMPS } from './geo-stamps.js';

export function LocationStamp({ region, size = 76, color = 'var(--accent)', style, className }) {
  const uid = React.useId().replace(/[:]/g, '');
  const info = STAMPS[region];
  if (!info) return null;
  const cont = CONTINENTS[info.continent];
  if (!cont) return null;

  const [, , w, h] = cont.viewBox.split(' ').map(Number);
  const aspect = w / h;
  const width = aspect >= 1 ? size : size * aspect;
  const height = aspect >= 1 ? size / aspect : size;
  const fid = 'inkstamp-' + uid;

  return (
    <svg className={className} viewBox={cont.viewBox} width={width} height={height} role="img" aria-label={`Origin — ${region}`} style={{ display: 'block', overflow: 'visible', ...style }}>
      <defs>
        <filter id={fid} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="1" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.9" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter={`url(#${fid})`} stroke={color} strokeWidth="0.7" strokeLinejoin="round">
        {cont.countries.map(c => (
          <path key={c.id} d={c.d} fill={c.id === info.iso ? color : 'none'} fillRule="evenodd" />
        ))}
      </g>
    </svg>
  );
}
