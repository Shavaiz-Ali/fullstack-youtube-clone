/* eslint-disable @typescript-eslint/no-unused-vars */
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/schemas";
import connectToDB from "@/db";

export async function POST(req: NextRequest) {
  await connectToDB();

  try {
    const body = await req.json();
    const parsedBody = registerSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { success: false, message: "Invalid input data", errors: parsedBody.error.errors },
        { status: 400 }
      );
    }

    const { username, fullName, email, password } = parsedBody.data;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User with the email or username already exists",
        },
        { status: 400 }
      );
    }

    const saltRounds = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, saltRounds);

    const user = new User({
      username,
      fullName,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    if (!savedUser) {
      return NextResponse.json(
        { success: false, message: "Failed to create user" },
        { status: 500 }
      );
    }

    const userResponse = await User.findById(savedUser._id).select("-password");

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: userResponse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
