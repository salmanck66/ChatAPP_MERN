import bcrypt from "bcryptjs";
import User from "../models/user.js";

// Public demo accounts so anyone can try the app without signing up.
// Open two browsers (or one normal + one private window) and log in as each.
export const DEMO_USERS = [
  { userName: "demo_alex", fullName: "Alex (demo)", email: "alex@example.com", gender: "Male" },
  { userName: "demo_sam", fullName: "Sam (demo)", email: "sam@example.com", gender: "Female" },
];
export const DEMO_PASSWORD = "demo1234";

export const ensureDemoUsers = async () => {
  const password = await bcrypt.hash(DEMO_PASSWORD, 10);
  for (const demo of DEMO_USERS) {
    await User.updateOne(
      { userName: demo.userName },
      { $set: { ...demo, password } },
      { upsert: true }
    );
  }
  console.log("Demo users ready");
};
