import { pool } from '../../db.js';

export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELET FROM messages WHERE id = $1', [id]);

    if (rowCount === 0) {
      return res.status(404).json({
        message: 'No tienes ese mensaje registrado',
      });
    }

    return res.status(200).json({
      message: 'Mensaje eliminada',
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: 'Error: ' + err,
    });
  }
};

export const updateMessage = async (req, res) => {
  const { messageId } = req.params;
  const { newContent } = req.body;
  const userId = req.user.id; // asumimos que usas middleware JWT

  if (!newContent || newContent.trim() === '') {
    return res.status(400).json({ error: 'El contenido no puede estar vacío' });
  }

  try {
    // Verificamos si el usuario es dueño del mensaje
    const { rows } = await pool.query(
      'SELECT * FROM messages WHERE id = $1 AND from_id = $2',
      [messageId, userId]
    );

    if (!rows.length) {
      return res
        .status(403)
        .json({ error: 'No autorizado para editar este mensaje' });
    }

    await pool.query(
      `UPDATE messages SET message = $1, edited = true, updated_at = NOW() WHERE id = $2`,
      [newContent, messageId]
    );

    return res.json({ message: 'Mensaje actualizado correctamente' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al actualizar el mensaje' });
  }
};
