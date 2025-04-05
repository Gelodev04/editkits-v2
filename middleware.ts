import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export function middleware(req: NextRequest) {
  // @ts-ignore
  const user = req.cookies.get("userInfo");

  if (!user) {
    return NextResponse.redirect(new URL("/home?login=true", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/job-status", "/dashboard/uploaded-files", "/account", "/tool/trim-video", "/tool/resize-vide"],
};
