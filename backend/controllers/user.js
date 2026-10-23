import User from "../models/user.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    // Only expose public profile fields — never emails, hashes or reset tokens
    const users = await User.find({ _id: { $ne: req.user._id } })
      .select("fullName userName profilePic")
      .sort({ fullName: 1 })
      .lean();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
