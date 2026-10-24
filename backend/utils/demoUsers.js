import bcrypt from "bcryptjs";
import User from "../models/user.js";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

// Public demo accounts so anyone can try the app without signing up.
// Open two browsers (or one normal + one private window) and log in as each.
export const DEMO_USERS = [
  { userName: "demo_alex", fullName: "Alex (demo)", email: "alex@example.com", gender: "Male" },
  { userName: "demo_sam", fullName: "Sam (demo)", email: "sam@example.com", gender: "Female" },
];
export const DEMO_PASSWORD = "demo1234";

const WELCOME = [
  ["demo_sam", "Hey Alex! 👋 Try replying — it shows up instantly in the other window."],
  ["demo_alex", "Nice. Open a private window, log in as Sam, and watch the online dot turn green."],
];

export const ensureDemoUsers = async () => {
  const password = await bcrypt.hash(DEMO_PASSWORD, 10);
  for (const demo of DEMO_USERS) {
    await User.updateOne({ userName: demo.userName }, { $set: { ...demo, password } }, { upsert: true });
  }

  // Reset the demo conversation on every start so visitors always see a clean chat
  const demoUsers = await User.find({ userName: { $in: DEMO_USERS.map((d) => d.userName) } });
  const ids = Object.fromEntries(demoUsers.map((u) => [u.userName, u._id]));
  const participants = [ids.demo_alex, ids.demo_sam];

  await Message.deleteMany({ senderId: { $in: participants }, recieverId: { $in: participants } });
  await Conversation.deleteMany({ participants: { $all: participants, $size: 2 } });

  const messages = await Message.insertMany(
    WELCOME.map(([from, message]) => ({
      senderId: ids[from],
      recieverId: from === "demo_alex" ? ids.demo_sam : ids.demo_alex,
      message,
    }))
  );
  await Conversation.create({ participants, messages: messages.map((m) => m._id) });

  console.log("Demo users ready");
};
