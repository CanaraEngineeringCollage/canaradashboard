// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  console.log(token,"token");
  

  // Allow login page without token
  if (request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.next();
  }

  if (!token) {
    
    return NextResponse.redirect(new URL('/login', request.url));
    
  }

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  console.log("Token verified:", decoded);
  return NextResponse.next();
} catch (err) {
  console.error("JWT verification failed:", err);
  return NextResponse.redirect(new URL('/login', request.url));
}

}

export const config = {
  matcher: ['/dashboard/:path*'], // Protected routes
};
