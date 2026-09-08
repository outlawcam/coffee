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
      <StickyHeader />
      <Intro />
      <Coffees />
      <About />
      <Inquiry />
      <Footer />
    </div>
  );
}
