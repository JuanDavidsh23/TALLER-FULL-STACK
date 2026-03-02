import express from 'express';
import upload from '../middlewares/upload.js';

import { 
    uploadAll,
    uploadPatients,
    uploadDoctors
} from '../controllers/insertMassiveController.js';

import {
    getDoctors,
    getDoctorById,
    updateDoctor
} from '../controllers/doctorController.js';
import { uploadAllMongoDb,getPatientHistory } from '../controllers/insertMassiveMongo.js';
import { getRevenueReport } from '../controllers/reportController.js';

const router = express.Router();


router.post('/upload/all', upload.single('archivo'), uploadAll);



export default router;