/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * This is the fallback the contact form posts to when config.contact.formEndpoint
 * is NOT set. It runs on Cloudflare Pages (not part of the Next static export).
 *
 * As shipped it's a safe PLACEHOLDER: it drops obvious spam and returns a friendly
 * confirmation, but it does NOT deliver the message anywhere. Wire up delivery
 * before launch — options:
 *   1. Set `contact.formEndpoint` in site.config.json to a Formspree URL (simplest —
 *      no function needed), OR
 *   2. Send from here via Cloudflare MailChannels / Resend / your CRM webhook
 *      (replace the TODO below), adding any secrets as Pages environment variables.
 *
 * Docs: https://developers.cloudflare.com/pages/functions/
 */

type PagesFunctionContext = {
  request: Request;
  env: Record<string, string | undefined>;
};

export async function onRequestPost(context: PagesFunctionContext): Promise<Response> {
  const { request } = context;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return new Response('Bad request', { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, do nothing.
  if (form.get('_gotcha')) {
    return htmlResponse('Thanks — your message was received.');
  }

  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const message = String(form.get('message') ?? '').trim();

  if (!name || !email || !message) {
    return htmlResponse('Please complete all required fields and try again.', 422);
  }

  // TODO(launch): deliver the message. Example with MailChannels or Resend goes here.
  // For now we simply acknowledge receipt.

  return htmlResponse(
    `Thanks, ${escapeHtml(name)} — your message was received. We'll be in touch within one business day.`,
  );
}

function htmlResponse(message: string, status = 200): Response {
  const body = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Message received</title>
<style>body{font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#f5f7f9;color:#101720}
.card{max-width:32rem;padding:2.5rem;background:#fff;border-radius:14px;box-shadow:0 20px 48px -24px rgba(15,23,42,.3);text-align:center}
a{color:#1b4d89}</style></head>
<body><div class="card"><h1>Message received</h1><p>${escapeHtml(message)}</p><p><a href="/">← Back to the site</a></p></div></body></html>`;
  return new Response(body, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
