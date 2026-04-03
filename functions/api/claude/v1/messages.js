/**
 * Cloudflare Pages Function — מעביר בקשות ל-Anthropic API.
 * הגדרו ANTHROPIC_API_KEY ב-Environment Variables (למשל בדשבורד Cloudflare).
 */
export async function onRequestPost(context) {
  const apiKey = context.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'ANTHROPIC_API_KEY חסר ב-environment' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }

  let body
  try {
    body = await context.request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'גוף בקשה לא תקין' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  })

  const text = await anthropicRes.text()
  return new Response(text, {
    status: anthropicRes.status,
    headers: {
      'Content-Type': anthropicRes.headers.get('Content-Type') || 'application/json',
    },
  })
}
