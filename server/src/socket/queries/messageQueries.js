import { pool } from '../../db.js';

export  const getAllMessagesForUser = async (id, role) => {
  const queries = {
    customer: {
      received: `
        SELECT m.*, u_sender.name AS sender_name, s_sender.name AS sender_seller_name, s_receiver.name AS receiver_name
        FROM messages m
        LEFT JOIN users u_sender ON m.sender_user_id = u_sender.id
        LEFT JOIN sellers s_sender ON m.sender_seller_id = s_sender.id
        JOIN users s_receiver ON m.receiver_user_id = s_receiver.id
        WHERE m.receiver_user_id = $1
      `,
      sent: `
        SELECT m.*, u_sender.name AS sender_name, s_receiver.name AS receiver_name
        FROM messages m
        JOIN users u_sender ON m.sender_user_id = u_sender.id
        LEFT JOIN sellers s_receiver ON m.receiver_seller_id = s_receiver.id
        WHERE m.sender_user_id = $1
      `,
    },
    seller: {
      received: `
        SELECT m.*, u_sender.name AS sender_name, s_sender.name AS sender_seller_name, s_receiver.name AS receiver_name
        FROM messages m
        LEFT JOIN users u_sender ON m.sender_user_id = u_sender.id
        LEFT JOIN sellers s_sender ON m.sender_seller_id = s_sender.id
        JOIN sellers s_receiver ON m.receiver_seller_id = s_receiver.id
        WHERE m.receiver_seller_id = $1
      `,
      sent: `
        SELECT m.*, s_sender.name AS sender_seller_name, u_receiver.name AS receiver_name
        FROM messages m
        JOIN sellers s_sender ON m.sender_seller_id = s_sender.id
        LEFT JOIN users u_receiver ON m.receiver_user_id = u_receiver.id
        WHERE m.sender_seller_id = $1
      `,
    },
  };

  const q = queries[role];
  const [received, sent] = await Promise.all([
    pool.query(q.received, [id]),
    pool.query(q.sent, [id]),
  ]);

  return [...received.rows, ...sent.rows];
}
