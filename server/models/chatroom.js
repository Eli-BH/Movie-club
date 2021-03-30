import mongoose from "mongoose";
import Message from "./message.js";

const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  messages: [Message.schema],
});

export default mongoose.model("Room", chatroomSchema);
