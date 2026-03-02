import fs from 'fs';
import csv from 'csv-parser';
import pool from '../bd.js';


// ===============================
// 🔵 UPLOAD ALL
// ===============================

export const uploadAll = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            error: 'No se recibió el archivo'
        });
    }

    const resultados = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => resultados.push(data))
        .on('end', async () => {

            const connection = await pool.getConnection();

            try {

                await connection.beginTransaction();



                const pacientesMap = new Map();
                const pacientesUnicos = [];

                resultados.forEach(r => {
                    if (!pacientesMap.has(r.patient_email)) {
                        pacientesMap.set(r.patient_email, true);
                        pacientesUnicos.push([
                            r.patient_name,
                            r.patient_email,
                            r.patient_phone,
                            r.patient_address
                        ]);
                    }
                });

                if (pacientesUnicos.length > 0) {
                    await connection.query(
                        `INSERT IGNORE INTO patients (name, email, phone, address) VALUES ?`,
                        [pacientesUnicos]
                    );
                }



                const doctoresMap = new Map();
                const doctoresUnicos = [];

                resultados.forEach(r => {
                    if (!doctoresMap.has(r.doctor_email)) {
                        doctoresMap.set(r.doctor_email, true);
                        doctoresUnicos.push([
                            r.doctor_name,
                            r.doctor_email,
                            r.specialty
                        ]);
                    }
                });

                if (doctoresUnicos.length > 0) {
                    await connection.query(
                        `INSERT IGNORE INTO doctors (name, email, specialty) VALUES ?`,
                        [doctoresUnicos]
                    );
                }

                // ===============================
                // 3️⃣ ASEGURADORAS
                // ===============================

                const segurosMap = new Map();
                const segurosUnicos = [];

                resultados.forEach(r => {
                    if (r.insurance_provider && !segurosMap.has(r.insurance_provider)) {
                        segurosMap.set(r.insurance_provider, true);
                        segurosUnicos.push([
                            r.insurance_provider,
                            r.coverage_percentage
                        ]);
                    }
                });

                if (segurosUnicos.length > 0) {
                    await connection.query(
                        `INSERT IGNORE INTO insurances (name, coverage_percentage) VALUES ?`,
                        [segurosUnicos]
                    );
                }

                // ===============================
                // 4️⃣ OBTENER IDS
                // ===============================

                const [patients] = await connection.query(`SELECT id, email FROM patients`);
                const [doctors] = await connection.query(`SELECT id, email FROM doctors`);
                const [insurances] = await connection.query(`SELECT id, name FROM insurances`);

                const patientMap = Object.fromEntries(patients.map(p => [p.email, p.id]));
                const doctorMap = Object.fromEntries(doctors.map(d => [d.email, d.id]));
                const insuranceMap = Object.fromEntries(insurances.map(i => [i.name, i.id]));

                // ===============================
                // 5️⃣ APPOINTMENTS
                // ===============================

                const citas = resultados.map(r => [
                    r.appointment_id,
                    r.appointment_date,
                    patientMap[r.patient_email],
                    doctorMap[r.doctor_email],
                    r.insurance_provider ? insuranceMap[r.insurance_provider] : null,
                    r.treatment_code,
                    r.treatment_description,
                    r.treatment_cost,
                    r.amount_paid
                ]);

                if (citas.length > 0) {
                    await connection.query(
                        `INSERT IGNORE INTO appointments
                        (appointment_id, appointment_date, patient_id, doctor_id, insurance_id,
                        treatment_code, treatment_description, treatment_cost, amount_paid)
                        VALUES ?`,
                        [citas]
                    );
                }

                await connection.commit();
                connection.release();

                res.json({ message: 'Upload ALL completado correctamente' });

            } catch (error) {

                await connection.rollback();
                connection.release();

                console.error(error);
                res.status(500).json({ error: 'Error en inserción masiva' });
            }
        });
};



// ===============================
// 🔵 SOLO PACIENTES
// ===============================

export const uploadPatients = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No se recibió archivo' });
    }

    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {

            const values = results.map(row => [
                row.patient_name,
                row.patient_email,
                row.patient_phone
            ]);

            try {
                await pool.query(
                    `INSERT IGNORE INTO patients (name, email, phone) VALUES ?`,
                    [values]
                );

                res.json({ message: 'Pacientes insertados' });

            } catch (err) {
                res.status(500).json(err);
            }
        });
};



// ===============================
// 🔵 SOLO DOCTORES
// ===============================

export const uploadDoctors = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No se recibió archivo' });
    }

    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {

            const values = results.map(row => [
                row.doctor_name,
                row.doctor_email,
                row.specialty
            ]);

            try {
                await pool.query(
                    `INSERT IGNORE INTO doctors (name, email, specialty) VALUES ?`,
                    [values]
                );

                res.json({ message: 'Doctores insertados' });

            } catch (err) {
                res.status(500).json(err);
            }
        });
};