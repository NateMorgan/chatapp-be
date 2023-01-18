import 'dotenv/config.js';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import formData from 'express-form-data';

// Socket.io imports
import { Server } from 'socket.io'

const io = new Server(3003, {
  cors: {
    origin: '*',
  }
});

import { router as profilesRouter } from './routes/profiles.js';
import { router as authRouter } from './routes/auth.js';
import { router as chatRouter } from './routes/chat.js';

import './config/database.js';

const app = express();

// Socket.io connection
io.on("connection", (socket) => {
  // send a message to the client
  socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

  // receive a message from the client
  socket.on("hello from client", (...args) => {
    // ...
  });
});





app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(formData.parse());

app.use('/api/profiles', profilesRouter);
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);

app.use(function (req, res, next) {
  res.status(404).json({ err: 'Not found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message });
});

export { app };
