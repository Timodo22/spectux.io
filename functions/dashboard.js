import { verify } from 'jsonwebtoken';

export async function onRequestGet(context) {
  const { request, env } = context;
  const auth = request.headers.get('Authorization')?.split(' ')[1];
  if (!auth) return new Response('Missing token', { status: 401 });
  let payload;
  try {
    payload = verify(auth, env.JWT_SECRET);
  } catch {
    return new Response('Invalid token', { status: 401 });
  }

  // Haal data uit Cloudflare API
  const cfRes = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${payload.domain}/analytics/dashboard`,
    {
      headers: { Authorization: `Bearer ${env.CF_API_TOKEN}` }
    }
  );
  const data = await cfRes.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
