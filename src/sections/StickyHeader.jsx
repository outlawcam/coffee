// Sticky masthead. Hidden while the Intro's big wordmark is on screen; once
// that scrolls away, a compact logo slides down and stays put, so the mark is
// visible anywhere on the page.
//
// `position: fixed` rather than `sticky` on purpose: the page scrolls behind an
// opaque bar, and the header claims no space in the Intro's 75vh.
//
// The handoff is driven by an IntersectionObserver on the Intro's wordmark
// (`#intro-logo`) rather than a scroll listener — no work on every scroll
// frame, and the trigger point is defined by the element itself, so changing
// the hero's height needs no matching change here.
import React from 'react';

const { useEffect, useState } = React;

export function StickyHeader() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const heroLogo = document.getElementById('intro-logo');
    // No hero wordmark on the page: show the header unconditionally rather
    // than leaving the site with no visible logo.
    if (!heroLogo) {
      setStuck(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(heroLogo);
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={stuck ? 'sticky-head is-stuck' : 'sticky-head'}
      aria-hidden={!stuck}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        padding: '14px var(--sect-pad-x)',
        background: 'var(--paper-100)',
        borderBottom: '1px solid var(--border-hairline)',
        opacity: stuck ? 1 : 0,
        transform: stuck ? 'translateY(0)' : 'translateY(-100%)',
        // visibility (not pointer-events) so the link leaves the tab order
        // while hidden; it still animates, since visibility is discretely
        // animatable and flips to visible at the start of the reveal.
        visibility: stuck ? 'visible' : 'hidden',
      }}
    >
      <a
        href="#top"
        aria-label="Stancraft Coffee Co. — back to top"
        style={{ display: 'flex' }}
      >
        {/* alt="" — the anchor's aria-label names this link, and the Intro's
            <h1> already carries the wordmark's accessible name. */}
        <img
          src="/assets/logo-stancraft.svg"
          alt=""
          style={{
            height: 24,
            width: 'auto',
            display: 'block',
            // Settles from slightly oversized down to its resting size, so the
            // handoff from the hero mark reads as a shrink rather than a swap.
            transform: stuck ? 'scale(1)' : 'scale(1.3)',
          }}
        />
      </a>
    </header>
  );
}
