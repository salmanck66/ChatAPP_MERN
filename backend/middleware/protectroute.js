import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ error: "Session expired, please log in again" });
  }

  try {
    const user = await User.findById(payload.userid).select("-password -resetToken -resetTokenExpiry");
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
