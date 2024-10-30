import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
    },
    subscribers: {
      type: Number,
      required: false,
    },
    subscribed: {
      type: [String],
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    coverImage: {
      type: String,
      required: false,
    },
    playlists: {
      type: [String],
      required: false,
    },
    videoCount: {
      type: [String],
      required: false,
    },
    shorts: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

const Channel =
  mongoose.models.Channel || mongoose.model("Channel", channelSchema);
export { Channel };
