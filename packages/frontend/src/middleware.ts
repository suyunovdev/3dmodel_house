import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/dashboard', '/generate', '/result']
const authRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // auth-storage cookie dan token o'qish
  const authStorage = request.cookies.get('auth-storage')
  let token: string | null = null

  if (authStorage) {
    try {
      const parsed = JSON.parse(decodeURIComponent(authStorage.value))
      token = parsed?.state?.token ?? null
    } catch {
      token = null
    }
  }

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthPage = authRoutes.some(route => pathname.startsWith(route))

  if (isProtected && !token) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
