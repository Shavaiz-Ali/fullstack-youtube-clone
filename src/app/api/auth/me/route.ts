export const dynamic = 'force-dynamic';


import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode"; // This doesn't need to be async
import User from "@/models/userModel";

export async function GET(req: NextRequest) {
  try {
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

    // Decode the token (sync)
    const decodedToken = jwtDecode<{ userId: string; exp: number }>(token);

    // Check if token has expired
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

    // Find user by ID (make sure to use correct query syntax)
    const user = await User.findOne({ _id: userId }).select(
      "-password -refreshToken"
    );
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found! Try logging in again.",
        },
        { status: 404 }
      );
    }

    // Successful response
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
