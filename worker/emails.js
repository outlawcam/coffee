// Message construction for the inquiry endpoint. Kept out of index.js, which
// owns routing, validation and transport — this file owns what the messages
// look like.
//
// These are HTML EMAILS, not pages, and the rules are different:
//
//   - Tables for layout. Outlook renders through Word, which has no flexbox
//     and no grid.
//   - Styles inline on every element. Gmail strips <style> when it clips a
//     long message, and several clients ignore it outright.
//   - No web fonts. Montserrat cannot load here, so it is listed first only
//     as a free win for clients that happen to have it installed; Helvetica
//     and Arial are the faces this will actually render in.
//   - No SVG, and the wordmark is live text rather than an image: the logo is
//     an SVG that Outlook will not draw, and images are blocked by default in
//     enough clients that the brand would simply be missing.
//   - No border-radius, no box-shadow. Outlook squares the first and drops
//     the second, so a design leaning on either falls apart there.
//   - line-height in px, never unitless, for the same reason.

export const oneLine = (s) => String(s).replace(/[\r\n]+/g, ' ').trim();

export const esc = (s) =>
  String(s).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));

// Visitor copy arrives with newlines. `white-space: pre-wrap` is unreliable in
// Outlook, so the breaks are made explicit after escaping.
const nl2br = (s) => esc(s).replace(/\r?\n/g, '<br />');

const LABELS = {
  general: 'General',
  wholesale: 'Wholesale',
  support: 'Customer Support',
  product: 'Product',
};

const PAPER = '#FBF8F1';
const STOCK = '#FFFFFF';
const INK = '#1A1A1A';
const MUTED = '#6B635B';
const FONT = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";

// Hidden line the inbox shows beside the subject. Without one, clients pull
// the first visible text — here the wordmark — and every message previews as
// "STANCRAFT COFFEE CO."
const preheader = (text) =>
  `<div style="display:none;font-size:1px;color:${PAPER};line-height:1px;` +
  `max-height:0;max-width:0;opacity:0;overflow:hidden;">${esc(text)}</div>`;

// One label/value row of the receipt block.
const row = (label, value) =>
  `<tr>` +
  `<td style="padding:0 0 6px 0;font-family:${FONT};font-size:11px;` +
  `line-height:16px;color:${MUTED};letter-spacing:0.06em;white-space:nowrap;` +
  `vertical-align:top;" width="88">${esc(label)}</td>` +
  `<td style="padding:0 0 6px 0;font-family:${FONT};font-size:13px;` +
  `line-height:18px;color:${INK};font-weight:700;vertical-align:top;">` +
  `${esc(value)}</td>` +
  `</tr>`;

function shell({ title, preview, body }) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<!-- Two colours carry this design; letting a client invert them would wreck
     the reversed footer bar and leave ink on ink. -->
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${PAPER};">
${preheader(preview)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${PAPER}" style="background-color:${PAPER};margin:0;padding:0;">
<tr>
<td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
<tr>
<td style="border:2px solid ${INK};padding:7px;background-color:${STOCK};">
${body}
</td>
</tr>
<tr>
<td align="center" style="padding:18px 0 0 0;font-family:${FONT};font-size:11px;line-height:16px;color:${MUTED};">
Roasted to order in Lufkin, Texas
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;
}

// --- Confirmation, to the submitter -------------------------------------
//
// NOTE: this copy is a placeholder for Tyler's wording, not final. It keeps
// the two-business-days promise the form already makes on screen, because
// that is a commitment he has to keep — the rest is his to rewrite.

