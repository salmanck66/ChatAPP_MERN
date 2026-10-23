import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import genToken, { cookieOptions } from "../utils/tokenGen.js";
import transporter, { isMailConfigured } from "../utils/SendMail.js";

const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 6;

const publicUser = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  userName: user.userName,
  profilePic: user.profilePic,
});

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

export const signup = async (req, res) => {
  try {
    const { fullName, userName, email, password, confirmPassword, gender } = req.body;

    if (!fullName?.trim() || !userName || !email || !password || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!USERNAME_RE.test(userName)) {
      return res.status(400).json({ error: "Username must be 3–20 letters, numbers or underscores" });
    }
    if (!EMAIL_RE.test(email)) return res.status(400).json({ error: "Invalid email address" });
    if (password.length < MIN_PASSWORD) {
      return res.status(400).json({ error: `Password must be at least ${MIN_PASSWORD} characters` });
    }
    if (password !== confirmPassword) return res.status(400).json({ error: "Passwords do not match" });
    if (!["Male", "Female"].includes(gender)) return res.status(400).json({ error: "Invalid gender" });

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ $or: [{ userName }, { email: normalizedEmail }] });
    if (existing) return res.status(409).json({ error: "Username or email is already taken" });

    const newUser = await User.create({
      fullName: fullName.trim(),
      userName,
      email: normalizedEmail,
      password: await bcrypt.hash(password, 10),
      gender,
    });

    genToken(newUser._id, res);
    res.status(201).json(publicUser(newUser));
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ userName });
    // Same message for both cases so the endpoint can't be used to discover usernames
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    genToken(user._id, res);
    res.status(200).json(publicUser(user));
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt", cookieOptions);
  res.status(200).json({ message: "Logged out successfully" });
};

export const requestPasswordReset = async (req, res) => {
  // Always respond the same way so this can't be used to check which accounts exist
  const genericResponse = { message: "If that account exists, a reset link has been sent to its email" };

  try {
    const identifier = String(req.body.identifier || "").trim();
    if (!identifier) return res.status(400).json({ error: "Enter your username or email" });
    if (!isMailConfigured) {
      return res.status(503).json({ error: "Password reset email is not configured on this server" });
    }

    const user = await User.findOne(
      identifier.includes("@") ? { email: identifier.toLowerCase() } : { userName: identifier }
    );
    if (!user || user.userName.startsWith("demo_")) return res.status(200).json(genericResponse);

    // Store only a hash of the token; the raw token lives only in the emailed link
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = hashToken(resetToken);
    user.resetTokenExpiry = Date.now() + 60 * 60 * 1000;
    await user.save();

    const appUrl = process.env.APP_URL || `${req.protocol}://${req.get("host")}`;
    const resetURL = `${appUrl}/reset-password/${resetToken}`;

    await transporter.sendMail({
      to: user.email,
      from: `chatWAER <${process.env.EMAIL}>`,
      subject: "Reset your chatWAER password",
      html: `<p>Hi ${user.fullName},</p>
             <p>Click <a href="${resetURL}">here</a> to choose a new password. This link is valid for 1 hour.</p>
             <p>If you didn't request this, you can ignore this email.</p>`,
    });

    res.status(200).json(genericResponse);
  } catch (error) {
    console.error("Error in requestPasswordReset:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword, confirmNewPassword } = req.body;

    if (!newPassword || newPassword.length < MIN_PASSWORD) {
      return res.status(400).json({ error: `Password must be at least ${MIN_PASSWORD} characters` });
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({
      resetToken: hashToken(String(token)),
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ error: "This reset link is invalid or has expired" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated — you can log in now" });
  } catch (error) {
    console.error("Error in resetPassword:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
