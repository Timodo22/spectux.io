import { sign, verify } from 'jsonwebtoken';

export async function onRequestPost(context) {
  const { request, env } = context;
  const { email, password } = await request.json();

  // Optioneel: haal hashed password uit KV of D1
  // const stored = await env.USERS.get(email);
  // if (!stored || !verifyPassword(password, stored)) ...

  // Voor nu: geen wachtwoord, alleen e-mail
  const token = sign({ email }, env.JWT_SECRET, { expiresIn: '7d' });

  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
