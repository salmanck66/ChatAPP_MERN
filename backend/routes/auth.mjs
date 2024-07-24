import express from "express";
const router = express.Router();

console.log("in Auth");

router.get("/login", (req, res) => {
  res.send("Getting");
});

export default router;
