import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { SESSION_TOKEN } from '@/lib/auth';

// The plain-text password is only ever compared server-side — never sent to the client.
const CORRECT_HASH = createHash('sha256').update('aimortgage').digest('hex');

export async function POST(request: Request) {
  const { password } = await request.json();

  if (typeof password !== 'string') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const submitted = createHash('sha256').update(password).digest('hex');

  if (submitted !== CORRECT_HASH) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set('mc_auth', SESSION_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete('mc_auth');
  return response;
}
