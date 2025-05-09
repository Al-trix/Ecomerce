CREATE TABLE users (
  id VARCHAR PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  avatar VARCHAR(255),
  city VARCHAR(255),
  role VARCHAR(50) DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--seller: 30c47d70
--user: 0ff27429

CREATE TABLE sellers (
  id VARCHAR PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  avatar VARCHAR(255),
  city VARCHAR(255),
  store_name VARCHAR(255) NOT NULL,
  rating FLOAT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id VARCHAR PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  category VARCHAR(255) NOT NULL,
  discount_percentage FLOAT DEFAULT 0,
  rating FLOAT DEFAULT 0,
  image_url VARCHAR(255) NOT NULL,
  seller_id VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE
);

CREATE TABLE orders (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE orders_items (
  id VARCHAR PRIMARY KEY,
  order_id VARCHAR NOT NULL,
  product_id VARCHAR NOT NULL,
  quantity INT NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR NOT NULL,
  product_id VARCHAR NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE cart (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR NOT NULL,
  product_id VARCHAR NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE payments (
  id VARCHAR PRIMARY KEY,
  order_id VARCHAR NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE TABLE messages (
  id VARCHAR PRIMARY KEY,
  sender_user_id VARCHAR,
  receiver_user_id VARCHAR,
  sender_seller_id VARCHAR,
  receiver_seller_id VARCHAR,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (sender_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_seller_id) REFERENCES sellers(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_seller_id) REFERENCES sellers(id) ON DELETE CASCADE,

  CHECK (
    -- Solo uno debe ser sender (user o seller)
    (sender_user_id IS NOT NULL AND sender_seller_id IS NULL) OR
    (sender_user_id IS NULL AND sender_seller_id IS NOT NULL)
  ),
  
  CHECK (
    -- Solo uno debe ser receiver (user o seller)
    (receiver_user_id IS NOT NULL AND receiver_seller_id IS NULL) OR
    (receiver_user_id IS NULL AND receiver_seller_id IS NOT NULL)
  )
);

