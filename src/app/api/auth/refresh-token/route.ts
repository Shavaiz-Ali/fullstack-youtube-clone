// app/api/auth/refresh-token/route.js

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectToDB from "@/db";
import User from "@/models/userModel";
import cookie from "cookie";

export async function POST(req) {
  await connectToDB();
console.log("refreshing token")
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "Refresh token is missing" },
      { status: 401 }
    );
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find the user by the userId stored in the refresh token
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.json(
        { message: "Invalid refresh token" },
        { status: 403 }
      );
    }

    // Issue a new access token
    const newAccessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m", // 15 minutes
      }
    );

    // Set the new access token in an HTTP-only cookie
    const res = NextResponse.json({ message: "Token refreshed" });
    res.headers.set(
      "Set-Cookie",
      cookie.serialize("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60, // 15 minutes
        path: "/",
      })
    );

    return res;
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid refresh token" , error},
      { status: 403 }
    );
  }
}
