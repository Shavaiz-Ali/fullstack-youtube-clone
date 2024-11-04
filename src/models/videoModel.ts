import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: 100,
      required: true,
    },
    description: {
      type: String,
      maxlength: 5000,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    videoLength: {
      type: Number, // Better as a Number for duration in seconds or milliseconds
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);

export { Video };
