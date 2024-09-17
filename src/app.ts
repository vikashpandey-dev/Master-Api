import 'reflect-metadata'; // We need this in order to use @Decorators

import express from 'express';
import http from 'http';
// import socketIO from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'express-jwt';

import config from './config';
import Logger from './loaders/logger';
const { Server } = require("socket.io");
async function startServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  // const server = http.createServer(app);
  // const io = socketIO(server);
  const server = http.createServer(app);
  const io = new Server(server);
  io.on('connection', (socket) => {
    console.log('A user connected.');

    socket.on('message', (data) => {
      console.log('Received message:', data);
      // Broadcast the message to all connected clients, including the sender
      io.emit('message', data);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected.');
    });
  });

  // app.use(
  //   jwt({
  //     secret: config.jwtSecret,
  //     algorithms: ['HS256'],
  //   })
  // );

  // Include your loaders and middleware here
  await require('./loaders').default({ expressApp: app });

  server.listen(config.port, () => {
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
  }).on('error', (err) => {
    Logger.error(err);
    process.exit(1);
  });
}

startServer();
