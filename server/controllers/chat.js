import Room from "../models/chatroom.js";
import Message from "../models/message.js";

export const newChatroom = async (req, res) => {
  const { name } = req.body;

  try {
    const existingRoom = await Room.findOne({ name });
    if (existingRoom) return res.json(existingRoom);

    const newRoom = await Room.create({
      name,
    });
    await newRoom.save();

    res.status(200).json(newRoom);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong [newRoom]" });
  }
};

export const newMessage = async (req, res) => {
  const { name, author, message } = req.body;
  console.log(req.body);

  try {
    const existingRoom = await Room.findOne({ name });

    if (!existingRoom)
      return res.status(404).json({ message: "room not found" });

    const newMessage = await Message.create({
      name,
      author,
      message,
    });
    newMessage.save();

    existingRoom.messages = [...existingRoom.messages, newMessage];
    existingRoom.save();

    res.status(200).json(existingRoom.messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong [newMessage]" });
  }
};
