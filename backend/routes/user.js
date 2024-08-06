import express from "express";
import protectRoute from "../middleware/protectroute.js";
import  {getUserSideBar}  from "../controllers/user.js";

const router = express.Router();
router.get("/", protectRoute,getUserSideBar);
export default router;