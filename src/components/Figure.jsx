// Photo frame. Renders `src` when given, else a labeled FPO placeholder so an
// intentionally-empty slot reads as a gap rather than a finished choice.
import React from 'react';

export function Figure({ src, label, ratio = '3 / 4' }) {
  const ratioClass = ratio === '4 / 5' ? 'figure--4x5' : 'figure--3x4';
  return (
    <span className={`figure ${ratioClass}`}>
      {src ? (
        <img src={src} alt={label} className="figure__img" />
      ) : (
        <span className="figure__fpo">{label}</span>
      )}
    </span>
  );
}
