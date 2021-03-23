import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  likes: {
    type: [String],
  },
  favorites: {
    type: [String],
  },
  comments: {
    type: [
      {
        movie: String,
        comment: String,
      },
    ],
  },
  id: { type: String },
});

export default mongoose.model("User", userSchema);
