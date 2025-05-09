import { Server as SocketServer } from 'socket.io';
import connectionHandler from './handlers/connectionHandler.js';
import { checkAuthorizadeSocket } from '../middleware/validateTokens.midleware.js';

const setupSocket = (server) => {
  const io = new SocketServer(server, {
    cors: {
      origin: '*', // Ajusta esto según tu cliente
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true,
    },
    connectionStateRecovery: {},
  });

  checkAuthorizadeSocket(io);

  io.on('connection', (socket) => connectionHandler(io, socket));
};

export default setupSocket;
