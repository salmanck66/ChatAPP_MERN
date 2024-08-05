import User from "../models/user.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/tokenGen.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPass, gender } = req.body;
    let salt = await bcrypt.genSalt(10);
    if (password !== confirmPass) {
      return res.status(400).json({ error: "Password Doesnt Match" });
    }

    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({ error: "User Exist" });
    }
    const boyPP = `https://avatar.iran.liara.run/public/boy?=${userName}`;
    const girlPP = `https://avatar.iran.liara.run/public/girl?=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password: await bcrypt.hash(password, salt),
      gender: gender,
      profilePic: gender === "male" ? boyPP : girlPP,
    });

    await newUser.save();
    genToken(newUser._id, res);
    res.status(200).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      userName: newUser.userName,
      profilePic: newUser.profilePic
    });
  } catch (error) {
    console.log("Error in signup", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const login = async (req, res) => {
try {
    const { userName, password } = req.body;
    const user = await User.findOne({userName});
    const passwordCorrect = await bcrypt.compare(password,user?.password || "")
    if(!user || passwordCorrect == false)
    {
      return res.status(400).json({error:"user or pass is invalid"})
    }
    genToken(user._id,res)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    })
} catch (error) {
  console.log(error.message,"In Login")
  res.status(500).json({ error: "internal server error" });
}
};

export const logout = (req, res) => {
try {
    res.cookie('jwt','',{maxAge:0})
    res.status(200).json({ message: "logged out succesfully" });
} catch (error) {
  console.log(error.message,"Logout")
  res.status(500).json({ error: "internal server error" });
}
};

