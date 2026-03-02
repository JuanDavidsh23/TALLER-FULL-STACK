import fs from 'fs';
import csv from 'csv-parser';
import pool from '../bd.js';

//FUNCTION TO UPLOAD ALLT THE INFORMATION TO MYSQL megastoreglobal
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
                        `INSERT IGNORE INTO suppliers (supplier_name, supplier_email) VALUES (?, ?)`,
                        [row.supplier_name, row.supplier_email]
                    );
                    const [[supplier]] = await connection.query(
                        `SELECT id_supplier FROM suppliers WHERE supplier_email = ?`, 
                        [row.supplier_email]
                    );

                    await connection.query(
                        `INSERT IGNORE INTO customers (customer_name, customer_email, customer_address, customer_phone) VALUES (?, ?, ?, ?)`,
                        [row.customer_name, row.customer_email, row.customer_address, row.customer_phone]
                    );
                    const [[customer]] = await connection.query(
                        `SELECT id_customer FROM customers WHERE customer_email = ?`, 
                        [row.customer_email]
                    );

                    await connection.query(
                        `INSERT IGNORE INTO products (product_name, product_category, product_sku, quantity, unit_price, id_supplier) VALUES (?, ?, ?, ?, ?, ?)`,
                        [row.product_name, row.product_category, row.product_sku, row.quantity, row.unit_price, supplier.id_supplier]
                    );
                    const [[product]] = await connection.query(
                        `SELECT id_product FROM products WHERE product_sku = ?`, 
                        [row.product_sku]
                    );


                    await connection.query(
                        `INSERT IGNORE INTO transactions (id_transaction, id_customer, transaction_date) VALUES (?, ?, ?)`,
                        [row.transaction_id, customer.id_customer, row.date]
                    );


                    await connection.query(
                        `INSERT INTO transaction_details (id_transaction, id_product, quantity, unit_price) VALUES (?, ?, ?, ?)`,
                        [row.transaction_id, product.id_product, row.quantity, row.unit_price]
                    );
                }

                await connection.commit();
                res.json({ message: 'Procesamiento masivo completado con éxito' });

            } catch (err) {
                await connection.rollback();
                console.error(err);
                res.status(500).json({ error: 'Error procesando los datos', details: err.message });
            } finally {
                connection.release();
            }
        });
};
