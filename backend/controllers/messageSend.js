import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import { getRecieverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js"; // Make sure to import io if it's not globally available

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const recieverId = req.params.id; // The recipient of the message
    const senderId = req.user._id; // The sender is derived from the authenticated user
    console.log("Sender:", senderId, "Reciever:", recieverId, "Message:", message);

    // Validate message content
    if (!message) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    // Find an existing conversation or create a new one
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id); // Add the message to the conversation
    }

    // Get the recipient's socket ID
    const RecSocketId = getRecieverSocketId(recieverId);
    if (RecSocketId) {
      io.to(RecSocketId).emit('newMessage', newMessage); // Emit the message in real-time to the recipient
    }

    // Save the conversation and message simultaneously
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error.message, "error in sendMessage");
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    // Fetch the conversation where both the sender and receiver are participants
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
