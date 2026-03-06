CREATE TABLE vendedores (
    id_vendedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    telefono VARCHAR(20)
);

CREATE TABLE compradores (
    id_comprador INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    telefono VARCHAR(20)
);

CREATE TABLE inventario (
    id_vehiculo INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(20) UNIQUE,
    marca VARCHAR(50),
    color VARCHAR(30),
    estado_vehiculo VARCHAR(50),
    kilometraje INT,
    fecha_ingreso DATE,
    precio_compra DECIMAL(12,2),
    id_vendedor INT,
    
    FOREIGN KEY (id_vendedor) REFERENCES vendedores(id_vendedor)
);

CREATE TABLE transacciones (
    id_transaccion INT AUTO_INCREMENT PRIMARY KEY,
    id_vehiculo INT,
    id_comprador INT,
    fecha_venta DATE,
    precio_venta DECIMAL(12,2),
    ganancia DECIMAL(12,2),
    estado_operacion VARCHAR(50),

    FOREIGN KEY (id_vehiculo) REFERENCES inventario(id_vehiculo),
    FOREIGN KEY (id_comprador) REFERENCES compradores(id_comprador)
);