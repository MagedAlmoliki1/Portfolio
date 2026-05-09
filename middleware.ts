// middleware.ts
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiting (Note: This is per-instance, not shared across serverless functions)
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100
const ipRequests = new Map<string, { count: number; start: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const stats = ipRequests.get(ip)

  if (!stats || now - stats.start > RATE_LIMIT_WINDOW) {
    ipRequests.set(ip, { count: 1, start: now })
    return false
  }

  stats.count++
  return stats.count > MAX_REQUESTS_PER_WINDOW
}

export default withAuth(
  function middleware(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'anonymous'
    
    // Rate Limiting for API routes
    if (req.nextUrl.pathname.startsWith('/api') && isRateLimited(ip)) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }

    const response = NextResponse.next()
    
    // Security headers
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
    
    // Content Security Policy (CSP)
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' blob: data: https://res.cloudinary.com;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://vitals.vercel-insights.com;
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim()
    response.headers.set('Content-Security-Policy', cspHeader)
    
    // Strict-Transport-Security (HSTS)
    if (process.env.NODE_ENV === 'production') {
      response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    }

    // Basic CSRF check for API POST/PUT/DELETE
    if (['POST', 'PUT', 'DELETE'].includes(req.method) && req.nextUrl.pathname.startsWith('/api')) {
      const origin = req.headers.get('origin')
      const host = req.headers.get('host')
      if (origin && !origin.includes(host || '')) {
        return new NextResponse('Invalid Origin', { status: 403 })
      }
    }

    return response
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
          return token?.role === 'admin'
        }
        return true
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
)

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/((?!_next/static|_next/image|favicon.ico).*)'],
}

