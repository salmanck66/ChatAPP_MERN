import express from "express";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";
import connecttomdbserver from "./db/connect.js";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import Message from "./models/message.js";

configDotenv();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Update this with your frontend's origin
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", async (data) => {
    const { senderId, receiverId, message } = data;
    
    // Save the message to the database
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    
    await newMessage.save();
    
    // Emit the message to the receiver
    io.to(receiverId).emit("receiveMessage", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => {
  connecttomdbserver();
  console.log("Server is listening on port 3000");
});
