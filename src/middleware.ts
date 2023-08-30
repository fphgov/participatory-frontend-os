import { NextRequest, NextResponse } from "next/server"
import { verifyJWT } from "./lib/token"
import { getErrorResponse } from "./lib/helpers"

type User = {
  username: string
  firstname: string
  lastname: string
  email: string
  role: string
}

interface AuthenticatedRequest extends NextRequest {
  user: User
}

let redirectToLogin = false
export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/api/login") ||
    req.nextUrl.pathname.startsWith("/api/media")
  ) {
    return NextResponse.next()
  }

  let token: string | undefined

  if (req.cookies.has("token")) {
    token = req.cookies.get("token")?.value
  } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.substring(7)
  }

  if (req.nextUrl.pathname.startsWith("/bejelentkezes") && (!token || redirectToLogin)) {
    return
  }

  if (
    !token &&
    (
      req.nextUrl.pathname.startsWith("/api/users") ||
      req.nextUrl.pathname.startsWith("/api/logout")
    )
  ) {
    return getErrorResponse(
      401,
      "You are not logged in. Please provide a token to gain access."
    )
  }

  const requestHeaders = new Headers(req.headers)

  try {
    if (token) {
      const jwt = await verifyJWT<{ user: User }>(token)

      requestHeaders.set('X-USERNAME', jwt?.user?.username);

      (req as AuthenticatedRequest).user = jwt?.user
    }
  } catch (error: any) {
    redirectToLogin = true

    console.log(error)

    if (req.nextUrl.pathname.startsWith("/api")) {
      return getErrorResponse(401, "Token is invalid or user doesn't exists")
    }
  }

  if (redirectToLogin) {
    const response = NextResponse.redirect(new URL(`/bejelentkezes`, req.url))

    response.cookies.set("token", "", { expires: new Date(Date.now()) })

    return response
  }

  const authUser = (req as AuthenticatedRequest).user

  if (!authUser) {
    return NextResponse.redirect(
      new URL('/bejelentkezes', req.url)
    )
  }

  if (req.url.includes("/bejelentkezes")) {
    return NextResponse.redirect(new URL("/profil", req.url))
  }

  if (req.url.includes("/kijelentkezes")) {
    const response = NextResponse.redirect(new URL("/force-redirect", req.url))

    response.cookies.set("token", "", { expires: new Date(Date.now()) })

    return response
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    '/api/:path*',
    "/profil",
    "/bejelentkezes",
    "/kijelentkezes",
  ],
}
