import { pool } from '../../db.js';
import generateUID from '../../libs/generateUID.js';

const messageHandler = async ({ socket, io, data, id, role, sockets }) => {
  const { msg, toId } = data;

  try {
    const senderQuery = role === 'customer' ? 'users' : 'sellers';
    const receiverQuery = role === 'customer' ? 'sellers' : 'users';

    const { rows: senderRows } = await pool.query(
      `SELECT * FROM ${senderQuery} WHERE id = $1`,
      [id]
    );
    const { rows: receiverRows } = await pool.query(
      `SELECT * FROM ${receiverQuery} WHERE id = $1`,
      [toId]
    );

    if (!senderRows.length || !receiverRows.length) {
      return socket.emit('error-message', 'Emisor o receptor no encontrado.');
    }

    const insertQuery =
      role === 'customer'
        ? `INSERT INTO messages (id, sender_user_id, receiver_seller_id, message) VALUES ($1, $2, $3, $4) RETURNING *`
        : `INSERT INTO messages (id, sender_seller_id, receiver_user_id, message) VALUES ($1, $2, $3, $4) RETURNING *`;

    const { rows: messageResult } = await pool.query(insertQuery, [
      generateUID(),
      id,
      toId,
      msg,
    ]);

    const sendMessageInfo = {
      id: messageResult[0].id,
      fromId: id,
      fromRole: role,
      toId: toId,
      toRole: role === 'customer' ? 'seller' : 'customer',
      message: msg,
      timestamp: messageResult[0].created_at,
      senderName: senderRows[0].name,
      receiverName: receiverRows[0].name,
    };

    const receptorSocketId = sockets[toId];
    if (receptorSocketId) {
      io.to(receptorSocketId).emit('resecive-message', sendMessageInfo);
    } else {
      socket.emit(
        'info-message',
        'El receptor no está conectado en este momento.'
      );
    }
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    socket.emit('error-message', 'Ocurrió un error al enviar el mensaje.');
  }
};

export default messageHandler;
