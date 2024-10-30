/* eslint-disable @typescript-eslint/no-explicit-any */
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // JOSE for JWT verification

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  console.log(pathname);
  const isAuthRoute =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");

  // if()

  //
  try {
    // If no tokens and accessing a protected route, redirect to login
    // if (
    //   !accessToken &&
    //   (pathname.startsWith("/dashboard") ||
    //     pathname.includes("/dashboard") ||
    //     pathname.startsWith("/profile") ||
    //     pathname.includes("/profile"))
    // ) {
    //   return NextResponse.redirect(new URL("/auth/login", req.url));
    // }

    // If no tokens and accessing auth routes, allow
    if (!accessToken && !refreshToken && isAuthRoute) {
      return NextResponse.next();
    }

    // Verify access token if it exists
    if (accessToken) {
      try {
        const secret = new TextEncoder().encode(
          process.env.ACCESS_TOKEN_SECRET
        );

        // Verify the access token
        await jwtVerify(accessToken, secret, { algorithms: ["HS256"] });
        console.log("Access token valid, authenticated user.");

        // Prevent authenticated users from accessing auth routes
        if (isAuthRoute) {
          return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
      } catch (error: any) {
        // Handle expired access token
        if (error.code === "ERR_JWT_EXPIRED" && refreshToken) {
          console.log("Access token expired, attempting to refresh...");

          // Attempt to refresh the token
          const refreshResponse = await fetch(
            new URL("/api/auth/refresh-token", req.url),
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include", // Send cookies with the request
            }
          );

          if (refreshResponse.ok) {
            const newAccessToken = refreshResponse.headers.get("Set-Cookie");

            if (newAccessToken) {
              console.log("Access token refreshed successfully.");

              // Set the new access token in the cookies
              const response = NextResponse.next();
              response.headers.append("Set-Cookie", newAccessToken);

              // If the user is trying to access auth routes, block them
              if (isAuthRoute) {
                return NextResponse.redirect(new URL("/", req.url));
              }

              return response;
            } else {
              console.error("No new access token received during refresh.");
              return NextResponse.redirect(new URL("/auth/login", req.url));
            }
          } else {
            console.error("Failed to refresh token, redirecting to login.");
            return NextResponse.redirect(new URL("/auth/login", req.url));
          }
        }

        // Handle any other JWT verification errors
        console.error("JWT verification error:", error);
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    }

    return NextResponse.next(); // Proceed if no issues
  } catch (error: any) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*", // Protect all dashboard routes
    "/auth/:path*", // Apply middleware to all auth routes
  ],
};
