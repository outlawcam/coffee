// About — bio copy left, portrait right. Collapses to one column at 860px.
import React from 'react';
import { Section } from '../components/Section.jsx';
import { Figure } from '../components/Figure.jsx';

export function About() {
  return (
    <Section id="about">
      <div className="split-2">
        <div>
          <h2 className="about__title">About us</h2>
          <p className="about__body">
            I'm Tyler, the owner and operator of the family-owned, Stancraft Coffee Company. This started
            about 5 years ago as a hobby of mine and quickly became a passion project. I fell in love with
            the art and nuance of roasting and delighted in serving guests my freshly-roasted coffee, all
            for the glory of God.
          </p>
        </div>
        <Figure src="/assets/tyler.jpg" alt="Tyler logging a roast at the roaster" ratio="4 / 5" />
      </div>
    </Section>
  );
}
