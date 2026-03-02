import fs from 'fs';
import csv from 'csv-parser';
import pool from '../bd.js';

//FUNCTION CREATE TO UPLOAD THE COSTUMERS TO MYSQ
export const uploadCostumers = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No se recibió archivo' });
    }

    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {

            const values = results.map(row => [
                row.customer_name,
                row.customer_email,
                row.customer_address,
                row.customer_phone,

            ]);

            console.log(values);

            try {
                await pool.query(
                    `INSERT IGNORE INTO customers (customer_name, customer_email, customer_address, customer_phone ) VALUES ?`,
                    [values]
                );

                res.json({ message: 'CLientes Insertados' });

            } catch (err) {
                res.status(500).json(err);
            }
        });
};

//FUNCTION CREATE TO UPLOAD THE SUPPLIERS TO MYSQ
export const uploadSupplier = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No se recibió archivo' });
    }

    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {

            const values = results.map(row => [
                row.supplier_name,
                row.supplier_email,
            ]);

            console.log(values);

            try {
                await pool.query(
                    `INSERT IGNORE INTO suppliers (supplier_name, supplier_email ) VALUES ?`,
                    [values]
                );

                res.json({ message: 'Proveedores Insertados' });

            } catch (err) {
                res.status(500).json(err);
            }
        });
};


//FUNCTION CREATE TO UPLOAD THE PRODUCTS TO MYSQ
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
            ]);

            console.log(values);

            try {
                await pool.query(
                    `INSERT IGNORE INTO products (product_name, product_category, product_sku, quantity, unit_price) VALUES ?`,
                    [values]
                );

                res.json({ message: 'Productos insertados' });

            } catch (err) {
                res.status(500).json(err);
            }
        });
};

//FUNCTION CREATE TO UPLOAD THE TRANSACTIONS TO MYSQ
export const UploadTransactions = async (req, res) => {

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

            console.log(values);

            try {
                await pool.query(
                    `INSERT IGNORE INTO transactions (id_transaction, transaction_date) VALUES ?`,
                    [values]
                );

                res.json({ message: 'Transacciones insertados' });

            } catch (err) {
                res.status(500).json(err);
            }
        });
};


//FUNCTION CREATE TO UPLOAD THE TRANSACTIONS TO MYSQ
export const uploadtransaction_details = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No se recibió archivo' });
    }

    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {

            const values = results.map(row => [
                row.id_transaction,
                row.id_product,
                row.quantity,
                row.unit_price,
                row.total_line_decimal
            ]);

            console.log(values);

            try {
                await pool.query(
                    `INSERT IGNORE INTO transaction_details (id_transaction, id_product,quantity,unit_price,total_line_value) VALUES ?`,
                    [values]
                );

                res.json({ message: 'Details insertados insertados' });

            } catch (err) {
                res.status(500).json(err);
            }
        });
};