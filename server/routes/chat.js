import express from "express";
import { newChatroom, newMessage } from "../controllers/chat.js";

const router = express.Router();

router.post("/connect", newChatroom);
router.post("/message", newMessage);

export default router;
