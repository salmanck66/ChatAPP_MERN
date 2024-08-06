import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const recieverId = req.params.id;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    Promise.all([await conversation.save(), await newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error.message, "error in sendMessage");
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");
    let messages = conversation.messages 
    if(!conversation)return res.status(200).json({})

    res.status(200).json(messages || "")

  } catch (error) {
    console.log("error message get controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
