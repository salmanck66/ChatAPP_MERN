import User from "../models/user.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/tokenGen.js";
import transporter from "../utils/SendMail.js";


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


export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword, confirmNewPassword } = req.body;

    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Find user by reset token
    const user = await User.findOne({
      resetToken,
      resetTokenExpiry: { $gt: Date.now() }, // Check if token is still valid
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });

  } catch (error) {
    console.error("Error in resetting password:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Send the reset token to user's email
    const resetURL = `http://yourfrontend.com/reset-password/${resetToken}`;
    await transporter.sendMail({
      to: user.email,
      from: 'your-email@gmail.com',
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click <a href="${resetURL}">here</a> to reset your password. The link is valid for 1 hour.</p>`,
    });

    res.status(200).json({ message: "Password reset email sent" });

  } catch (error) {
    console.error("Error in requesting password reset:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

