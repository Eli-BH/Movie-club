import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { Server } from "socket.io";

import userRouter from "./routes/users.js";
import chatRouter from "./routes/chat.js";

dotenv.config();

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use("/users", userRouter);
app.use("/chat", chatRouter);
const CONNECTION_URI = process.env.MOGODB_URI;
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server connected,  started on port ${PORT}`);
});

mongoose
  .connect(CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    //connection to the server
    console.log("Connected to mongo data base")
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  //random id from socket io
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User has entered ${data} room.`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});
