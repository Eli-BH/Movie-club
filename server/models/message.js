import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  name: {
    type: String,
  },

  author: {
    type: String,
  },
  message: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Message", messageSchema);
