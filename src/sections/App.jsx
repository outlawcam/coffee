import React from 'react';
import { Intro } from './Intro.jsx';
import { Footer } from './Footer.jsx';
import { About } from './About.jsx';
import { Inquiry } from './Inquiry.jsx';
import { Coffees } from './Coffees.jsx';

export function App() {
  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--paper-100)', color: 'var(--ink-900)' }}>
      <Intro />
      <About />
      <Inquiry />
      <Coffees />
      <Footer />
    </div>
  );
}
