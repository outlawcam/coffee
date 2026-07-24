import React from 'react';
import { createIcons, Flame, Sprout, Bean, Tent, Coffee, Mail, ArrowUpRight, Check } from 'lucide';
import { Products } from './Products.jsx';
import { Club } from './Club.jsx';
import { Craft } from './Craft.jsx';
import { WhereToBuy } from './WhereToBuy.jsx';
import { Wholesale } from './Wholesale.jsx';
import { MegaFooter } from './MegaFooter.jsx';

const { useEffect, useState } = React;
const LUCIDE_ICONS = { Flame, Sprout, Bean, Tent, Coffee, Mail, ArrowUpRight, Check };

/* --- Nav model: content-accurate labels mapped to real section anchors --- */
const NAV = [
  ['#top', 'Home'],
  ['#products', 'Coffee'],
  ['#club', 'Club'],        // placeholder anchor — no Club section exists yet
  ['#wholesale', 'Wholesale'],
  ['#contact', 'Contact'],
];

const FB = <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />;
const IG = (<g><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></g>);
const SocialSquare = ({ href, label, glyph }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="bs-social"
    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, border: '1px solid var(--ink-900)', color: 'var(--ink-900)', textDecoration: 'none' }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">{glyph}</svg>
  </a>
);

/* Toggle glyph: three rules + a chevron that points the way the rail will move. */
const ToggleGlyph = ({ collapsed }) => (
  <svg width="26" height="20" viewBox="0 0 30 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="2" y1="4" x2="20" y2="4" /><line x1="2" y1="11" x2="20" y2="11" /><line x1="2" y1="18" x2="14" y2="18" />
    <polyline points={collapsed ? '24,6 28,11 24,16' : '28,6 24,11 28,16'} />
  </svg>
);

function LeftRail({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const wireLabel = { fontFamily: 'var(--font-wire)', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' };
  const closeMobile = () => setMobileOpen(false);

  return (
    <aside className={'bs-rail' + (mobileOpen ? ' open' : '')}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 60, height: '100vh', width: collapsed ? 'var(--rail-w-collapsed)' : 'var(--rail-w)', background: 'var(--paper-100)', borderRight: '3px double var(--ink-900)', display: 'flex', flexDirection: 'column', padding: collapsed ? '18px 0' : '20px 22px 24px', transition: 'width 260ms var(--ease-standard)', overflow: 'hidden' }}>

      {/* Toggle — top, aligned right like the reference */}
      <div style={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end', marginBottom: collapsed ? 0 : 20 }}>
        <button type="button" onClick={() => setCollapsed(c => !c)} aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'} aria-expanded={!collapsed}
          className="bs-collapse-toggle"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 34, padding: 0, background: 'none', border: 'none', color: 'var(--ink-900)', cursor: 'pointer' }}>
          <ToggleGlyph collapsed={collapsed} />
        </button>
      </div>

      {collapsed ? (
        /* Collapsed strip: vertical nameplate running up the rail */
        <button type="button" onClick={() => setCollapsed(false)} aria-label="Expand navigation"
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-900)' }}>
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 26, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-fill)', WebkitTextStroke: '0.9px var(--ink-edge)' }}>Stancraft</span>
        </button>
      ) : (
        <>
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {NAV.map(([href, label]) => (
              <a key={href} href={href} onClick={closeMobile} className="bs-navlink"
                style={{ ...wireLabel, fontSize: 15, color: 'var(--ink-900)', textDecoration: 'none', padding: '11px 0', borderBottom: '1px solid var(--ink-200)' }}>{label}</a>
            ))}
          </nav>

          <div style={{ marginTop: 28 }}>
            <p style={{ ...wireLabel, fontSize: 11, letterSpacing: '0.22em', color: 'var(--ink-500)', margin: '0 0 12px' }}>Follow Us</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <SocialSquare href="https://www.facebook.com/profile.php?id=61590952605387" label="Facebook" glyph={FB} />
              <SocialSquare href="https://www.instagram.com/stancraftcoffee/" label="Instagram" glyph={IG} />
            </div>
          </div>

          {/* Proudly-roasted colophon, pinned to the foot of the rail */}
          <div style={{ marginTop: 'auto', border: '1px solid var(--ink-900)', padding: '16px 14px', textAlign: 'center' }}>
            <p style={{ ...wireLabel, fontSize: 11, letterSpacing: '0.2em', color: 'var(--ink-700)', margin: 0, lineHeight: 1.9 }}>
              Proudly Roasted<br /><span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: '0.04em', fontStyle: 'italic', fontFamily: 'var(--font-body)', fontSize: 13 }}>in</span><br />Lufkin, TX
            </p>
          </div>
        </>
      )}
    </aside>
  );
}

