import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Add CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    
    // Add the CORS headers to the response
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    response.headers.set('Access-Control-Allow-Origin', '*') // Replace * with your domain in production
    response.headers.set('Access-Control-Allow-Methods', 'DELETE,PATCH,POST,PUT')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    )
    
    return response
  }
  
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/:path*'],
}
