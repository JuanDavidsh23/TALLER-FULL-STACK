mysql> CREATE TABLE vehiculos (
    id_vehiculo INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(10) UNIQUE,
    marca VARCHAR(50),
    color VARCHAR(30),
    estado_vehiculo VARCHAR(30),
   kilometraje INT
);


CREATE TABLE personas (
    id_persona INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    telefono VARCHAR(20)
 );

CREATE TABLE operaciones (
    id_operacion INT AUTO_INCREMENT PRIMARY KEY,
    id_vehiculo INT,
    id_vendedor INT,
    id_comprador INT,
    fecha_ingreso DATE,
    fecha_venta DATE,
    precio_compra DECIMAL(12,2),
    precio_venta DECIMAL(12,2),
    ganancia DECIMAL(12,2),
    estado_operacion VARCHAR(30),
 
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo),
    FOREIGN KEY (id_vendedor) REFERENCES personas(id_persona),
    FOREIGN KEY (id_comprador) REFERENCES personas(id_persona)
 );
