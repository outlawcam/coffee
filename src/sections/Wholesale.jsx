// Wholesale section — pitch + inquiry form. Global React.
import React from 'react';
import { createIcons, Check } from 'lucide';

export function Wholesale() {
  const { Button: WButton, Input: WInput, Select: WSelect, Badge: WBadge } = window.StancraftCoffeeDesignSystem_65aedf;
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', business: '', email: '', city: '', volume: '20–50 lb / mo', message: '' });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  // App's createIcons runs once at mount, so the success-state <i data-lucide="check">
  // (rendered only after `sent` flips) would stay unconverted. Re-run on toggle; scoped
  // to the Check glyph so already-converted icons elsewhere are untouched.
  React.useEffect(() => { createIcons({ icons: { Check } }); }, [sent]);

  return (
    <section id="wholesale" style={{ background: 'var(--paper-200)', padding: '96px 40px', scrollMarginTop: 72 }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
        {/* Pitch */}
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-500)', margin: '0 0 14px' }}>Wholesale</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, letterSpacing: '-0.02em', color: 'var(--ink-900)', margin: '0 0 18px', lineHeight: 1.06 }}>Pour Stancraft at your bar.</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.62, color: 'var(--ink-700)', margin: '0 0 28px', maxWidth: '46ch' }}>
            Cafés, offices, and restaurants: we roast to your order on a standing schedule, dial espresso with your team, and keep the origins on your menu honest. Whole bean, delivered fresh.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Standing weekly or biweekly roast schedule', 'Espresso dial-in and staff training', 'Named-origin menu cards and brew specs', 'Wholesale pricing from 20 lb / month'].map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink-700)' }}>
                <i data-lucide="check" style={{ width: 18, height: 18, color: 'var(--ink-500)', marginTop: 3, flex: '0 0 auto' }}></i>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-lg)', padding: 32, boxShadow: 'var(--shadow-sm)' }}>
          {sent ? (
            <div style={{ padding: '40px 8px', textAlign: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <i data-lucide="check"></i>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, color: 'var(--ink-900)', margin: '0 0 8px' }}>Inquiry received.</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink-500)', margin: '0 0 22px' }}>
                We'll be in touch within two business days, {form.name ? form.name.split(' ')[0] : 'thanks'}.
              </p>
              <WButton variant="outline" onClick={() => setSent(false)}>Send another</WButton>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--ink-900)', margin: '0 0 2px' }}>Wholesale inquiry</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <WInput label="Your name" value={form.name} onChange={set('name')} required placeholder="Jordan Vega" />
                <WInput label="Business" value={form.business} onChange={set('business')} required placeholder="Meridian Café" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <WInput label="Email" type="email" value={form.email} onChange={set('email')} required placeholder="you@cafe.com" />
                <WInput label="City / State" value={form.city} onChange={set('city')} placeholder="Austin, TX" />
              </div>
              <WSelect label="Estimated volume" value={form.volume} onChange={set('volume')}>
                <option>Under 20 lb / mo</option>
                <option>20–50 lb / mo</option>
                <option>50–100 lb / mo</option>
                <option>100+ lb / mo</option>
              </WSelect>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-700)' }}>What are you looking for?</span>
                <textarea value={form.message} onChange={set('message')} rows={3} placeholder="Brew method, current roaster, timeline…"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--ink-900)', background: 'var(--paper-000)', border: '1px solid var(--ink-200)', borderRadius: 'var(--radius-sm)', padding: '11px 14px', outline: 'none', resize: 'vertical' }} />
              </label>
              <WButton variant="primary" size="lg" fullWidth type="submit" style={{ marginTop: 4 }}>Send inquiry</WButton>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-500)', margin: 0, textAlign: 'center' }}>Or email <strong style={{ color: 'var(--ink-900)' }}>wholesale@stancraft.co</strong></p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
