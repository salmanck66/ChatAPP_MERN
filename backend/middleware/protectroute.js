import jwt from "jsonwebtoken";
import User from '../models/user.js'

const protectRoute =async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if(!token)
    {
        return res.status(401).json({error:"Unauthorized,no token"})
    }
    const verifiedToken = jwt.verify(token,process.env.JWT_SECRET)
    if(!verifiedToken)
    {
        return res.status(401).json({error:"invalid"})
    }
    const user =   await User.findById(verifiedToken.userid).select("-password")
    if(!user)
    {
        return res.status(404).json({error:"User not found"})
    }
  } catch (error) {
    console.log(error.message, "Error in message middle ware ");

    res.status(500).json({ error: "internal server error" });
  }
};

export default protectRoute;
