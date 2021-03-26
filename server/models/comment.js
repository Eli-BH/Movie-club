import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  movieId: {
    type: String,
  },
  userId: {
    type: String,
  },
  comment: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Comment", commentSchema);
