// Mega footer — company blurb, makers, social links, trustmark. Global React.
// Facebook/Instagram brand glyphs are inlined (Lucide dropped brand icons).
import React from 'react';

const SOCIAL_ICONS = {
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  instagram: (
    <g>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </g>
  ),
};

function SocialLink({ icon, label, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link-footer"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 11, textDecoration: 'none', color: 'var(--paper-100)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.22)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{SOCIAL_ICONS[icon]}</svg>
      </span>
      {label}
    </a>
  );
}

export function MegaFooter() {
  return (
    <footer style={{ background: 'var(--dark-900)', color: 'var(--paper-200)' }}>
      <div className="foot-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 40px 40px' }}>
        <div className="grid-split" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'start' }}>
          {/* Brand + makers blurb */}
          <div style={{ maxWidth: 460 }}>
            <img src={(window.__resources && window.__resources.logoWhite) || "../../assets/logo-stancraft-white.svg"} alt="Stancraft Coffee Co" style={{ height: 28, marginBottom: 20 }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.64, color: 'var(--ink-300)', margin: '0 0 18px' }}>
              Stancraft Coffee Co is a small-batch roaster and distributor built by a crew of former baristas and green buyers who got tired of stale coffee. We roast to order in small drums, source named lots by relationship, and ship whole bean so the cup you pour is the cup we tasted.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.64, color: 'var(--ink-300)', margin: 0 }}>
              Founded by roasters, for the particular.
            </p>
          </div>

          {/* Follow + trustmark */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--yellow-500)', margin: '0 0 16px' }}>Follow along</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <SocialLink icon="facebook" label="Facebook" href="https://www.facebook.com/profile.php?id=61590952605387" />
                <SocialLink icon="instagram" label="Instagram" href="https://www.instagram.com/stancraftcoffee/" />
              </div>
            </div>

            {/* Trustmark — SCA membership + CVA certification (CVA is awarded by the SCA) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '14px 22px', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 'var(--radius-sm)', alignSelf: 'flex-start' }}>
              <img src={(window.__resources && window.__resources.scaLogo) || "../../assets/sca-member-white.png"} alt="Specialty Coffee Association" style={{ height: 46, width: 'auto', display: 'block' }} />
              <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(255,255,255,0.16)' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--paper-100)' }}>Member · CVA Certified</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-300)' }}>Coffee Value Assessment scoring on every lot</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap', marginTop: 56, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.10)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-500)' }}>© 2026 Stancraft Coffee Co · Roasted to order</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-500)' }}>Temporary site — full shop opening soon on Shopify.</span>
        </div>
      </div>
    </footer>
  );
}
