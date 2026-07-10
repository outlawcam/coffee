import React from 'react';
import { createIcons, Flame, Sprout, Bean, Tent, Coffee, Mail, ArrowUpRight, Check } from 'lucide';
import { Products } from './Products.jsx';
import { Craft } from './Craft.jsx';
import { WhereToBuy } from './WhereToBuy.jsx';
import { Wholesale } from './Wholesale.jsx';
import { MegaFooter } from './MegaFooter.jsx';

const { useEffect } = React;
const LUCIDE_ICONS = { Flame, Sprout, Bean, Tent, Coffee, Mail, ArrowUpRight, Check };

const MenuIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
);
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg>
);

function Nav() {
  const { Button: NavButton } = window.StancraftCoffeeDesignSystem_65aedf;
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);
  const links = [['#products', 'Products'], ['#craft', 'Our Craft'], ['#where', 'Where to Buy']];
  return (
    <header className="appheader" style={{ position: 'sticky', top: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 40px', background: 'var(--paper-100)', borderBottom: '1px solid var(--border-hairline)' }}>
      <a href="#top" style={{ display: 'flex' }}>
        <img src={(window.__resources && window.__resources.logoDark) || "/assets/logo-stancraft.svg"} alt="Stancraft Coffee Co" style={{ height: 31 }} />
      </a>

      {/* Desktop nav */}
      <nav className="nav-desktop" style={{ display: 'flex', gap: 34, alignItems: 'center' }}>
        {links.map(([href, label]) => (
          <a key={href} href={href} className="navlink" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-900)', textDecoration: 'none' }}>{label}</a>
        ))}
        <NavButton as="a" href="#wholesale" variant="primary" size="sm" className="btn-primary">Wholesale inquiry</NavButton>
      </nav>

      {/* Mobile actions: wholesale CTA stays visible in the header + menu trigger */}
      <div className="nav-mobile" style={{ alignItems: 'center', gap: 12 }}>
        <NavButton as="a" href="#wholesale" variant="primary" size="sm" className="btn-primary">Wholesale</NavButton>
        <button type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, padding: 0, margin: '-6px -10px -6px 0', background: 'none', border: 'none', color: 'var(--ink-900)', cursor: 'pointer' }}>
          <MenuIcon />
        </button>
      </div>

      {/* Drawer backdrop */}
      <div onClick={close} aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(26,20,15,0.5)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 280ms var(--ease-standard)' }}></div>

      {/* Drawer panel */}
      <aside aria-hidden={!open} style={{ position: 'fixed', top: 0, right: 0, zIndex: 50, height: '100%', width: 'min(82vw, 320px)', background: 'var(--paper-100)', boxShadow: 'var(--shadow-lg)', transform: open ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 300ms var(--ease-standard)', display: 'flex', flexDirection: 'column', padding: '16px 22px 28px' }}>
        <button type="button" aria-label="Close menu" onClick={close}
          style={{ alignSelf: 'flex-end', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, padding: 0, background: 'none', border: 'none', color: 'var(--ink-900)', cursor: 'pointer' }}>
          <CloseIcon />
        </button>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 8 }}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={close} className="drawer-link" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-900)', textDecoration: 'none', padding: '15px 0', borderBottom: '1px solid var(--border-hairline)' }}>{label}</a>
          ))}
        </nav>
      </aside>
    </header>
  );
}

function Hero() {
  const { Button: NavButton } = window.StancraftCoffeeDesignSystem_65aedf;
  return (
    <section id="top" className="hero-sect" style={{ position: 'relative', overflow: 'hidden', background: 'var(--espresso-900)', padding: '116px 40px 108px', borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <image-slot id="land-hero-bg" shape="rect" fit="cover" src="/assets/hero.jpg" placeholder="Hero background — drop a dark, full-bleed photo"></image-slot>
      </div>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(90deg, rgba(26,20,15,0.90) 0%, rgba(26,20,15,0.72) 44%, rgba(26,20,15,0.38) 100%)' }}></div>
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', pointerEvents: 'none' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-300)', margin: '0 0 22px' }}>The full shop is brewing</p>
        <h1 className="h1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 62, lineHeight: 1.0, letterSpacing: '-0.025em', color: 'var(--paper-100)', margin: 0, maxWidth: '18ch' }}>
          Good coffee, while the store catches up.
        </h1>
        <p className="hero-lead" style={{ fontFamily: 'var(--font-body)', fontSize: 20, lineHeight: 1.55, color: 'var(--paper-200)', maxWidth: '54ch', margin: '26px 0 34px' }}>
          We're standing up our online store. Until then, here's the whole lineup, the way we work, and how to pour Stancraft at your café. Whole bean, roasted to order.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', pointerEvents: 'auto' }}>
          <NavButton as="a" href="#products" variant="primary" size="lg" className="btn-primary">See the coffee</NavButton>
          <NavButton as="a" href="#craft" variant="outline" size="lg" className="btn-outline-light" style={{ color: 'var(--paper-100)', borderColor: 'var(--paper-100)' }}>Our craft</NavButton>
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
