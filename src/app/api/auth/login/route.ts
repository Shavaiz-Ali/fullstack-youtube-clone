import connectToDB from "@/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // For generating tokens
import cookie from "cookie"; // Use cookie-parser for setting cookies

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "your-access-token-secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "your-refresh-token-secret";

// Token generation function
const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
    algorithm: "HS256", // Changed 'algorithms' to 'algorithm'
  });
};
const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
    algorithm: "HS256", // Changed 'algorithms' to 'algorithm'
  });
};

export async function POST(req: NextRequest) {
  await connectToDB(); // Ensure database connection

  try {
    const { email, password } = await req.json(); // Get email and password from request body

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Check if user exists in the database
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return NextResponse.json(
        {
          success: false,
          message: "User with the given email not found!",
        },
        { status: 404 }
      );
    }

    // Compare the provided password with the stored hashed password
    const checkPassword = await bcrypt.compare(password, userExists.password);

    if (!checkPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Password is incorrect",
        },
        { status: 400 }
      );
    }

    // Generate tokens
    const accessToken = generateAccessToken(userExists._id);
    const refreshToken = generateRefreshToken(userExists._id);

    // Save refresh token to the database
    userExists.refreshToken = refreshToken; // Assuming refreshToken field exists in user model
    await userExists.save();

    // Set cookies for access token and refresh token (HTTP-only, Secure, SameSite)
    const accessTokenCookie = cookie.serialize("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60,
      sameSite: "strict",
      path: "/",
    });

    const refreshTokenCookie = cookie.serialize("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      sameSite: "strict",
      path: "/",
    });

    // Set the cookies in the response headers
    const response = NextResponse.json(
      {
        success: true,
        message: "User logged in successfully!",
      },
      { status: 200 }
    );
    // Add cookies to the response
    response.headers.set(
      "Set-Cookie",
      `${accessTokenCookie}; ${refreshTokenCookie}`
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
