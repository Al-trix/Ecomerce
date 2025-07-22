import { pool } from '../../db.js';
import generateUID from '../../libs/generateUID.js';
import { searchInfoProducts } from '../../libs/searchInfo.js';

export const getProducts = async (req, res) => {
  const queryParamsInput = req.query;

  try {
    const result = await searchInfoProducts(null, queryParamsInput);

    if (result.typeError === 'DATE_NOT_FOUND') {
      return res.status(404).json({
        error: {
          message: 'No se encontraron productos',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    if (result.typeError === 'DATABASE_ERROR') {
      return res.status(500).json({
        error: {
          message: 'Error en la base de datos',
          typeError: 'DATABASE_ERROR',
        },
      });
    }

    res.status(200).json({
      message: 'Lista de productos',
      body: {
        products: result.data,
        totalProducts: result.pagination.total,
        ...result.pagination,
      },
    });
  } catch (err) {
    console.error('Error en getProducts:', err);
    res.status(500).json({
      error: {
        message: 'Error interno del servidor',
        typeError: 'SERVER_ERROR',
      },
    });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows, rowCount } = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );
    if (rowCount === 0) {
      return res.status(404).json({
        error: {
          message: 'Producto no encontrado',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    res.status(200).json({
      message: 'Producto encontrado',
      body: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Error fetching product',
        typeError: 'DATE_NOT_FOUND',
      },
    });
  }
};

export const createProduct = async (req, res) => {
  const { idSeller } = req.params;

  const {
    name,
    description,
    price,
    image_url,
    stock,
    category,
    discountPorcentage = 0.0,
    rating,
  } = req.body;
  try {
    const query = `INSERT INTO products (id, name, description, price, image_url, stock, category, discount_percentage, rating, seller_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;

    const { rows } = await pool.query(query, [
      generateUID('product'),
      name,
      description,
      price,
      image_url,
      stock,
      category,
      discountPorcentage,
      rating,
      idSeller,
    ]);

    res.status(201).json({
      message: 'Producto creado correctamente',
      body: rows[0],
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'Error creating product',
        typeError: 'DATE_NOT_FOUND',
      },
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name = '',
    description = '',
    price = 0,
    image_url = '',
    stock = 0,
    category = '',
    discountPorcentage = 0.0,
    rating = 0,
  } = req.body;
  try {
    const query = `
    UPDATE produts 
    SET 
    name = COALESCE(NULLIF($1, ''), name), 
    description = COALESCE(NULLIF($2, ''), description), 
    price = COALESCE(NULLIF($3, ''), price),
    image_url = COALESCE(NULLIF($4, ''), image_url),
    stock = COALESCE(NULLIF($5, ''), stock),
    category = COALESCE(NULLIF($6, ''), category),
      discountPorcentage = COALESCE(NULLIF($7, ''), discountPorcentage),
      rating = COALESCE(NULLIF($8, ''), rating)
      WHERE id = $9 RETURNING *; ;
      `;

    const { rows, rowCount } = await pool.query(query, [
      name,
      description,
      price,
      image_url,
      stock,
      category,
      discountPorcentage,
      rating,
      id,
    ]);

    if (rowCount === 0) {
      return res.status(404).json({
        error: {
          message: 'Producto no encontrado',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }
    res.status(200).json({
      message: 'Producto actualizado correctamente',
      body: {
        user: rows[0],
      },
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'Error updating product',
        typeError: 'DATE_NOT_FOUND',
      },
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query(
      'DELETE FROM products WHERE id = $1',
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({
        error: {
          message: 'Producto no encontrado',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    res.status(200).json({
      message: 'Producto eliminado correctamente',
    });
  } catch (err) {
    
    res.status(500).json({
      error: {
        message: 'Error deleting product',
        typeError: 'DATE_NOT_FOUND',
      },
    });
  }
};


