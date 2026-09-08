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

const EMPTY = { name: '', email: '', category: 'general', inquiry: '', details: '' };

export function Inquiry() {
  const [form, setForm] = React.useState(EMPTY);
  const [sent, setSent] = React.useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Switching category clears any chosen option, so a stale Wholesale value
  // can never be submitted under Product.
  const pickCategory = (id) => () => setForm((f) => ({ ...f, category: id, inquiry: '' }));

  const active = CATEGORIES.find((c) => c.id === form.category);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  // `last` suppresses the bottom hairline — Inquiry is the final section and
  // the Footer supplies its own top border.
  return (
    <Section id="inquiry" last>
      <div className="split-2 split-2--top">
        <div>
          {sent ? (
            <div>
              <h2 className="sent__title">
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
                  value={form.details}
                  onChange={set('details')}
                  className="control control--textarea"
                />
              </Field>

              <button
                type="submit"
                className="btn-block"
              >
                Submit
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
