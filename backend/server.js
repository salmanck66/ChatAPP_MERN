import express from "express";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";
import connecttomdbserver from "./db/connect.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { app, server } from './socket/socket.js';
import path from "path";

dotenv.config();

app.use(express.json());
app.use(cookieParser());
const __dirname = path.resolve()

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname,'/frontend/dist')))

app.get("*",(req,res)=>
{
  res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

server.listen(3000, () => {
  connecttomdbserver();
  console.log("Server is listening on port 3000");
});
