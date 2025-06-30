import { sign } from 'jsonwebtoken';

export async function onRequestPost(context) {
  const { request, env } = context;
  const { email, code, domain } = await request.json();

  // 1. Check invite-code in KV
  const valid = await env.INVITES.get(`${domain}:${code}`);
  if (!valid) return new Response('Ongeldige invite‐code', { status: 400 });

  // 2. Consumeer de code (éénmalig)
  await env.INVITES.delete(`${domain}:${code}`);

  // 3. Maak JWT
  const token = sign({ email, domain }, env.JWT_SECRET, { expiresIn: '7d' });

  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
