import { Transaction } from '../models/Transactions.js';
import fs from 'fs';
import csv from 'csv-parser';

//FUNCTION TO UPLOAD ALLT THE INFORMATION TO MONGODB 
export const uploadAllDataMongo = async (req, res) => {
    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            const groupedTransactions = {};

            results.forEach(row => {
                if (!groupedTransactions[row.transaction_id]) {
                    groupedTransactions[row.transaction_id] = {
                        _id: row.transaction_id,
                        transaction_date: new Date(row.date),
                        customer: {
                            name: row.customer_name,
                            email: row.customer_email,
                            address: row.customer_address,
                            phone: row.customer_phone
                        },
                        items: [],
                        total_amount: 0
                    };
                }

                const order = groupedTransactions[row.transaction_id];
                const subtotal = parseFloat(row.unit_price) * parseInt(row.quantity);
                
                order.items.push({
                    product_name: row.product_name,
                    product_sku: row.product_sku,
                    category: row.product_category,
                    quantity: parseInt(row.quantity),
                    unit_price: parseFloat(row.unit_price),
                    supplier_name: row.supplier_name
                });

                order.total_amount += subtotal;
            });

            const finalArray = Object.values(groupedTransactions);

            try {
                await Transaction.insertMany(finalArray);
                fs.unlinkSync(req.file.path);
                res.json({ message: "Carga masiva de transacciones completada" });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
};
