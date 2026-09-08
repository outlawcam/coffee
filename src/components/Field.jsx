// Form field label. The control styling itself is the .control class in
// styles/components.css, applied by the caller.
import React from 'react';

export function Field({ label, htmlFor, children }) {
  return (
    <div className="field">
      <label htmlFor={htmlFor} className="field__label">{label}</label>
      {children}
    </div>
  );
}
