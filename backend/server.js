import express from "express";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";
import connecttomdbserver from "./db/connect.js";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import { app, server } from './socket/socket.js';

configDotenv();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(3000, () => {
  connecttomdbserver();
  console.log("Server is listening on port 3000");
});
