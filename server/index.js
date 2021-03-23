import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/users.js";

dotenv.config();

const app = express();

app.use(cors());
app.use("/users", userRouter);

const CONNECTION_URI = process.env.MOGODB_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server connected,  started on port ${PORT}`);
    })
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
