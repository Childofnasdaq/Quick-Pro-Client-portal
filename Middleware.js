import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get stored auth data
  const adminAuth = request.cookies.get('admin-storage')
  const userAuth = request.cookies.get('auth-storage')

  // Admin routes protection
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }
    
    if (!adminAuth || !JSON.parse(adminAuth.value).state.isAdmin) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Client routes protection
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!userAuth || !JSON.parse(userAuth.value).state.currentUser) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}
