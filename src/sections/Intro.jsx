// Intro — wordmark and a single pill CTA. No nav; this section IS the header.
import React from 'react';

export function Intro() {
  return (
    <section id="top" className="intro">
      {/* id is the IntersectionObserver target for StickyHeader — when this
          scrolls out of view the compact masthead takes over. */}
      <h1 id="intro-logo" className="intro__title">
        <img
          src="/assets/logo-stancraft.svg"
          alt="Stancraft Coffee Co."
          className="intro__mark"
        />
      </h1>
      <a href="#coffees" className="btn-pill">Shop here</a>
    </section>
  );
}
