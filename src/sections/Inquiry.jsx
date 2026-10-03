// Inquiry — form left, partnership pitch right.
//
// The Inquiry control is two steps: a four-way selector decides which dropdown
// options exist. `general` has none, so no dropdown renders and the visitor
// just writes in Details. Covers all 16 inquiry reasons the client supplied.
//
// No network call on this branch. The payload shape is fixed so the
// Turnstile/SES worker can adopt it later: { name, email, category, inquiry, details }.
import React from 'react';
import { Section } from '../components/Section.jsx';
import { Field } from '../components/Field.jsx';

const CATEGORIES = [
  { id: 'general', label: 'General', options: [] },
  { id: 'wholesale', label: 'Wholesale', options: [
    'Wholesale / Bulk Orders',
    'Café / Restaurant Partnerships',
    'Private Label / White Label',
    'Collabs & Brand Partnerships',
    'Events / Pop-Ups / Catering',
  ] },
  { id: 'support', label: 'Customer Support', options: [
    'Order Status / Tracking',
    'Shipping & Delivery Issues',
    'Returns / Refunds',
    'Damaged or Incorrect Order',
    'Retail Order Support',
    'Subscription Questions',
  ] },
  { id: 'product', label: 'Product', options: [
    'Product Availability / Restock',
    'Coffee Sourcing / Origin',
    'Certifications (Organic, Fair Trade, etc.)',
    'Roast Profiles / Brewing Help',
    'Sustainability Practices',
  ] },
];

// Public by design — Turnstile site keys are meant to ship in the client.
//
// The real key is bound to stancraftcoffee.com in the Turnstile dashboard and
// returns error 110200 ("unknown domain") anywhere else, which would make the
// form untestable locally. On localhost we use Cloudflare's documented
// always-passes test key, the pair of the test SECRET in .dev.vars.example.
// Both halves of the gate are therefore stubbed together or real together —
// never one of each, which would fail in a confusing way.
const SITE_KEY_PROD = '0x4AAAAAAD_U2FzIwipap6AT';
const SITE_KEY_TEST = '1x00000000000000000000AA';

// Non-production hosts are listed, not inferred. An unrecognised hostname
// falls through to the production key and fails loudly with 110200 — which is
// the right failure for a security control. Inverting this (test key unless
// the host is known-production) would mean a domain change silently downgrades
// the gate to a key that accepts everything.
const isNonProdHost = (h) =>
  h === 'localhost' || h === '127.0.0.1' || h.endsWith('.workers.dev');

const SITE_KEY =
  typeof location !== 'undefined' && isNonProdHost(location.hostname)
    ? SITE_KEY_TEST
    : SITE_KEY_PROD;

const EMPTY = { name: '', email: '', category: 'general', inquiry: '', details: '' };

