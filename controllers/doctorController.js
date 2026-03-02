import pool from '../bd.js';


// GET /api/doctors
export const getDoctors = async (req, res) => {
    try {

        const { specialty } = req.query;

        let sql = "SELECT * FROM doctors";
        let params = [];

        if (specialty) {
            sql += " WHERE specialty = ?";
            params.push(specialty);
        }

        const [results] = await pool.query(sql, params);

        res.json(results);

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};


// GET /api/doctors/:id
export const getDoctorById = async (req, res) => {
    try {

        const { id } = req.params;

        const [results] = await pool.query(
            "SELECT * FROM doctors WHERE id = ?",
            [id]
        );

        if (results.length === 0) {
            return res.status(404).json({ message: "Doctor no encontrado" });
        }

        res.json(results[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};


// PUT /api/doctors/:id
export const updateDoctor = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, email, specialty } = req.body;

        await pool.query(
            `UPDATE doctors 
             SET name = ?, email = ?, specialty = ?
             WHERE id = ?`,
            [name, email, specialty, id]
        );

        res.json({ message: "Doctor actualizado correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};