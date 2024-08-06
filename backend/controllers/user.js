import User from "../models/user.js";

export const getUserSideBar = async (req, res) => {
  try {
    const myuser = req.user._id;
    const usersexeptme = await User.find({_id:{$ne:myuser}}).select("-password");

    res.status(200).json({usersexeptme})
  } catch (error) {
    console.log("Error in user", error.message);
    res.status(500).json({ error });
  }
};
