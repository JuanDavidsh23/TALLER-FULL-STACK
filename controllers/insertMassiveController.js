import fs from 'fs';
import csv from 'csv-parser';
import pool from '../bd.js';

export const uploadAllData = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No se recibió archivo CSV' });
    }

    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {

            const connection = await pool.getConnection();

            try {

                await connection.beginTransaction();

                for (const row of results) {

                    await connection.query(
                        `INSERT INTO personas (nombre, telefono)
                         VALUES (?, ?)`,
                        [row.nombre_vendedor, row.telefono_vendedor]
                    );

                    const [[vendedor]] = await connection.query(
                        `SELECT id_persona 
                         FROM personas 
                         WHERE nombre = ? AND telefono = ?
                         ORDER BY id_persona DESC LIMIT 1`,
                        [row.nombre_vendedor, row.telefono_vendedor]
                    );



                    await connection.query(
                        `INSERT INTO personas (nombre, telefono)
                         VALUES (?, ?)`,
                        [row.nombre_comprador, row.telefono_comprador]
                    );

                    const [[comprador]] = await connection.query(
                        `SELECT id_persona 
                         FROM personas 
                         WHERE nombre = ? AND telefono = ?
                         ORDER BY id_persona DESC LIMIT 1`,
                        [row.nombre_comprador, row.telefono_comprador]
                    );



                    await connection.query(
                        `INSERT INTO vehiculos
                        (placa, marca, color, estado_vehiculo, kilometraje)
                        VALUES (?, ?, ?, ?, ?)`,
                        [
                            row.placa,
                            row.marca,
                            row.color,
                            row.estado_vehiculo,
                            row.kilometraje
                        ]
                    );

                    const [[vehiculo]] = await connection.query(
                        `SELECT id_vehiculo 
                         FROM vehiculos 
                         WHERE placa = ?`,
                        [row.placa]
                    );



                    const fechaVenta = row.fecha_venta || null;
                    const precioVenta = row.precio_venta || null;
                    const ganancia = row.ganancia || null;



                    await connection.query(
                        `INSERT INTO operaciones
                        (id_vehiculo,id_vendedor,id_comprador,fecha_ingreso,fecha_venta,
                        precio_compra,precio_venta,ganancia,estado_operacion)
                        VALUES (?,?,?,?,?,?,?,?,?)`,
                        [
                            vehiculo.id_vehiculo,
                            vendedor.id_persona,
                            comprador.id_persona,
                            row.fecha_ingreso,
                            fechaVenta,
                            row.precio_compra,
                            precioVenta,
                            ganancia,
                            row.estado_operacion
                        ]
                    );

                }

                await connection.commit();

                res.json({
                    message: 'Carga masiva completada correctamente'
                });

            } catch (error) {

                await connection.rollback();

                console.error(error);

                res.status(500).json({
                    error: 'Error procesando el CSV',
                    details: error.message
                });

            } finally {

                connection.release();

            }

        });

};