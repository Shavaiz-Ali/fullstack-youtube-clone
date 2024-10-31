// import { Channel } from "@/models/channelModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  // const parsedBody = Channel.safeParse(body);

  console.log(body);
  const { channelName, channelHandle, avatar, coverImage } = body;

  if (!channelName || !channelHandle) {
    return NextResponse.json({
      status: 400,
      message: "fill all required fields!",
    });
  }

  return NextResponse.json({ message: "hello" });
}