export function confirmation(env, d) {
  const label = LABELS[d.category];
  const first = oneLine(d.name).split(' ')[0].slice(0, 40);
  const subject = 'We got your note — Stancraft Coffee Co.';

  const text = [
    `Thanks, ${first}.`,
    '',
    "Your note reached us. We'll be in touch within two business days.",
    '',
    'WHAT YOU SENT',
    `Inquiry   ${label}`,
    ...(d.inquiry ? [`Reason    ${d.inquiry}`] : []),
    '',
    d.details,
    '',
    '† Soli Deo Gloria! †',
    'Roasted to order in Lufkin, Texas',
  ].join('\n');

  const body =
    // Inner rule — the label's box inside a box.
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${INK};">` +
    `<tr><td style="padding:28px 28px 24px 28px;">` +

    // Wordmark, live text, set the way the bag sets it.
    `<div style="font-family:${FONT};font-size:19px;line-height:24px;` +
    `font-weight:800;letter-spacing:-0.01em;text-transform:uppercase;` +
    `color:${INK};text-align:center;">Stancraft<br />Coffee Co.</div>` +

    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
    `<tr><td style="padding:18px 0 0 0;border-bottom:1px solid ${INK};font-size:0;line-height:0;">&nbsp;</td></tr>` +
    `</table>` +

    `<div style="font-family:${FONT};font-size:18px;line-height:26px;` +
    `font-weight:700;color:${INK};padding:24px 0 0 0;">Thanks, ${esc(first)}.</div>` +

    `<div style="font-family:${FONT};font-size:15px;line-height:24px;` +
    `color:${INK};padding:10px 0 22px 0;">Your note reached us. We&rsquo;ll be in ` +
    `touch within two business days.</div>` +

    // Receipt block — what they sent, so the mail is a record on its own.
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${INK};">` +
    `<tr><td style="padding:16px 18px;">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
    row('Inquiry', label) +
    (d.inquiry ? row('Reason', d.inquiry) : '') +
    `</table>` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
    `<tr><td style="padding:10px 0 0 0;border-top:1px solid #D8D2C6;font-size:0;line-height:0;">&nbsp;</td></tr>` +
    `</table>` +
    `<div style="font-family:${FONT};font-size:14px;line-height:22px;color:${INK};padding:10px 0 0 0;">` +
    `${nl2br(d.details)}</div>` +
    `</td></tr></table>` +

    `</td></tr>` +

    // Reversed bar. The label's "SOLI DEO GLORIA" slot, and the one loud
    // element — everything above it is quiet on purpose.
    `<tr><td bgcolor="${INK}" align="center" style="background-color:${INK};` +
    `padding:13px 18px;font-family:${FONT};font-size:11px;line-height:16px;` +
    `font-weight:700;letter-spacing:0.12em;text-transform:uppercase;` +
    `color:${PAPER};">&dagger;&nbsp; Soli Deo Gloria! &nbsp;&dagger;</td></tr>` +
    `</table>`;

  return {
    from: env.INQUIRY_FROM,
    to: [d.email],
    reply_to: [env.INQUIRY_TO], // Customer hits reply, reaches Tyler.
    subject,
    text,
    html: shell({
      title: subject,
      preview: `We'll be in touch within two business days, ${first}.`,
      body,
    }),
  };
}

// --- Notification, to the owner ------------------------------------------
//
// Deliberately plain. This one is read on a phone between roasts and wants to
// be scannable, not branded — Tyler knows who his own shop is.

export function notification(env, d) {
  const label = LABELS[d.category];
  const subject = oneLine(d.inquiry ? `Inquiry — ${label}: ${d.inquiry}` : `Inquiry — ${label}`);

  const text = [
    `Name:     ${d.name}`,
    `Email:    ${d.email}`,
    `Category: ${label}`,
    `Reason:   ${d.inquiry || '—'}`,
    '',
    d.details,
  ].join('\n');

  const body =
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${INK};">` +
    `<tr><td style="padding:24px 28px;">` +
    `<div style="font-family:${FONT};font-size:17px;line-height:24px;font-weight:800;color:${INK};padding:0 0 16px 0;">` +
    `${esc(subject)}</div>` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
    row('Name', d.name) +
    row('Email', d.email) +
    row('Inquiry', label) +
    (d.inquiry ? row('Reason', d.inquiry) : '') +
    `</table>` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
    `<tr><td style="padding:12px 0 0 0;border-top:1px solid #D8D2C6;font-size:0;line-height:0;">&nbsp;</td></tr>` +
    `</table>` +
    `<div style="font-family:${FONT};font-size:15px;line-height:24px;color:${INK};padding:12px 0 0 0;">` +
    `${nl2br(d.details)}</div>` +
    `</td></tr></table>`;

  return {
    from: env.INQUIRY_FROM,
    to: [env.INQUIRY_TO],
    reply_to: [d.email], // Tyler hits reply, reaches the customer.
    subject,
    text,
    html: shell({
      title: subject,
      preview: `${oneLine(d.name)} — ${label}`,
      body,
    }),
  };
}
