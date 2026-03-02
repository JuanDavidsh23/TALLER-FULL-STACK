import pool from '../bd.js';

//FUNCTION CREATE TO GET THE SUPPLIER REPORT WITH SQL SENTENCE AND ENDPOINT
export const getSuppliersAnalysis = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                s.supplier_name, 
                SUM(p.quantity) AS total_items, 
                SUM(p.quantity * p.unit_price) AS inventory_value
            FROM suppliers s
            LEFT JOIN products p ON s.id_supplier = p.id_supplier
            GROUP BY s.id_supplier
            ORDER BY total_items DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//FUNCTION CREATE TO GET THE COSUTMER HISTORY WITH SQL SENTENCE AND ENDPOINT
export const getCustomerHistory = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT 
                t.transaction_date, 
                p.product_name, 
                td.quantity, 
                td.unit_price, 
                td.total_line_value
            FROM transactions t
            JOIN transaction_details td ON t.id_transaction = td.id_transaction
            JOIN products p ON td.id_product = p.id_product
            WHERE t.id_customer = ?
            ORDER BY t.transaction_date DESC
        `, [id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//FUNCTION CREATE TO GET THE PRODUCTS ORGANIZED BY CATEGORY WITH SQL SENTENCE AND ENDPOINT
export const getTopProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.product_name, 
                SUM(td.quantity) AS total_sold, 
                SUM(td.total_line_value) AS total_revenue
            FROM products p
            JOIN transaction_details td ON p.id_product = td.id_product
            WHERE p.product_category = ?
            GROUP BY p.id_product
            ORDER BY total_revenue DESC
        `, [category]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
