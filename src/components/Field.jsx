// Form field label + the shared control styling, so the four controls in the
// Inquiry section don't each restate their borders and type.
import React from 'react';

export const CONTROL_STYLE = {
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: 'var(--font-body)',
  fontSize: 16,
  color: 'var(--ink-900)',
  background: 'var(--paper-000)',
  border: '1px solid var(--border-hairline)',
  borderRadius: 'var(--radius-field)',
  padding: '11px 13px',
  outline: 'none',
};

export function Field({ label, htmlFor, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label
        htmlFor={htmlFor}
        style={{ display: 'block', fontWeight: 700, fontSize: 13, marginBottom: 7, color: 'var(--ink-900)' }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
