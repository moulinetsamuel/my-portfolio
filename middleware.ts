import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const method = req.method;

    // Sécurisation du dashboard
    if (path.startsWith('/dashboard')) {
      if (token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/access-denied', req.url));
      }
    }

    // Sécurisation des opérations sensibles sur les routes API
    if (
      path.startsWith('/api') &&
      (method === 'POST' || method === 'PUT' || method === 'DELETE')
    ) {
      if (!token || token.role !== 'admin') {
        return new NextResponse(JSON.stringify({ error: 'Non autorisé' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Autoriser l'accès aux routes GET même sans token
        if (req.method === 'GET') {
          return true;
        }
        // Pour les autres méthodes sur les routes API, vérifier le token
        if (req.nextUrl.pathname.startsWith('/api')) {
          return true;
        }
        // Pour le dashboard, vérifier le token
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token && token.role === 'admin';
        }
        // Autoriser l'accès aux autres routes
        return true;
      },
    },
  },
);

export const config = { matcher: ['/dashboard/:path*', '/api/:path*'] };
