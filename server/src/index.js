import app from './app.js';
import setupSocket from './socket/chat.js'
import { createServer } from 'http';
import { PORT } from './config.js';

const server = createServer(app);
setupSocket(server)

// Prendemos el servidor en el puerto 3000 o con el puerto que le pasemos por variable de entorno
server.listen(PORT, () => {
   console.log('http://localhost:3000');
})
