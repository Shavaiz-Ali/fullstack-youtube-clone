import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: false,
  },
  watchHistory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Videos",
    required: false,
  },
  refreshToken: {
    type: String,
    required: false,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
