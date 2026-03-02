SQL TABLES

CREATE TABLE customers (
    id_customer INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(50) NOT NULL,
    customer_email VARCHAR(100) UNIQUE NOT NULL,
    customer_address VARCHAR(100),
    customer_phone VARCHAR(20)
);

CREATE TABLE suppliers (
    id_supplier INT AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(50) NOT NULL,
    supplier_email VARCHAR(100) UNIQUE
);

CREATE TABLE products (
    id_product INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    product_category VARCHAR(50),
    product_sku VARCHAR(50) UNIQUE,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    id_supplier INT,
    FOREIGN KEY (id_supplier) REFERENCES suppliers(id_supplier)
);

CREATE TABLE transactions (
    id_transaction INT AUTO_INCREMENT PRIMARY KEY,
    id_customer INT NOT NULL,
    transaction_date DATE NOT NULL,
    FOREIGN KEY (id_customer) REFERENCES customers(id_customer)
);

CREATE TABLE transaction_details (
    id_detail INT AUTO_INCREMENT PRIMARY KEY,
    id_transaction INT NOT NULL,
    id_product INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_line_value DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    FOREIGN KEY (id_transaction) REFERENCES transactions(id_transaction),
    FOREIGN KEY (id_product) REFERENCES products(id_product)
);