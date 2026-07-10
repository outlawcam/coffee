// Where to Buy — farmer's market, stockist cafés, and email. Minimalist. Global React.
import React from 'react';

export function WhereToBuy() {
  // TODO: fill café names + real shop URLs; swap market/email links for the real ones.
  const channels = [
    { icon: 'tent', title: 'Nacogdoches Farmer’s Market', link: false,
      body: 'Find our stand at the Nacogdoches Farmer’s Market for fresh whole bean and a hello from the roasters.',
      links: [{ label: 'Market info', href: '#' }] },
    { icon: 'coffee', title: 'At local coffee shops', link: false,
      body: 'Several East Texas shops brew and sell Stancraft in house. Grab a cup or a bag from:',
      links: [{ label: 'Coffee shop one', href: '#' }, { label: 'Coffee shop two', href: '#' }, { label: 'Coffee shop three', href: '#' }] },
    { icon: 'mail', title: 'Order by email', link: false,
      body: 'Want beans shipped or held for pickup? Email us what you’re after and we’ll sort it out.',
      links: [{ label: 'orders@stancraft.co', href: 'mailto:orders@stancraft.co' }] },
  ];
  return (
    <section id="where" style={{ background: 'var(--paper-100)', padding: '96px 40px', borderTop: '1px solid var(--border-hairline)', scrollMarginTop: 72 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ maxWidth: 620, marginBottom: 52 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-500)', margin: '0 0 12px' }}>Where to buy</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, letterSpacing: '-0.02em', color: 'var(--ink-900)', margin: '0 0 14px', lineHeight: 1.04 }}>Three ways to get it.</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.6, color: 'var(--ink-500)', margin: 0 }}>
            Whole bean, roasted to order — at the market, from a shop that brews us, or straight from the roastery.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
          {channels.map((ch, i) => {
            const isMail = (ch.links[0] || {}).href && ch.links[0].href.indexOf('mailto:') === 0;
            return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 24, borderTop: '1px solid var(--border-hairline)' }}>
              <div style={{ color: 'var(--ink-900)' }}>
                <i data-lucide={ch.icon} style={{ width: 24, height: 24 }}></i>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--ink-900)', margin: 0 }}>{ch.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.56, color: 'var(--ink-500)', margin: 0 }}>{ch.body}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto', paddingTop: 6 }}>
                {ch.links.map((l, j) => (
                  <a key={j} href={l.href} {...(l.href.indexOf('mailto:') === 0 ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, letterSpacing: '0.04em', color: 'var(--accent)', textDecoration: 'none' }}>
                    <i data-lucide={l.href.indexOf('mailto:') === 0 ? 'mail' : 'arrow-up-right'} style={{ width: 15, height: 15 }}></i>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
