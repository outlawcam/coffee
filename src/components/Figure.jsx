// Photo frame. Renders `src` when given, else a labeled FPO placeholder so an
// intentionally-empty slot reads as a gap rather than a finished choice.
import React from 'react';

export function Figure({ src, label, ratio = '3 / 4' }) {
  return (
    <span
      style={{
        display: 'flex',
        width: '100%',
        aspectRatio: ratio,
        borderRadius: 'var(--radius-photo)',
        overflow: 'hidden',
        background: 'var(--photo-fpo)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {src ? (
        <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <span
          style={{
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--ink-500)',
            textAlign: 'center',
            padding: '0 18px',
            lineHeight: 1.6,
          }}
        >
          {label}
        </span>
      )}
    </span>
  );
}
