import User from "../models/user.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/tokenGen.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, email, password, confirmPassword, gender } = req.body;
    console.log(req.body)
    console.log(password,confirmPassword)

    // Validate passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if the user or email already exists
    const existingUser = await User.findOne({ $or: [{ userName }, { email }] });

    if (existingUser) {
      return res.status(400).json({ error: "User or email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Determine profile picture based on gender
    const boyPP = `https://avatar.iran.liara.run/public/boy?=${userName}`;
    const girlPP = `https://avatar.iran.liara.run/public/girl?=${userName}`;
    const profilePic = gender.toLowerCase() === "male" ? boyPP : girlPP;

    // Create the new user
    const newUser = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
      gender,
      profilePic,
    });

    await newUser.save();
    genToken(newUser._id, res);

    res.status(200).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      userName: newUser.userName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });

  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};




export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if(userName.includes('@'))
    {
      return res.status(400).json({ error: "Please login with username only" });
    }
    
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(400).json({ error: "Invalid password" });
    }

    genToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


