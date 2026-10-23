import "dotenv/config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";
import connectToMongo from "./db/connect.js";
import { ensureDemoUsers } from "./utils/demoUsers.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

for (const key of ["MONGO_CONNECTION", "JWT_SECRET"]) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

// Render / most PaaS hosts sit behind a proxy — needed for secure cookies and rate limiting
app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many attempts, please try again in a few minutes" },
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api", (req, res) => res.status(404).json({ error: "Not found" }));

// Serve the built React app
app.use(express.static(path.join(__dirname, "frontend", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

const start = async () => {
  await connectToMongo();
  if (process.env.DEMO_MODE === "true") await ensureDemoUsers();
  server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

start();
