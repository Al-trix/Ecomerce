import messageHandler from './messageHandler.js';
import recoveredHandler from './recoveredHandler.js';
const sockets = {};

const connectionHandler = async (io, socket) => {
  const { id, role, name } = socket.user;
  if (!id || !role) {
    socket.emit('error-message', 'No se encontró ID o rol.');
    return;
  }


  sockets[id] = socket.id;
  console.log(`Usuario conectado: ${id}`);

  // Envío y recepción de mensajes
  socket.on('send-message', (data) =>
    messageHandler({ socket, io, data, id, role, sockets })
  );

  // Desconexión
  socket.on('disconnect', () => {
    delete sockets[id];
    console.log(`Usuario desconectado: ${id}`);
  });

  // Recuperar mensajes antiguos
  if (!socket.recovered) {
    recoveredHandler(id, role, socket);
  }
};

export default connectionHandler;
