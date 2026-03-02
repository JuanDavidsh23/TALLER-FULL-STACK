import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  patientEmail: String,
  patientName: String,
  patientPhone: String,
  patientAddress: String,
  appointments: Array
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;