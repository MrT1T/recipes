import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { ROUTES } from '@/constants/routes';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  const protectedPaths = [ROUTES.INGREDIENTS, ROUTES.RECIPES_NEW, ROUTES.RECIPES_EDIT(':path*')];

  if (protectedPaths.includes(pathname)) {
    if (!token) {
      const url = new URL('/error', request.url);
      url.searchParams.set('message', 'You must be signed in to access this page.');
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/ingredients', '/recipes/new', '/recipes/:path*'],
};
