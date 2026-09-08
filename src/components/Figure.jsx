// Photo frame. Renders `src` when given, else a labeled FPO placeholder so an
// intentionally-empty slot reads as a gap rather than a finished choice.
//
// `alt` and `fpoLabel` are separate on purpose. A placeholder's caption is
// visual scaffolding, not a description of a photo, so it must not become
// alt text once a real photo lands here. The caption is also aria-hidden:
// with no `src` there is no <img> at all, so the caption would otherwise
// reach the accessible name as visible text content — which is how
// "Mellow — portrait" ended up in every mood button's name.
import React from 'react';

export function Figure({ src, alt = '', fpoLabel, ratio = '3 / 4' }) {
  const ratioClass = ratio === '4 / 5' ? 'figure--4x5' : 'figure--3x4';
  return (
    <span className={`figure ${ratioClass}`}>
      {src ? (
        <img src={src} alt={alt} className="figure__img" />
      ) : (
        <span className="figure__fpo" aria-hidden="true">{fpoLabel}</span>
      )}
    </span>
  );
}
