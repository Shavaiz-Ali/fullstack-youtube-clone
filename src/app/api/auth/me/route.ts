export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode"; // Ensure correct import for synchronous decoding
import User from "@/models/userModel";

export async function GET(req: NextRequest) {
  try {
    // Retrieve token from cookies
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Token is missing! Please log in again.",
        },
        { status: 400 }
      );
    }

    // Decode the token (synchronous)
    const decodedToken = jwtDecode<{ userId: string; exp: number }>(token);

    // Check if the token has expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      return NextResponse.json(
        {
          success: false,
          message: "Token has expired! Please log in again.",
        },
        { status: 401 }
      );
    }

    const userId = decodedToken.userId;
    console.log("User ID:", userId);

    // Find user by ID, populate the channel field, and exclude sensitive fields
    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found! Try logging in again.",
        },
        { status: 404 }
      );
    }

    // Respond with the populated user data on successful retrieval
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
