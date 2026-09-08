// Google Tag Manager bootstrap. Lives in a same-origin module rather than an
// inline <script> so the CSP can use script-src 'self' with no nonce or hash.
//
// The injection logic is a faithful copy of GTM's snippet — same container ID,
// same dataLayer shape, same async flag. One thing is NOT identical: the
// original ran synchronously while <head> was parsing, and a type="module"
// script is deferred until after the document is parsed. gtm.start and the
// first dataLayer push therefore fire slightly later than they used to.
// Accepted deliberately: restoring the old timing means a render-blocking
// request in <head> for every visitor, which costs more than it recovers on a
// page this size.
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  const f = d.getElementsByTagName(s)[0];
  const j = d.createElement(s);
  const dl = l !== 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-KFVLV9L8');
