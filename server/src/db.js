import pkg from 'pg'
const { Pool} = pkg
export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  password: 'narutoramen12',
  database: 'ecomerce',
});
