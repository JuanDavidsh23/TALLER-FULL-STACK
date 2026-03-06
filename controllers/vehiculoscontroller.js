import pool from '../bd.js';


/* =========================
   CREATE AUTO
   ========================= */

export const createAuto = async (req, res) => {

    try {

        const { placa, marca, color, estado_vehiculo, kilometraje } = req.body;

        const [result] = await pool.query(
            `INSERT INTO vehiculos
            (placa, marca, color, estado_vehiculo, kilometraje)
            VALUES (?, ?, ?, ?, ?)`,
            [placa, marca, color, estado_vehiculo, kilometraje]
        );

        res.json({
            message: "Vehículo registrado correctamente",
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};



/* =========================
   READ TODOS
   ========================= */

export const getAutos = async (req, res) => {

    try {

        const [rows] = await pool.query(
            `SELECT * FROM vehiculos`
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};



/* =========================
   READ POR PLACA
   ========================= */

export const getAutoByPlaca = async (req, res) => {

    try {

        const { placa } = req.params;

        const [rows] = await pool.query(
            `SELECT * FROM vehiculos WHERE placa = ?`,
            [placa]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Vehículo no encontrado"
            });
        }

        res.json(rows[0]);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};



/* =========================
   UPDATE
   ========================= */

export const updateAuto = async (req, res) => {

    try {

        const { placa } = req.params;

        const { marca, color, estado_vehiculo, kilometraje } = req.body;

        const [result] = await pool.query(
            `UPDATE vehiculos
            SET marca = ?, color = ?, estado_vehiculo = ?, kilometraje = ?
            WHERE placa = ?`,
            [marca, color, estado_vehiculo, kilometraje, placa]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Vehículo no encontrado"
            });

        }

        res.json({
            message: "Vehículo actualizado"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};



/* =========================
   DELETE
   ========================= */

export const deleteAuto = async (req, res) => {

    try {

        const { placa } = req.params;

        const [vehiculo] = await pool.query(
            `SELECT id_vehiculo FROM vehiculos WHERE placa = ?`,
            [placa]
        );

        if (vehiculo.length === 0) {

            return res.status(404).json({
                message: "Vehículo no encontrado"
            });

        }

        const id = vehiculo[0].id_vehiculo;

        const [operacion] = await pool.query(
            `SELECT * FROM operaciones WHERE id_vehiculo = ?`,
            [id]
        );

        if (operacion.length > 0) {

            return res.status(400).json({
                message: "No se puede eliminar porque tiene operaciones registradas"
            });

        }

        await pool.query(
            `DELETE FROM vehiculos WHERE placa = ?`,
            [placa]
        );

        res.json({
            message: "Vehículo eliminado"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};