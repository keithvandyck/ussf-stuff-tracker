import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/' || path === '/login' || path === '/register' || path === '/list'

  const token = request.cookies.get('auth-token')?.value || ''

  if (isPublicPath && token) {
	return NextResponse.redirect(new URL('/account', request.url))
  }

  if (!isPublicPath && !token) {
	return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
	'/',
	'/login',
	'/signup',
	'/account',
	'/add'
  ]
}