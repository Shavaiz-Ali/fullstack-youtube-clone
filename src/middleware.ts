/* eslint-disable @typescript-eslint/no-explicit-any */
// middleware.js

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Using jose for JWT verification

export async function middleware(req: NextRequest) {
  console.log("Middleware triggered");

  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value; // Get refresh token from cookies
  console.log("Access token from middleware:", accessToken);

  // If no access token and the request is for a protected route (dashboard), redirect to login
  if (!accessToken && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // If an authenticated user tries to access auth pages, redirect to home
  if (
    accessToken &&
    (pathname.includes("/auth/login") ||
      pathname.includes("/auth/register") ||
      pathname.startsWith("/auth"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If there's an access token, verify it
  if (accessToken) {
    try {
      const secret = process.env.ACCESS_TOKEN_SECRET;
      if (!secret) {
        throw new Error(
          "ACCESS_TOKEN_SECRET is not defined in environment variables."
        );
      }

      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(secret),
        {
          algorithms: ["HS256"],
        }
      );

      console.log("Authenticated user:", payload);
      return NextResponse.next(); // Allow the request if token is valid
    } catch (error: any) {
      // If token is expired, attempt to refresh it using the refresh token
      if (error.code === "ERR_JWT_EXPIRED" && refreshToken) {
        console.error("JWT expired, trying to refresh...");

        // Call the refresh token route to get a new access token
        const refreshResponse = await fetch(
          new URL("/api/auth/refresh-token", req.url),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Send cookies with the request
          }
        );

        // If the refresh was successful, set the new access token and proceed
        if (refreshResponse.ok) {
          const newAccessToken = refreshResponse.headers.get("Set-Cookie");

          // Ensure newAccessToken is not null before appending
          if (newAccessToken) {
            const response = NextResponse.next();
            response.headers.append("Set-Cookie", newAccessToken);
            console.log("Access token refreshed successfully");
            return response; // Return the response after setting the cookie
          } else {
            console.error("No new access token received.");
            return NextResponse.redirect(new URL("/auth/login", req.url));
          }
        } else {
          // If the refresh fails, redirect to login
          console.error("Refresh token failed, redirecting to login");
          return NextResponse.redirect(new URL("/auth/login", req.url));
        }
      }

      // If refresh token is missing or any other error occurs, redirect to login
      console.error(
        "JWT verification failed:",
        error instanceof Error ? error.message : "Unknown error"
      );
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next(); // Allow the request if token verification is not needed
}

export const config = {
  matcher: [
    "/dashboard/:path*", // Protect all dashboard routes
    "/auth/:path*", // Apply middleware to all auth routes as well
  ],
};
