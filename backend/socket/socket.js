import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3001"],
        methods: ["GET", "POST"],
    },
});
const userSocket = {}; // Stores userId -> socketId mappings

export const getRecieverSocketId = (recid) => {
    return userSocket[recid] || null; // Safely access the socketId or return null if not found
};
io.on('connection', (socket) => {
    console.log("a user connected", socket.id);
    const userId = String(socket.handshake.query.userId);
    console.log('Received User ID:', userId, 'Type:', typeof userId);

    if (userId) {
        // Prevent duplicate connections for the same userId
        if (userSocket[userId]) {
            console.log(`User ${userId} is already connected. Disconnecting old socket.`);
            io.to(userSocket[userId]).disconnectSockets(); // Disconnect the old socket
        }
        userSocket[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocket));

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        // Remove user from online list
        const userIdToRemove = Object.keys(userSocket).find(id => userSocket[id] === socket.id);
        if (userIdToRemove) {
            delete userSocket[userIdToRemove];
            io.emit("getOnlineUsers", Object.keys(userSocket));
        }
    });
});

export { io, app, server };
