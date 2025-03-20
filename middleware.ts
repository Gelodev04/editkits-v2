import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // @ts-ignore
  const user = req.cookies.get("userInfo");

  if (!user) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/account", "/tool/trim-video", "/tool/resize-vide"],
};
