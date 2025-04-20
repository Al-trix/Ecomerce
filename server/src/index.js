import app from './app.js';
import { PORT } from './config.js';

// Prendemos el servidor en el puerto 3000 o con el puerto que le pasemos por variable de entorno
app.listen(PORT, () => {
   console.log('http://localhost:3000');
})
