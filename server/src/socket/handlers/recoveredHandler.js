import { getAllMessagesForUser } from '../queries/messageQueries.js';

const recoveredHandler = async (id, role, socket) => {
  try {
    const messages = await getAllMessagesForUser(id, role);
    messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    messages.forEach((msg) =>
      socket.emit('resecive-message', {
        id: msg.id,
        fromId: msg.sender_id || msg.sender_seller_id,
        fromRole: msg.sender_id ? 'customer' : 'seller',
        toId: msg.receiver_id,
        toRole: role === 'customer' ? 'seller' : 'customer',
        message: msg.message,
        timestamp: msg.created_at,
        senderName: msg.sender_name || msg.sender_seller_name,
        receiverName: msg.receiver_name,
      })
    );
  } catch (error) {
    console.error('Error al recuperar mensajes:', error);
    socket.emit(
      'error-message',
      'No se pudieron recuperar los mensajes anteriores.'
    );
  }
};

export default recoveredHandler;
