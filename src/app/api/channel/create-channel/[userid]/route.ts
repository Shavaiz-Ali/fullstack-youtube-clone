// Import User and Channel models
import User from "@/models/userModel";
import { Channel } from "@/models/channelModel";
import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/db";

export async function POST(
  req: NextRequest,
  params: { params: { userid: string } }
) {
  await connectToDB();

  try {
    // Parse the request body
    const body = await req.json();
    const { channelData } = body;
    const userId = params.params.userid;

    console.log(userId);

    // Destructure channelData for easier access
    const { channelName, channelHandle, avatar, coverImage } = channelData;

    // Validate required fields
    if (!channelName || !channelHandle || !userId) {
      return NextResponse.json({
        status: 400,
        message: "Fill all required fields!",
      });
    }

    // Step 1: Create the new channel
    const channel = new Channel({
      channelName,
      channelHandle,
      avatar,
      coverImage,
    });
    await channel.save();

    // Step 2: Check if channel creation was successful
    if (!channel) {
      return NextResponse.json(
        { message: "Unable to create channel" },
        { status: 400 }
      );
    }

    // Step 3: Find the user to ensure they exist before updating
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Step 4: Update the user's channel field with the new channel ID
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { channel: channel._id },
      { new: true }
    ).populate("channel");

    // await updatedUser.save();

    console.log("This is the updated user:", updatedUser); // Log the updated user

    // Check if the user update was successful
    if (!updatedUser) {
      return NextResponse.json(
        { message: "Unable to update user with new channel" },
        { status: 404 }
      );
    }

    console.log("updated data", updatedUser);
    // Step 5: Return the populated user with channel data
    // const populatedUser = await User.findById(userId)
    //   .populate("channel")
    //   .select("-password -refreshToken");

    // if (!populatedUser) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Unable to populate user",
    //     },
    //     { status: 400 }
    //   );
    // }

    // await populatedUser.save();

    return NextResponse.json(
      {
        message: "Channel Created Successfully",
        channel: channel,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating channel:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
