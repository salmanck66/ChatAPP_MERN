import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === "production";

export const cookieOptions = {
  httpOnly: true, // not readable from JS — protects against XSS token theft
  sameSite: "strict", // not sent on cross-site requests — CSRF protection
  secure: isProduction, // HTTPS only in production
};

const genToken = (userid, res) => {
  const token = jwt.sign({ userid }, process.env.JWT_SECRET, { expiresIn: "15d" });
  res.cookie("jwt", token, { ...cookieOptions, maxAge: 15 * 24 * 60 * 60 * 1000 });
};

export default genToken;