/* Mobile-only top bar: nameplate + hamburger (rail is off-canvas below the breakpoint). */
function MobileBar({ onOpen }) {
  return (
    <div className="bs-topbar" style={{ display: 'none', position: 'sticky', top: 0, zIndex: 45, alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', background: 'var(--paper-100)', borderBottom: '3px double var(--ink-900)' }}>
      <span style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 22, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-900)' }}>Stancraft</span>
      <button type="button" onClick={onOpen} aria-label="Open navigation" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 40, padding: 0, background: 'none', border: 'none', color: 'var(--ink-900)', cursor: 'pointer' }}>
        <ToggleGlyph collapsed={true} />
      </button>
    </div>
  );
}

/* The nameplate flag — dateline & edition furniture flanking a Didone wordmark. */
function Masthead() {
  const cell = { display: 'flex', flexDirection: 'column', justifyContent: 'center' };
  const meta = { fontFamily: 'var(--font-wire)', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-700)', lineHeight: 1.7, margin: 0 };
  return (
    <header id="top" style={{ borderTop: '3px solid var(--ink-900)', borderBottom: '3px solid var(--ink-900)' }}>
      {/* Top hairline dateline strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '7px 4px', borderBottom: '1px solid var(--ink-900)', flexWrap: 'wrap' }}>
        <span style={{ ...meta, color: 'var(--accent)' }}>Lufkin, Texas</span>
        <span className="bs-dateline-mid" style={{ ...meta }}>The Stancraft Broadsheet</span>
        <span style={{ ...meta }}>Vol. I · No. 1</span>
      </div>

      {/* Nameplate row */}
      <div className="bs-flag" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'stretch' }}>
        <div className="bs-flag-side" style={{ ...cell, padding: '18px 20px', borderRight: '1px solid var(--ink-900)' }}>
          <p style={{ ...meta }}>Est. small-batch · roasted to order</p>
          <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: 15, color: 'var(--ink-500)', margin: '6px 0 0' }}>Whole bean, roasted the week you buy.</p>
        </div>

        <div style={{ ...cell, alignItems: 'center', padding: '14px 26px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(40px, 6vw, 78px)', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--ink-fill)', WebkitTextStroke: '1.5px var(--ink-edge)', margin: 0, lineHeight: 0.94 }}>Stancraft</h1>
          <p style={{ fontFamily: 'var(--font-wire)', fontWeight: 700, fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'var(--ink-700)', margin: '10px 0 0' }}>Small-Batch Coffee Roasters</p>
        </div>

        <div className="bs-flag-side" style={{ ...cell, alignItems: 'flex-end', textAlign: 'right', padding: '18px 20px', borderLeft: '1px solid var(--ink-900)' }}>
          <p style={{ ...meta, color: 'var(--accent)' }}>Farmer's Market</p>
          <p style={{ ...meta, fontWeight: 400, marginBottom: 8 }}>Nacogdoches, TX</p>
          <p style={{ ...meta }}>The Full Shop</p>
          <p style={{ ...meta, fontWeight: 400 }}>Brewing Soon</p>
        </div>
      </div>
    </header>
  );
}

