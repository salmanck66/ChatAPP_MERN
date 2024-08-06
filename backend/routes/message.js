import express from "express";
import protectRoute from "../middleware/protectroute.js";
import { sendMessage,getMessage } from "../controllers/messageSend.js";

const router = express.Router();

router.get("/recieve/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
