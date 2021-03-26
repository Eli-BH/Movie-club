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
router.post("/comment", addComment);
router.get("/comment", getComments);

export default router;
