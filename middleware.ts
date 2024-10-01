import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token'); // Get the authentication token (if available)

  const { pathname } = request.nextUrl; // Extract the requested pathname

  // Log the requested pathname and the token (if present)
  console.log('Requested pathname:', pathname);
  console.log('Token:', token ? token.value : 'No token');
  console.log('Cookies available:', ResponseCookies.arguments());

  // Allow access to public routes: /signup and /login
  if (pathname.startsWith('/signup') || pathname.startsWith('/login')) {
    return NextResponse.next(); // Continue to the next middleware or the route handler
  }

  // Check if a protected route (e.g., /dashboard) is being accessed without an authentication token
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login page if no token is found
  }

  // Allow access if token exists or the route is not protected
  return NextResponse.next();
}
