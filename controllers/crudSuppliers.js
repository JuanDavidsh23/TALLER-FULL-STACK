import pool from '../bd.js';

//GET ALL SUPPLIERS FROM SUPLLIERS ON MYSQL 
export const getSuppliers = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM suppliers'
        )

        res.json(rows)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//GET SUPPLIERS BY ID
export const getSuppliersID = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
              "SELECT * FROM suppliers WHERE id_supplier = ?",
            [id]
        )
                if (rows.length === 0) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }


        res.json(rows)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//UPDATE SUPPLIERS BY ID
export const updateSuppliersID = async (req, res) => {
    try {
        const { id } = req.params;
        const { supplier_name, supplier_email } = req.body;

        const [rows] = await pool.query(
              `UPDATE suppliers 
             SET supplier_name = ?, supplier_email  = ?
             WHERE id_supplier = ?`,
            [supplier_name, supplier_email, id]
        )

    res.json({ message: "Proveedor actualizado correctamente" });


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//CREATE SUPPLIERS
export const createSuppliers = async (req, res) => {
    try {
        const { supplier_name, supplier_email  } = req.body

        const [result] = await pool.query(
            'INSERT INTO suppliers (supplier_name, supplier_email) VALUES (?, ?)',
            [supplier_name, supplier_email]
        )

        res.status(201).json({
            message: 'Supplier created',
            id: result.insertId
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//DELTE SUPLLIERS
export const deleteSuppliers = async (req, res) => {
    try {
        const { id } = req.params

        const [result] = await pool.query(
            'DELETE FROM suppliers WHERE id_supplier = ?',
            [id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Supplier not found'
            })
        }

        res.json({ message: 'Supplier deleted' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
