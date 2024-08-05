import express from "express";
import { sendMessage } from "../controllers/messageSend.js";

const router = express.Router();

router.post('/send/:id', sendMessage);

export default router;
