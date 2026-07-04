import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";
import { routing } from "@/lib/i18n-routing";

const { auth } = NextAuth(authConfig);
const handleI18nRouting = createMiddleware(routing);
const localePattern = new RegExp(`^/(${routing.locales.join("|")})(?:/|$)`);

function localizedPath(pathname: string, path: string) {
  const locale = pathname.match(localePattern)?.[1] ?? routing.defaultLocale;
  return locale === routing.defaultLocale ? path : `/${locale}${path}`;
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isDashboardRoute = /\/dashboard(\/|$)/.test(pathname);
  const isAdminRoute = /\/dashboard\/admin(\/|$)/.test(pathname);
  const isAuthRoute = /\/(sign-in|sign-up)(\/|$)/.test(pathname);

  if (isDashboardRoute && !req.auth) {
    return NextResponse.redirect(
      new URL(localizedPath(pathname, "/sign-in"), req.nextUrl),
    );
  }

  if (isAuthRoute && req.auth) {
    return NextResponse.redirect(
      new URL(localizedPath(pathname, "/dashboard"), req.nextUrl),
    );
  }

  if (isAdminRoute && !req.auth?.user.roles.includes("admin")) {
    return NextResponse.redirect(
      new URL(localizedPath(pathname, "/dashboard"), req.nextUrl),
    );
  }

  return handleI18nRouting(req);
});

export const config = {
  matcher: ["/((?!api|trpc|monitoring|_next|_vercel|.*\\..*).*)"],
};
