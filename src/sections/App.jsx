import React from 'react';
import { createIcons, Flame, Sprout, Bean, Tent, Coffee, Mail, ArrowUpRight, Check } from 'lucide';
import { Products } from './Products.jsx';
import { Craft } from './Craft.jsx';
import { WhereToBuy } from './WhereToBuy.jsx';
import { Wholesale } from './Wholesale.jsx';
import { MegaFooter } from './MegaFooter.jsx';

const { useEffect } = React;
const LUCIDE_ICONS = { Flame, Sprout, Bean, Tent, Coffee, Mail, ArrowUpRight, Check };

function Nav() {
  const { Button: NavButton } = window.StancraftCoffeeDesignSystem_65aedf;
  const links = [['#products', 'Products'], ['#craft', 'Our Craft'], ['#where', 'Where to Buy']];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 40px', background: 'var(--paper-100)', borderBottom: '1px solid var(--border-hairline)' }}>
      <a href="#top" style={{ display: 'flex' }}>
        <img src={(window.__resources && window.__resources.logoDark) || "/assets/logo-stancraft.svg"} alt="Stancraft Coffee Co" style={{ height: 31 }} />
      </a>
      <nav style={{ display: 'flex', gap: 34, alignItems: 'center' }}>
        {links.map(([href, label]) => (
          <a key={href} href={href} className="navlink" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-900)', textDecoration: 'none' }}>{label}</a>
        ))}
        <NavButton as="a" href="#wholesale" variant="primary" size="sm">Wholesale inquiry</NavButton>
      </nav>
    </header>
  );
}

function Hero() {
  const { Button: NavButton } = window.StancraftCoffeeDesignSystem_65aedf;
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', background: 'var(--espresso-900)', padding: '116px 40px 108px', borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <image-slot id="land-hero-bg" shape="rect" fit="cover" placeholder="Hero background — drop a dark, full-bleed photo"></image-slot>
      </div>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(90deg, rgba(26,20,15,0.90) 0%, rgba(26,20,15,0.72) 44%, rgba(26,20,15,0.38) 100%)' }}></div>
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', pointerEvents: 'none' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-300)', margin: '0 0 22px' }}>The full shop is brewing</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 62, lineHeight: 1.0, letterSpacing: '-0.025em', color: 'var(--paper-100)', margin: 0, maxWidth: '18ch' }}>
          Good coffee, while the store catches up.
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 20, lineHeight: 1.55, color: 'var(--paper-200)', maxWidth: '54ch', margin: '26px 0 34px' }}>
          We're standing up our online store. Until then, here's the whole lineup, the way we work, and how to pour Stancraft at your café. Whole bean, roasted to order.
        </p>
        <div style={{ display: 'flex', gap: 14, pointerEvents: 'auto' }}>
          <NavButton as="a" href="#products" variant="primary" size="lg">See the coffee</NavButton>
          <NavButton as="a" href="#craft" variant="outline" size="lg" style={{ color: 'var(--paper-100)', borderColor: 'var(--paper-100)' }}>Our craft</NavButton>
        </div>
      </div>
    </section>
  );
}

export function App() {
  // createIcons runs once at mount (App never re-renders). Icons that appear only after a
  // later state change (e.g. Wholesale's success check) are inlined as SVG rather than
  // relying on this.
  useEffect(() => { createIcons({ icons: LUCIDE_ICONS }); });
  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <Nav />
      <Hero />
      <Products />
      <Craft />
      <WhereToBuy />
      <Wholesale />
      <MegaFooter />
    </div>
  );
}
