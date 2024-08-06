import Conversation from "../models/conversation.js";
import Message from '../models/message.js'
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const { senderId } = req.user._id;
    console.log(req.user._id)

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if(!conversation)
    {
      conversation = await Conversation.create(
        {
          participants:[senderId,recieverId]
        }
      )
    }

    const newMessage = new Message({
      senderId:req.user._id,
      recieverId,
      message
    })

    if(newMessage)
    {
      conversation.messages.push(newMessage._id)
    }
    res.status(201).json(newMessage)
  } catch (error) {
    console.log(error.message, "error in sendMessage");
  }
};
