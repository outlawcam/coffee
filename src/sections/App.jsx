import React from 'react';
import { StickyHeader } from './StickyHeader.jsx';
import { Intro } from './Intro.jsx';
import { Footer } from './Footer.jsx';
import { About } from './About.jsx';
import { Inquiry } from './Inquiry.jsx';
import { Coffees } from './Coffees.jsx';

export function App() {
  return (
    <div className="app">
      <a href="#main" className="skip-link">Skip to content</a>
      <StickyHeader />
      <main id="main" tabIndex={-1}>
        <Intro />
        <Coffees />
        <About />
        <Inquiry />
      </main>
      <Footer />
    </div>
  );
}