export function Inquiry() {
  const [form, setForm] = React.useState(EMPTY);
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState('');
  const [token, setToken] = React.useState('');
  const sentRef = React.useRef(null);
  const widgetRef = React.useRef(null);
  const widgetId = React.useRef(null);
  // Synchronous guard. `sending` state lags a render behind, so three fast
  // clicks all read it as false and fire three requests; a ref flips now.
  const inFlight = React.useRef(false);

  // Turnstile must be rendered explicitly, not via its implicit DOM scan: that
  // scan runs once when api.js loads, and this form is mounted by React after
  // it, so an auto-rendered widget would never appear. Re-runs when `sent`
  // flips back on "Send another", because the form — and the widget with it —
  // unmounts while the confirmation panel is up.
  React.useEffect(() => {
    if (sent) {
      // Tokens are single-use. Drop the spent one and tear the widget down so
      // the remount gets a fresh challenge rather than a consumed token.
      if (widgetId.current !== null) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
      setToken('');
      return;
    }

    let cancelled = false;
    let timer;
    let waited = 0;

    const render = () => {
      if (cancelled || widgetId.current !== null || !widgetRef.current) return;
      if (!window.turnstile) {
        // api.js is third-party and routinely blocked by filter lists. Give up
        // after 10s with a message rather than polling forever behind a form
        // that can never be submitted.
        if ((waited += 50) > 10000) {
          setError('Could not load the verification widget. Email tyler@stancraftcoffee.com directly.');
          return;
        }
        timer = setTimeout(render, 50);
        return;
      }
      widgetId.current = window.turnstile.render(widgetRef.current, {
        sitekey: SITE_KEY,
        callback: setToken,
        'error-callback': () => setToken(''),
        'expired-callback': () => setToken(''),
      });
    };
    render();

    return () => { cancelled = true; clearTimeout(timer); };
  }, [sent]);

  React.useEffect(() => {
    if (sent && sentRef.current) sentRef.current.focus();
  }, [sent]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Switching category clears any chosen option, so a stale Wholesale value
  // can never be submitted under Product.
  const pickCategory = (id) => () => setForm((f) => ({ ...f, category: id, inquiry: '' }));

  const active = CATEGORIES.find((c) => c.id === form.category);

  const submit = async (e) => {
    e.preventDefault();
    if (inFlight.current) return; // The disabled attribute lags; this does not.
    inFlight.current = true;
    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, token }),
      });
      const body = await res.json().catch(() => ({ ok: false }));
      if (!body.ok) throw new Error(body.error || 'send');
      setSent(true);
    } catch (err) {
      setError(
        {
          turnstile: "That verification didn't go through. Reload the page and try again.",
          too_large: 'That message is too long to send. Trim it and try again.',
          invalid: 'Please check your name, email address and message, then try again.',
        }[err.message] ||
          'Something went wrong sending that. Try again, or email tyler@stancraftcoffee.com directly.'
      );
      window.turnstile?.reset(widgetId.current ?? undefined);
      setToken('');
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  };

  // `last` suppresses the bottom hairline — Inquiry is the final section and
  // the Footer supplies its own top border.
  return (
    <Section id="inquiry" last>
      <div className="split-2 split-2--top">
        <div>
          {sent ? (
            <div>
              <h2 className="sent__title" ref={sentRef} tabIndex={-1}>
                Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}.
              </h2>
              <p className="sent__body">
                Your note is with us. We'll be in touch within two business days.
              </p>
              <button
                type="button"
                onClick={() => { setForm(EMPTY); setSent(false); }}
                className="btn-outline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate={false}>
              <Field label="Your name" htmlFor="f-name">
                <input id="f-name" type="text" required value={form.name} onChange={set('name')} className="control" />
              </Field>

              <Field label="Email address" htmlFor="f-email">
                <input id="f-email" type="email" required value={form.email} onChange={set('email')} className="control" />
              </Field>

              <div className="seg">
                <span className="seg__label">
                  Inquiry
                </span>
                <div role="group" aria-label="Inquiry category" className="seg__list">
                  {CATEGORIES.map((c) => {
                    const on = c.id === form.category;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        aria-pressed={on}
                        onClick={pickCategory(c.id)}
                        className={on ? 'seg__item seg__item--on' : 'seg__item'}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
                {active.options.length > 0 && (
                  <select
                    aria-label="Inquiry reason"
                    value={form.inquiry}
                    onChange={set('inquiry')}
                    required
                    className="control"
                  >
                    <option value="">Select one…</option>
                    {active.options.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                )}
              </div>

              <Field label="Details" htmlFor="f-details">
                <textarea
                  id="f-details"
                  rows={4}
                  required
                  maxLength={4000}
                  value={form.details}
                  onChange={set('details')}
                  className="control control--textarea"
                />
              </Field>

              <div ref={widgetRef} className="turnstile" />

              {error && (
                <p role="alert" className="form-error">{error}</p>
              )}

              <button
                type="submit"
                className="btn-block"
                disabled={sending || !token}
              >
                {sending ? 'Sending…' : 'Submit'}
              </button>
            </form>
          )}
        </div>

        <div>
          <h2 className="pitch__title">
            Interested in partnering with Stancraft?
          </h2>
          <p className="pitch__body">
            Whether it be for your café, your restaurant, or your startup coffee cart, we'd love to provide
            you with some of the highest quality coffee to serve to your guests.
          </p>
        </div>
      </div>
    </Section>
  );
}
