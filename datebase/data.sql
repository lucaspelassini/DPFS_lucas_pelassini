USE botanica_db;

INSERT INTO categories (name, description) VALUES
('plantas', 'Plantas de interior y exterior para decorar tu hogar'),
('macetas', 'Macetas de diferentes tamaños y materiales'),
('herramientas', 'Herramientas esenciales para jardinería'),
('fertilizantes', 'Fertilizantes y abonos orgánicos'),
('semillas', 'Semillas para cultivar tus propias plantas');

INSERT INTO users (first_name, last_name, email, password, category, image) VALUES
('Juan', 'Pérez', 'juan.perez@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'user', 'default-avatar.jpg'),
('María', 'González', 'maria.gonzalez@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'user', 'default-avatar.jpg'),
('Carlos', 'Rodríguez', 'carlos.rodriguez@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin', 'default-avatar.jpg'),
('Ana', 'Martínez', 'ana.martinez@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'user', 'default-avatar.jpg'),
('Luis', 'López', 'luis.lopez@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'user', 'default-avatar.jpg');

INSERT INTO products (name, description, price, category_id, image, stock) VALUES
('Monstera Deliciosa', 'Planta tropical de hojas grandes y perforadas, ideal para interiores luminosos', 45.99, 1, 'monstera.jpg', 15),
('Pothos Dorado', 'Planta colgante de fácil cuidado, perfecta para principiantes', 22.50, 1, 'pothos.jpg', 25),
('Suculenta Mix', 'Conjunto de 3 suculentas variadas en maceta de cerámica', 32.00, 1, 'suculentas.jpg', 30),
('Ficus Lyrata', 'Árbol de interior con hojas en forma de violín, elegante y moderno', 89.99, 1, 'ficus.jpg', 10),
('Cactus San Pedro', 'Cactus columnar de crecimiento rápido, resistente y decorativo', 28.50, 1, 'cactus.jpg', 20),
('Lavanda', 'Planta aromática con flores violetas, ideal para exteriores', 18.99, 1, 'lavanda.jpg', 35),
('Maceta Terracota Grande', 'Maceta de barro cocido de 30cm de diámetro con plato incluido', 24.99, 2, 'maceta-terracota.jpg', 50),
('Kit de Herramientas', 'Set completo de 5 herramientas para jardinería: pala, rastrillo, tijeras', 42.00, 3, 'herramientas.jpg', 18),
('Fertilizante Orgánico', 'Abono natural de 1kg para todo tipo de plantas', 15.50, 4, 'fertilizante.jpg', 40),
('Semillas de Tomate', 'Paquete de semillas orgánicas de tomate cherry', 8.99, 5, 'semillas-tomate.jpg', 60);

INSERT INTO product_colors (product_id, color) VALUES
(1, 'Verde'),
(2, 'Verde'),
(2, 'Amarillo'),
(3, 'Verde'),
(3, 'Gris'),
(4, 'Verde'),
(5, 'Verde'),
(6, 'Violeta'),
(7, 'Naranja'),
(8, 'Negro'),
(8, 'Verde'),
(9, 'Marrón'),
(10, 'Rojo');

INSERT INTO carts (user_id, total, status) VALUES
(1, 135.50, 'completed'),
(2, 0.00, 'active'),
(4, 67.49, 'active');

INSERT INTO cart_items (cart_id, product_id, quantity, price, subtotal) VALUES
(1, 1, 1, 45.99, 45.99),
(1, 2, 2, 22.50, 45.00),
(1, 10, 5, 8.99, 44.95),
(3, 4, 1, 89.99, 89.99),
(3, 7, 1, 24.99, 24.99);

UPDATE carts SET total = 135.94 WHERE id = 1;
UPDATE carts SET total = 114.98 WHERE id = 3;