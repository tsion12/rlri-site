import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  const isMainSite =
    hostname === 'reallifeinstitute.org' ||
    hostname === 'www.reallifeinstitute.org'

  const isPreview = hostname === 'rlri-site-git-main-site-tsion12s-projects.vercel.app'

  const isAfricaSite = hostname.includes('africa-programs')

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  if (isPreview) {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/main/en', request.url))
    }
    return NextResponse.next()
  }

  if (isMainSite) {
    return NextResponse.rewrite(
      new URL(`/main/en${pathname === '/' ? '' : pathname}`, request.url)
    )
  }

  if (isAfricaSite && !pathname.startsWith('/africa')) {
    return NextResponse.rewrite(
      new URL(`/africa${pathname === '/' ? '' : pathname}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
