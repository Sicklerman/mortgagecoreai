import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_TOKEN } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow the login page and auth API endpoints
  if (pathname === '/login' || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get('mc_auth');
  if (!authCookie || authCookie.value !== SESSION_TOKEN) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on all paths except Next.js internals and static assets
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
