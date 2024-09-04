import express from "express";
const router = express.Router();
import { login,signup,logout, requestPasswordReset } from "../controllers/authcontroller.js";


router.post("/login",login);
router.post("/signup",signup);
router.post ("/logout",logout);
router.post ("/resetpasswordrequest",requestPasswordReset);

export default router;
