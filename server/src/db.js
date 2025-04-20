import pkg from 'pg';
const { Pool } = pkg;

// creamos una nueva instancia de Pool para conectarnos a la base de datos
export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  password: 'narutoramen12',
  database: 'ecomerce',
});
