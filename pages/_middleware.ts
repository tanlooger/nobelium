import type { NextFetchEvent, NextRequest } from 'next/server'

export function middleware (req: NextRequest, ev: NextFetchEvent) {
  console.log(req)
  // return new Response('adsf')
}
