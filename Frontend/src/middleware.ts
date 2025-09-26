import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const jwt = req.cookies.get('jwt');

  const isAuthPage = req.nextUrl.pathname.startsWith('/login');
  const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');

  if (!jwt && isDashboard) {
    // Not logged in, redirect to login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (jwt && isAuthPage) {
    // Already logged in, redirect away from login page
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/dashboard/:path*'],
};