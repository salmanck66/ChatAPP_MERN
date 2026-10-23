import express from "express";
import {
  login,
  signup,
  logout,
  requestPasswordReset,
  resetPassword,
} from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.post("/resetpasswordrequest", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);

export default router;
