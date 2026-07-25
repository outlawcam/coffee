// Texas outline (2px, non-scaling) with a heart over Lufkin. Geometry projected
// from a lon/lat states GeoJSON; heart placed at Lufkin's real coordinates
// (31.34 N, 94.72 W). It's fine that the heart covers more than the city.
import React from 'react';

const TX = "M36.8 0L50.6 0L50.6 17.3L51.2 17.2L52.9 18.9L53.9 18.6L56.3 18.7L56.8 20.4L58.4 20.3L60 21.1L61.5 21L62.2 21.7L63.1 20.9L64.6 21.3L65.2 22.3L66.3 22.4L66.9 23.6L68.2 22.5L70 23.1L70.7 23.9L71.6 23.5L72.2 24.6L74.1 22.6L74.7 23.7L76.3 23.7L77.9 24.3L78.5 25.1L80 23.7L81.6 23.3L82.4 23.8L84.2 22.9L84.6 23.4L86.6 23.4L87.1 22.6L89 23.5L89.8 24.6L92.7 25.5L93.5 26.4L95 25.9L96.1 26.3L96.1 31L96.1 40.2L97.7 42.1L97.8 44.1L99.9 47.7L100 49.6L99.2 51.9L98.5 52.8L98.7 54L98.2 55L98.7 56.7L97 59.8L97.6 60.7L96.4 60.8L92.4 62L91 61.3L90.7 59.8L89.7 60.9L89 60.6L88.6 61.9L89.4 62.4L89.6 64.1L88.1 65.8L85.8 68L81.3 70.4L80.8 70L79.4 70.6L79.4 70L77.5 70.4L76.6 69.3L76.1 69.6L78.1 71.9L76.6 72.6L75.2 72.1L75 73.8L73.3 75.4L71.6 78.5L70.4 81.7L69.6 81.5L69.4 82.6L70.3 82.3L69.9 84.7L69.3 84.8L69.2 86.1L69.9 86.8L70.1 89.5L71 90.4L71.2 92.2L71.9 93.7L69.5 94.6L68.6 93.4L66.8 93L64.4 93.1L62.3 91.6L60.8 91.5L59.6 90.3L58 89.9L57 88.8L56.2 86.1L54.9 84.5L55 83.1L54.4 81.7L54.6 80.4L53.7 79L52.9 78.8L51.6 77.6L51.1 76L50 74.5L48.4 73.3L47.6 70.6L46.8 69.8L45.8 67.7L45.5 65.9L44.6 64.7L42.9 63.6L42.5 62.8L41 62.1L39.9 60.1L36.5 59.7L34.5 59.8L32.8 59.1L32.4 60L30.6 60.3L29.2 62.2L28.4 65.2L27.9 65.2L26.9 67L25.6 67L23.8 65.7L19 63.5L18.1 62.3L16.3 61.2L15 58.6L14.9 56.3L13.6 54.5L13.3 52.9L12.5 51.8L9.5 50.3L7.9 48.3L6.6 47.5L5.3 45.8L3.3 44.9L2 42.5L0.9 42L0 41L0.2 40.1L27.3 40.1L27.3 31.2L27.4 22.2L27.5 0L27.8 0L36.8 0Z";
// Heart centered at origin (~13 wide), placed over Lufkin.
const HEART = "M0 3.6C-2.2 1.4-5 -0.2-5 -2.4C-5 -4.6-2.4 -5.2 0 -2.8C2.4 -5.2 5 -4.6 5 -2.4C5 -0.2 2.2 1.4 0 3.6Z";

export function TexasStamp({ color = 'var(--accent)', width = 118, style }) {
  const vbW = 100, vbH = 94.6;
  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} width={width} height={width * vbH / vbW} role="img" aria-label="Proudly roasted in Lufkin, Texas" style={{ display: 'block', overflow: 'visible', ...style }}>
      <path d={TX} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
      <g transform="translate(90.9 46) scale(1.25)" fill={color}>
        <path d={HEART} />
      </g>
    </svg>
  );
}
