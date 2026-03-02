import fs from 'fs';
import csv from 'csv-parser';
import pool from '../bd.js';



export const uploadTransactions = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No se recibió archivo' });
    }

    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {

            const values = results.map(row => [
                row.transaction_id,
                row.date,
            ]);

            try {
                await pool.query(
                    `INSERT IGNORE INTO transactions (transaction_id, date) VALUES ?`,
                    [values]
                );

                res.json({ message: 'Transacciones insertadas' });

            } catch (err) {
                res.status(500).json(err);
            }
        });
};





export const uploadProducts = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No se recibió archivo' });
    }

    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {

            const values = results.map(row => [
                row.product_name,
                row.product_category,
                row.product_sku,
                row.quantity,
                row.unit_price,
                row.total_line_value
            ]);

            console.log(values);

            try {
                await pool.query(
                    `INSERT IGNORE INTO products (product_name, product_category, product_sku, quantity, unity_price, total_line_value) VALUES ?`,
                    [values]
                );

                res.json({ message: 'Productos insertados' });

            } catch (err) {
                res.status(500).json(err);
            }
        });
};