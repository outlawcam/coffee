// Cloudflare Worker: serves the static build via the ASSETS binding and
// handles the inquiry API.
//
// Routing is asset-first by default — Cloudflare matches a static asset
// before invoking this script — so `/` and `/assets/*` never reach here.
// Only paths with no matching asset do, which in practice is /api/inquiry
// plus anything mistyped.

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/inquiry') {
      if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405);
      return handleInquiry(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleInquiry(request, env) {
  return json({ ok: false, error: 'unimplemented' }, 501);
}
