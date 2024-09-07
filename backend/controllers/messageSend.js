import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const recieverId = req.params.id;
    const senderId = req.user._id;
    console.log(recieverId, senderId, message);

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

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

    await Promise.all([conversation.save(), newMessage.save()]); // Fixed Promise.all usage

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error.message, "error in sendMessage");
    res.status(500).json({ error: 'Internal server error' }); // Added error response
  }
};


export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    // Fetch the conversation where both sender and receiver are participants
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    // If no conversation is found, respond with an empty array
    if (!conversation) {
      return res.status(200).json([]);
    }

    // Return the messages if the conversation is found
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

