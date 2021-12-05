import type { NextFetchEvent, NextRequest } from 'next/server'

export function middleware (req: NextRequest, ev: NextFetchEvent) {
  console.log('ip地址 ' + req.ip)
  console.log(req.headers.get('user-agent'))
  // return new Response('adsf')
}
