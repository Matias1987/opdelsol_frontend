import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    console.log(request.nextUrl);
    return NextResponse.next()
    //return NextResponse.redirect(new URL('/about-2', request.url))
  }

  // See "Matching Paths" below to learn more
export const config = {
    matcher: '/v1/deposito/:path*',
  }