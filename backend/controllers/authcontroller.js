import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPass, gender } = req.body;
  
    if (password !== confirmPass) {
      return res.status(400).json({ error: "Password Doesnt Match" });
    }
  
    const user = await User.findOne({ userName });
  
    if (user) {
      return res.status(400).json({ error: "User Exist" });
    }
    const boyPP = `https://avatar.iran.liara.run/public/boy${userName}`;
    const girlPP = `https://avatar.iran.liara.run/public/girl${userName}`;
    const newUser = new User({
      fullName,
      userName,
      password,
      profielpic: gender == "boy" ? boyPP : girlPP,
    });
    await newUser.save();
    res.status(200).json({
      _id: newUser._id,
      fullName: fullName,
      userName: userName,
      profielpic: profielpic,
    });
  } catch (error) {
    console.log("Error in singup",error.message)
    res.status(500).status({error:"internal server error"})
  }
};

export const login = (req, res) => {
  console.log("log user");
  res.send("login");
};
export const logout = (req, res) => {
  console.log("log user");
  res.send("logout");
};
