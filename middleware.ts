import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import next from 'next';


export async function middleware(request: NextRequest,response:NextResponse) {
  
  // public routes will be accessible without authentication
  if(request.nextUrl.pathname==="/error" || request.nextUrl.pathname==="/register" || request.nextUrl.pathname==="/login" || request.nextUrl.pathname==="/auth/confirm"){
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
    return response
  }

  // private routes will be intersepted by below
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}