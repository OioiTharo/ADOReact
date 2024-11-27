import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token') || localStorage.getItem('token');
  const { pathname } = request.nextUrl;

  // Permitir acesso à página de login
  if (pathname === '/login') {
    if (token) {
      // Se já estiver logado, redireciona para home
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Verificar autenticação para outras rotas
  if (!token) {
    // Redirecionar para login se não estiver autenticado
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Configurar quais rotas o middleware deve proteger
export const config = {
  matcher: [
    '/',
    '/semana',
    '/adicionar',
    '/login'
  ]
};