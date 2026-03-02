import fs from 'fs';
import csv from 'csv-parser';
import Patient from '../models/Patient.js';

export const uploadAllMongoDb = async (req, res) => {

  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {

      const groupedPatients = {};

      results.forEach(row => {

        if (!groupedPatients[row.patient_email]) {
          groupedPatients[row.patient_email] = {
            patientEmail: row.patient_email,
            patientName: row.patient_name,
            patientPhone: row.patient_phone,
            patientAddress: row.patient_address,
            appointments: []
          };
        }

        groupedPatients[row.patient_email].appointments.push({
          appointmentId: row.appointment_id,
          date: row.appointment_date,
          doctorName: row.doctor_name,
          specialty: row.specialty,
          treatmentDescription: row.treatment_description,
          amountPaid: Number(row.amount_paid)
        });

      });

      const patientsArray = Object.values(groupedPatients);

      await Patient.insertMany(patientsArray);

      res.send("Inserción masiva en MongoDB completada");
    });
};

export const getPatientHistory = async (req, res) => {
  try {
    const { email } = req.params;

    const patient = await Patient.findOne({ patientEmail: email });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Paciente no encontrado"
      });
    }

    res.status(200).json({
      success: true,
      data: patient
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener historial",
      error: error.message
    });
  }
};