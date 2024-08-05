import express from 'express';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/message.js';
import connecttomdbserver from './db/connect.js';
import { configDotenv } from 'dotenv';

const app = express();

configDotenv();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.listen(3000, () => {
  connecttomdbserver();
  console.log("Server is listening");
});
