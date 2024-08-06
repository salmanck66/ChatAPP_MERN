import express from "express";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";
import connecttomdbserver from "./db/connect.js";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
const app = express();

configDotenv();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(3000, () => {
  connecttomdbserver();
  console.log("Server is listening");
});
