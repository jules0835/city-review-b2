import createMiddleware from "next-intl/middleware"
import { withAuth } from "next-auth/middleware"

export const locales = ["us", "fr", "de", "es", "cn", "it"]
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "fr",
  localeDetection: true,
})
const authMiddleware = withAuth((req) => intlMiddleware(req), {
  callbacks: {
    authorized: ({ token }) => token !== null,
  },
  pages: {
    signIn: "/authentication",
  },
})

export default function middleware(req) {
  const excludeList = ["user", "admin", "new-location"]
  const excludePattern = `^(/(${locales.join("|")}))?/(${excludeList.join("|")})/?.*?$`
  const publicPathnameRegex = RegExp(excludePattern, "iu")
  const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    return intlMiddleware(req)
  }

  return authMiddleware(req)
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
