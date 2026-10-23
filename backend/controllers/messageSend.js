import mongoose from "mongoose";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import User from "../models/user.js";
import { emitToUser } from "../socket/socket.js";

const MAX_MESSAGE_LENGTH = 2000;

export const sendMessage = async (req, res) => {
  try {
    const message = typeof req.body.message === "string" ? req.body.message.trim() : "";
    const recieverId = req.params.id;
    const senderId = req.user._id;

    if (!message) return res.status(400).json({ error: "Message content is required" });
    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ error: `Message must be under ${MAX_MESSAGE_LENGTH} characters` });
    }
    if (!mongoose.isValidObjectId(recieverId) || senderId.equals(recieverId)) {
      return res.status(400).json({ error: "Invalid recipient" });
    }
    if (!(await User.exists({ _id: recieverId }))) {
      return res.status(404).json({ error: "Recipient not found" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId], $size: 2 },
    });
    if (!conversation) {
      conversation = await Conversation.create({ participants: [senderId, recieverId] });
    }

    const newMessage = await Message.create({ senderId, recieverId, message });
    await Conversation.updateOne({ _id: conversation._id }, { $push: { messages: newMessage._id } });

    // Emit only after the message is persisted
    emitToUser(recieverId, "newMessage", newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    if (!mongoose.isValidObjectId(userToChatId)) {
      return res.status(400).json({ error: "Invalid user" });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, userToChatId], $size: 2 },
    }).populate("messages");

    res.status(200).json(conversation ? conversation.messages : []);
  } catch (error) {
    console.error("Error in getMessage:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
