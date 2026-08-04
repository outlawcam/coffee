import React from 'react';
import { Intro } from './Intro.jsx';
import { Footer } from './Footer.jsx';
// import { About } from './About.jsx';       // Task 4
// import { Inquiry } from './Inquiry.jsx';   // Task 5
// import { Coffees } from './Coffees.jsx';   // Task 6

export function App() {
  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--paper-100)', color: 'var(--ink-900)' }}>
      <Intro />
      {/* <About /> */}
      {/* <Inquiry /> */}
      {/* <Coffees /> */}
      <Footer />
    </div>
  );
}
