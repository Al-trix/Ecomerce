import { pool } from '../db.js';
import { generateUID } from '../libs/generateUID.js';

export const getProducts = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.status(200).json({
      message: 'Products list',
      data: rows,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product found',
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      message: 'Product created',
      data: rows[0],
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({
      message: 'Product updated successfully',
      body: {
        user: rows[0],
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
        message: 'Product not found',
      });
    }

    res.status(200).json({
      message: 'Product deleted successfully',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAllProducts = async (req, res) => {

   const productsNews = req.body;
  for (const {
    id,
    name,
    description,
    price,
    image_url,
    stock,
    seller_id,
    category,
    discountPorcentage = 0.0,
    rating,
  } of productsNews) {
      const query = `INSERT INTO products (id, name, description, price, image_url, stock, category, discount_percentage, rating, seller_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) `;

      await pool.query(query, [
        id,
        name,
        description,
        price,
        image_url,
        stock,
        category,
        discountPorcentage,
        rating,
        seller_id,
      ]);
  }

  res.status(201).json({
    message: 'Products created',
    data: productsNews,
  });
};
