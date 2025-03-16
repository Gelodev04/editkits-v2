import { NextResponse } from "next/server";

export function middleware(req) {
  const res = NextResponse.next();

  res.headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self'; object-src 'none';");

  return res;
}
