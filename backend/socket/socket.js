import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";
import { parse as parseCookie } from "cookie";

const app = express();
const server = http.createServer(app);

// In production the client is served from the same origin, so CORS is only needed in local dev
const io = new Server(server, {
  cors: process.env.CLIENT_URL
    ? { origin: process.env.CLIENT_URL.split(","), credentials: true }
    : undefined,
});

// userId -> number of open sockets (a user can have several tabs open)
const onlineUsers = new Map();

const broadcastOnlineUsers = () => io.emit("getOnlineUsers", [...onlineUsers.keys()]);

// Authenticate the socket from the same httpOnly JWT cookie the REST API uses,
// instead of trusting a userId sent by the client.
io.use((socket, next) => {
  try {
    const cookies = parseCookie(socket.handshake.headers.cookie || "");
    const { userid } = jwt.verify(cookies.jwt, process.env.JWT_SECRET);
    socket.userId = String(userid);
    next();
  } catch {
    next(new Error("Unauthorized"));
  }
});

io.on("connection", (socket) => {
  const { userId } = socket;
  socket.join(userId);
  onlineUsers.set(userId, (onlineUsers.get(userId) || 0) + 1);
  broadcastOnlineUsers();

  socket.on("disconnect", () => {
    const count = (onlineUsers.get(userId) || 1) - 1;
    if (count <= 0) onlineUsers.delete(userId);
    else onlineUsers.set(userId, count);
    broadcastOnlineUsers();
  });
});

// Every socket joins a room named after its userId, so emitting to that room
// reaches all of the user's open tabs.
export const emitToUser = (userId, event, payload) => {
  io.to(String(userId)).emit(event, payload);
};

export { io, app, server };
