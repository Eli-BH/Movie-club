import express from "express";

import {
  signin,
  signup,
  getUser,
  likeMovie,
  addComment,
  getComments,
} from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/profile/:id", getUser);
router.patch("/like/:id", likeMovie);
router.post("/comment/:id", addComment);
router.get("/comment/:id", getComments);

export default router;