/* Lead story — the front-page hero, set as a two-column newspaper feature. */
function Lead() {
  return (
    <section className="bs-lead" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 0, borderBottom: '3px double var(--ink-900)' }}>
      <div style={{ padding: '40px 34px 44px', borderRight: '1px solid var(--ink-900)', display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontFamily: 'var(--font-wire)', fontWeight: 700, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 18px' }}>From the Roastery — Front Page</p>
        <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(38px, 5vw, 62px)', lineHeight: 0.98, letterSpacing: '0.005em', color: 'var(--ink-fill)', WebkitTextStroke: '1.1px var(--ink-edge)', margin: 0 }}>Good coffee, while the store catches up.</h2>
        <div style={{ height: 1, background: 'var(--ink-900)', margin: '22px 0 20px' }} />
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.6, color: 'var(--ink-700)', margin: 0, maxWidth: '46ch' }}>
          <span style={{ float: 'left', fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 62, lineHeight: 0.8, paddingRight: 10, paddingTop: 6, color: 'var(--ink-fill)', WebkitTextStroke: '1.1px var(--ink-edge)' }}>W</span>
          e're standing up our online store. Until then, here's the whole lineup, the way we work, and how to pour Stancraft at your café. Whole bean, roasted to order.
        </p>
        <div style={{ display: 'flex', gap: 22, alignItems: 'center', marginTop: 28, flexWrap: 'wrap' }}>
          <a href="#products" className="bs-btn bs-btn-solid ink-box" style={{ fontFamily: 'var(--font-wire)', fontWeight: 700, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', padding: '13px 22px', color: 'var(--paper-100)', border: 'none' }}>Read the lineup</a>
          <a href="#craft" className="bs-btn bs-btn-line" style={{ fontFamily: 'var(--font-wire)', fontWeight: 700, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--ink-900)', borderBottom: '2px solid var(--ink-900)', paddingBottom: 3 }}>Our craft ↗</a>
        </div>
        <p style={{ fontFamily: 'var(--font-wire)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-300)', margin: 'auto 0 0', paddingTop: 28 }}>Continued in the lineup, below the fold ↓</p>
      </div>

      <figure className="halftone bs-lead-cut" style={{ margin: 0, position: 'relative', minHeight: 360, background: 'var(--paper-200)' }}>
        <image-slot id="land-hero-bg" shape="rect" fit="cover" src="/assets/hero.jpg" placeholder="Hero — roastery photo, rendered as newsprint engraving"></image-slot>
        <figcaption style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 3, fontFamily: 'var(--font-wire)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--paper-100)', background: 'rgba(32,27,22,0.82)', padding: '7px 12px' }}>Fig. 1 — The drum, mid-roast.</figcaption>
      </figure>
    </section>
  );
}

export function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // createIcons runs after each render so icons in re-skinned sections resolve.
  useEffect(() => { createIcons({ icons: LUCIDE_ICONS }); });

  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--paper-100)', color: 'var(--ink-900)' }}>
      <LeftRail collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Mobile drawer backdrop */}
      <div className={'bs-backdrop' + (mobileOpen ? ' open' : '')} onClick={() => setMobileOpen(false)} aria-hidden="true"
        style={{ position: 'fixed', inset: 0, zIndex: 55, background: 'rgba(32,27,22,0.5)', opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? 'auto' : 'none', transition: 'opacity 260ms var(--ease-standard)' }} />

      <div className="bs-main" style={{ marginLeft: collapsed ? 'var(--rail-w-collapsed)' : 'var(--rail-w)', transition: 'margin-left 260ms var(--ease-standard)' }}>
        <MobileBar onOpen={() => setMobileOpen(true)} />
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '26px 30px 0' }}>
          <Masthead />
          <Lead />
        </div>
        <Products />
        <Club />
        <Craft />
        <WhereToBuy />
        <Wholesale />
        <MegaFooter />
      </div>
    </div>
  );
}
