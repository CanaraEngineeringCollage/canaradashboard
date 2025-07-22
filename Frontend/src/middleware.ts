// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function verifyJWT(token: string) {
  return await jwtVerify(token, secret);
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  const path = request.nextUrl.pathname;

  if (path === '/login' && token) {
    try {
      await verifyJWT(token);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (err) {
      console.error("Invalid token on /login access:", err);
    }
  }

  if (path === '/login') {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    await verifyJWT(token);
    return NextResponse.next(); 
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
